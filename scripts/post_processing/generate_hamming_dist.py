import os
from tqdm import tqdm
import pandas as pd
import numpy as np
from scipy.optimize import linear_sum_assignment
from sklearn.manifold import MDS
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

class Pair:

    def __init__(self, plan1, plan2):
        self.plan1 = plan1
        self.plan2 = plan2

    def compare_precincts(self, district1Precincts, district2Precincts):
        # find list of precincts that is smaller in size
        if len(district1Precincts) < len(district2Precincts):
            lowerPrecincts = district1Precincts
            higherPrecincts = district2Precincts
        else:
            lowerPrecincts = district2Precincts
            higherPrecincts = district1Precincts

        # length difference between the two lists
        precinctNumDifference = len(higherPrecincts) - len(lowerPrecincts)

        # extend to be of equal length lists that aren't matches
        lowerPrecincts.extend([-1] * precinctNumDifference)

        # find non-matches in the list of precincts
        sharedPrecincts = [p1 for p1, p2 in zip(lowerPrecincts, higherPrecincts) if p1 == p2]

        numDifferentPrecincts = len(lowerPrecincts) - len(sharedPrecincts) # non-shared precincts
        return numDifferentPrecincts

    def find_district_num(self, index, plan):
        district = plan["features"][index]
        return district["properties"]["DISTRICT"]

    def remove_duplicate_edges(self, graph, edge):
        for district, edges in graph.items():
            if edge in edges:
                graph[district].remove(edge)
        return graph

    def min_cost_matching(self, cost_matrix):
        # Apply the Hungarian algorithm
        row_indices, col_indices = linear_sum_assignment(cost_matrix)

        # Return the optimal assignment
        matching = [(row_indices[i], col_indices[i]) for i in range(len(row_indices))]
        return matching

    def calculate_hamming_distance(self):
        districtPlan1 = self.plan1
        districtPlan2 = self.plan2

        distanceMatrix = [[0 for _ in districtPlan1["features"]] for _ in districtPlan2["features"]]

        # upper triangle of main diagonal
        for i in range(len(districtPlan1["features"])):
            district1 = districtPlan1[i]
            for j in range(i + 1, len(districtPlan2["features"])):
                district2 = districtPlan2[j]
                plan1Precincts = district1["properties"]["PRECINCTS"].split(",")
                plan2Precincts = district2["properties"]["PRECINCTS"].split(",")
                distanceBtwnPrecincts = self.compare_precincts(plan1Precincts, plan2Precincts)
                distanceMatrix[i][j] = distanceBtwnPrecincts
        # mirror to lower part of main diagonal
        for i in range(len(districtPlan1["features"])):
            for j in range(i + 1, len(districtPlan2["features"])):
                distanceMatrix[j][i] = distanceMatrix[i][j]

        #### Hungarian algorithm - obtain perfect one-to-one matching of districts using minimum cost (lowest distance)
        matching = self.min_cost_matching(distanceMatrix)

        # Print the matching
        # for pair in matching:
        #     print(f"Node in set 1: {pair[0]}, Node in set 2: {pair[1]}, Weight between set: {distanceMatrix[pair[0]][pair[1]]}")

        # Sum all weights
        finalDistance = 0
        for pair in matching:
            matchingDistrict1 = pair[0]
            matchingDistrict2 = pair[1]
            finalDistance += distanceMatrix[matchingDistrict1][matchingDistrict2]
        
        return finalDistance


if __name__ == "__main__":
    # Get a list of all files of plans
    districtPlans = [file for file in os.listdir('NVplans') if file.endswith('.json')]

    # initalize distance matrix of plans
    distanceMatrix = [[0 for _ in districtPlans] for _ in districtPlans]
    
    for i, plan1 in tqdm(enumerate(districtPlans), total=len(districtPlans)):
        for j, plan2 in enumerate(districtPlans):
            distPlan1 = pd.read_json(f'NVplans/{plan1}')
            distPlan2 = pd.read_json(f'NVplans/{plan2}')
            distance = Pair(distPlan1, distPlan2).calculate_hamming_distance()
            distanceMatrix[i][j] = distance
    
    # min-max normalization
    minDist = np.min(distanceMatrix)
    maxDist = np.max(distanceMatrix)

    normalizedDistanceMatrix = (distanceMatrix - minDist) / (maxDist - minDist)
    print(normalizedDistanceMatrix)
    
    mds = MDS(n_components=2, random_state=0, dissimilarity='precomputed')
    pos = mds.fit(normalizedDistanceMatrix).embedding_  # apply mds on distance matrix
    plt.scatter(pos[:, 0], pos[:, 1])
    plt.title('MDS Visualization')
    plt.show()

    # Find k using elbow method with SSE (sum of squared errors)
    sse = []
    for k in range(1,11):   # test k values of 1 to 10
        kmeans = KMeans(n_clusters=k, random_state=0, n_init='auto')
        kmeans.fit(pos)
        sse.append(kmeans.inertia_) # closest cluster center in the sum of squared differences

    # View elbow plot
    plt.plot(range(1,11), sse, marker='o')
    plt.xlabel('Number of Clusters (k)')
    plt.ylabel('Sum of Squared Distances (SSE)')
    plt.show()

    # View K-Means plot of MDS
    kmeans = KMeans(n_clusters=5, random_state=0, n_init='auto')
    kmeans.fit(pos)

    labels = kmeans.labels_
    plt.scatter(pos[:, 0], pos[:, 1], c=labels, cmap='viridis')
    plt.title('MDS with K-Means Clustering')
    plt.show()