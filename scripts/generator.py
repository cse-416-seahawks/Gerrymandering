import json
import random

"""
This file serves to generate sample data for GerryCast
"""

districtPlanIds = set()

def generate_states():

    data = []
    States = ["Nevada", "Texas", "Virginia"]
    for state in States:
        numEnsembles = random.randint(5, 20)
        StateData = {
            "State": state,
            "numEnsembles": numEnsembles,  # Added a comma here
            "ensembles": []
        }
        for i in range(numEnsembles):
            StateData["ensembles"].append(generate_ensemble(state))
        data.append(StateData)
    return data

# generate ensemble data based on defined format

def generate_ensemble(State):
    ensemble = {"State": State, "type": "ensembleData", "data": []}

    numClusters = random.randint(10, 20)

    for i in range(numClusters):  # Removed len() as it's not needed
        ensemble["data"].append(generate_cluster(i))  # Added (i) here
    return ensemble

# generate cluster data based on response format

def generate_cluster(number):
    
    percentages = generate_random_decimals(1, 5)
    
    while 1.0 in percentages or 0.0 in percentages:
        percentages = generate_random_decimals(1, 5)
        
    demographics = {
        "white": percentages[0],
        "black": percentages[1],
        "asian": percentages[2],
        "latino": percentages[3],
        "other": percentages[4]
    }
    
    dem_rep_split = generate_random_decimals(1, 2)
    
    while 1.0 in dem_rep_split or 0.0 in dem_rep_split:
        dem_rep_split = generate_random_decimals(1, 2)

    cluster = {
        "cluster": number + 1,
        "name": "cluster_placeholder",
        "num_dist_plans": random.randint(500, 10000),
        "avg_distance": round(random.uniform(10, 50),4),
        "avg_rep_split": dem_rep_split[0],
        "avg_dem_split": 1 - dem_rep_split[1],
        "demographics": demographics,
    }
    return cluster


def generate_random_decimals(sum_target, num_decimals):
    decimals = []
    
    i = 0
    
    max_num = sum_target
    
    while i < num_decimals - 1:
        num = round(random.uniform(0, max_num), 3)
        num_str = "{:.{prec}f}".format(num, prec=3)
        max_num -= num
        decimals.append(float(num_str))
        i += 1

    decimals.append(float("{:.{prec}f}".format((1 - max_num), prec=3)))
    return decimals

import random

def generate_random_id(id_length):
    # Generate a random ID
    while True:
        random_id = ''.join(random.choice("0123456789") for _ in range(id_length))
        if random_id not in districtPlanIds:
            districtPlanIds.add(random_id)
            return random_id
        
        
for i in range(100):
    generate_random_id(6)

# Serializing json
stateData = generate_states()
nevada = json.dumps(stateData[0], indent=4)
texas = json.dumps(stateData[1], indent=4)
virginia = json.dumps(stateData[2], indent=4)

# Writing to sample.json
with open("_generated_/nevada.json", "w") as outfile:
    outfile.write(nevada)
with open("_generated_/texas.json", "w") as outfile:
    outfile.write(texas)
with open("_generated_/virginia.json", "w") as outfile:
    outfile.write(virginia)
