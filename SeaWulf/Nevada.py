import matplotlib.pyplot as plt
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election, metrics)
from gerrychain.proposals import recom
from functools import partial
import pandas
import geopandas as gpd
import numpy
import os
import sys
import queue
import threading
from gerrychain.random import random
import maup
sys.path.append(r'C:\Users\leipan\AppData\Local\Anaconda3\Lib\site-packages')




#convert shapefile to graph format
df=gpd.read_file("nevada.json")
#df = df.to_crs(epsg=3857)
df.geometry = df.geometry.buffer(0)

#df=maup.autorepair(df)
graph = Graph.from_geodataframe(df)

my_updaters={
    "population": updaters.Tally("population",alias="population"),
    "white": updaters.Tally("white",alias="white"),
    "black": updaters.Tally("black",alias="black"),
    "indian": updaters.Tally("indian",alias="indian"),
    "asian": updaters.Tally("asian",alias="asian"),
    "pacific": updaters.Tally("pacific",alias="pacific"),
    "other": updaters.Tally("other",alias="other"),
    "dem": updaters.Tally("G20PREDBID",alias="dem"),
    "rep": updaters.Tally("G20PRERTRU",alias="rep"),
}

initial_partition = GeographicPartition(graph,assignment="district",updaters=my_updaters)
initial_partition.plot()

ideal_population= sum(initial_partition["population"].values())/ len(initial_partition)
print("ideal pop:",ideal_population)
print("total pop:",sum(initial_partition["population"].values()))

#create the proposal
proposal=partial(recom,
                pop_col="population",
                pop_target=ideal_population,
                epsilon=0.1,
                node_repeats=2)

#creatings constraints
compactness_bound = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)
print(compactness_bound)

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.08)
print(pop_constraint)

#configuring the chain

chain = MarkovChain(
    proposal=proposal,
    constraints=[
        pop_constraint,
        compactness_bound
    ],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=10000
)

for i in range(1000):
    for partition in chain.with_progress_bar():
        continue

    population = list(partition["population"].values())
    white = list(partition["white"].values())
    black = list(partition["black"].values())
    indian = list(partition["indian"].values())
    asian = list(partition["asian"].values())
    pacific = list(partition["pacific"].values())
    other = list(partition["other"].values())
    dem = list(partition["dem"].values())
    rep = list(partition["rep"].values())

    districts = list(partition.parts.keys())

    plans = []
    district_precincts = []

    for district, subgraph in partition.subgraphs.items():
        district_geometry = gpd.GeoDataFrame(
            {'district': district, 'geometry': [partition.graph.nodes[node]['geometry'] for node in subgraph.nodes]}
        ).dissolve(by='district')

        plans.append(district_geometry.iloc[0]['geometry'])
        district_precincts.append(list(subgraph.nodes))

    precincts_str = [",".join(map(str, p)) for p in district_precincts]



    generatedPlans = gpd.GeoDataFrame(
        {
            'DISTRICT': district,
            'POPULATION': population[int(district) - 1],
            'WHITE': white[int(district) - 1],
            'BLACK': black[int(district) - 1],
            'INDIAN': indian[int(district) - 1],
            'ASIAN': asian[int(district) - 1],
            'PACIFIC': pacific[int(district) - 1],
            'OTHER': other[int(district) - 1],
            'DEM': dem[int(district) - 1],
            'REP': rep[int(district) - 1],
            "PRECINCTS": precincts_str[int(district) - 1],
            'geometry': plans[int(district) - 1],

        }
        for district, subgraph in partition.subgraphs.items()
    )
    directory_path = './NVplans'
    files_and_directories = os.listdir(directory_path)
    directory_length = len(files_and_directories)
    file_path = os.path.join(directory_path, f"NVplan{directory_length}.json")


    generatedPlans.to_file(file_path)

