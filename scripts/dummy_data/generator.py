import json
import random

"""
This file serves to generate sample data for GerryCast
"""

districtPlanIds = set()

ensembleIds = set()

districtPlans = []

clusters = []

clusterInfoObjects = []

def generate_random_id(id_length):
    if id_length == 4:
        while True:
            random_id = ''.join(random.choice("0123456789") for _ in range(id_length))
            if random_id not in ensembleIds:
                ensembleIds.add(random_id)
                return random_id
    # Generate a random ID
    if id_length == 6:
        while True:
            random_id = ''.join(random.choice("0123456789") for _ in range(id_length))
            if random_id not in districtPlanIds:
                districtPlanIds.add(random_id)
                return random_id
        
        
# for i in range(10000):
#     generate_random_id(6)

def generate_states():

    data = []
    States = ["Nevada", "Texas", "Virginia"]
    for state in States:
        numEnsembles = random.randint(10, 15)
        StateData = {
            "State": state,
            "type" : "EnsembleData",
            "num_ensembles": numEnsembles,
            "ensembles": []
        }
        for i in range(numEnsembles):
            StateData["ensembles"].append(generate_ensemble(state))
        data.append(StateData)
    return data

# generate ensemble data based on defined format

def generate_ensemble(State):
    ensembleId = generate_random_id(4)
    ensemble = {"ensemble_id" : ensembleId, "num_district_plans" : random.randint(500,5000),  "data": []}

    distanceMeasures = ["Hamming Distance","Optimal Transport", "Total Variation"]
    for distance in distanceMeasures:
        numClusters = random.randint(5,8)
        distanceData = {
            "distance_measure" : distance,
            "num_clusters" : numClusters,
            "avg_distance" : random.uniform(20,50)
        }
        
        StateClusters = {
        "State" : State,
        "type" : "ClusterData",
        "ensemble_id" : ensembleId,
        "distance_measure" : distance,
        "data" : []
        }
        

        for i in range(numClusters):  # Removed len() as it's not needed
            StateClusters["data"].append(generate_cluster(State,ensembleId,i,distance))  # Added (i) here
        clusterInfoObjects.append(StateClusters)
        ensemble["data"].append(distanceData)
    return ensemble

    

# generate cluster data based on response format
def generate_cluster(State, ensembleId, number, distanceMeasure):
    
    percentages = generate_random_decimals(1, 5)
    
    while 1.0 in percentages or 0.0 in percentages:
        percentages = generate_random_decimals(1, 5)
        
    demographics = {
        "caucasian": percentages[0],
        "african_american": percentages[1],
        "asian_american": percentages[2],
        "hispanic": percentages[3],
        "other": percentages[4]
    }
    
    dem_rep = generate_random_decimals(1.0, 2)
    
    while 1.0 in dem_rep or 0.0 in dem_rep:
        dem_rep = generate_random_decimals(1.0, 2)
        
    numDistrictPlans = random.randint(5,30)
    
    cluster = {
        "cluster_number": number + 1,
        "name": "cluster_placeholder",
        "num_dist_plans": numDistrictPlans,
        "avg_distance": round(random.uniform(10, 50),4),
        "avg_rep": dem_rep[0],
        "avg_dem": dem_rep[1],
        "demographics": demographics,
        "district_plans" : []
    }
    
    
    
    for i in range(numDistrictPlans):
        dPlanId = generate_random_id(6)
        districtPlans.append(generate_district_plan(dPlanId))
        cluster["district_plans"].append(dPlanId)
    return cluster

def generate_district_plan(planId):
    dem_rep = generate_random_decimals(1.0, 2)
    
    while 1.0 in dem_rep or 0.0 in dem_rep:
        dem_rep = generate_random_decimals(1.0, 2)
        
    districtPlanData = {
        "district_plan_id": planId,
        "opportunity_districts": random.randint(5,10),
        "avg_dem": dem_rep[0],
        "avg_rep": dem_rep[1],
        "districts": {
        "type": "FeatureCollection",
        "features": []
        }
    }
    
    return districtPlanData


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
    decimals.append(float("{:.{prec}f}".format((max_num), prec=3)))
    return decimals

import random



# Serializing json
stateData = generate_states()
nevada = json.dumps(stateData[0], indent=4)
texas = json.dumps(stateData[1], indent=4)
virginia = json.dumps(stateData[2], indent=4)
districtPlanList = json.dumps(districtPlans, indent=4)

# Writing to sample.json
with open("_generated_/nevada.json", "w") as outfile:
    outfile.write(nevada)
with open("_generated_/texas.json", "w") as outfile:
    outfile.write(texas)
with open("_generated_/virginia.json", "w") as outfile:
    outfile.write(virginia)
    
with open("_generated_/district_plans.json", "w") as outfile:
    outfile.write(districtPlanList)

for i in range(len(clusterInfoObjects)):
    clusterObj = json.dumps(clusterInfoObjects[i], indent=4)
    out_folder = ""
    if clusterInfoObjects[i]["State"] == "Texas":
        out_folder = "/texas"
    elif clusterInfoObjects[i]["State"] == "Nevada":
        out_folder = "/nevada"
    else:
        out_folder = "/virginia"
        
    with open("_generated_/clusters{out_dir}/clusters_{number}.json".format(out_dir = out_folder,number = i), "w") as outfile:
        outfile.write(clusterObj)