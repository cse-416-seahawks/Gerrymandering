import pandas as pd
from scipy.optimize import linear_sum_assignment


def compare_precincts(district1Precincts, district2Precincts):
    '''
    [list of precincts in a district] - usually different size
    - find smaller sized list and extend it to be of equal length lists that aren't matches
    - find the non matches in the list
   
    "PRECINCTS": "1153,1409,1156,1157,2055,2057,2058,2059,1805,1184,1063,1065,1066,1067,1071,1330,1205,1206,959,962,1224,1225,1873,1257,1258,1259,1150"
    "PRECINCTS": "1408,1410,1411,1412,1413,1158,903,904,1810,1811,1454,1073,1075,1076,1335,1080,1081,1082,1609,1610,1612,1613,1622,1623,1624,1625,1498,1499,1626,1501,1118,1119,1120,1121,1122,1627,1509,1510,1661"
    

    add up distances between all the matched districts
    this results in the distance between two plans
    add to bigger distance matrix
    '''

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

def find_district_num(index, plan):
    district = plan["features"][index]
    return district["properties"]["DISTRICT"]

def remove_duplicate_edges(graph, edge):
    for district, edges in graph.items():
        if edge in edges:
            graph[district].remove(edge)
    return graph

def min_cost_matching(cost_matrix):
    # Apply the Hungarian algorithm
    row_indices, col_indices = linear_sum_assignment(cost_matrix)

    # Return the optimal assignment
    matching = [(row_indices[i], col_indices[i]) for i in range(len(row_indices))]
    return matching




districtPlan1 = pd.read_json("NVplan0.json")
districtPlan2 = pd.read_json("NVplan1.json")

distanceMatrix = [[0 for _ in districtPlan1["features"]] for _ in districtPlan2["features"]]

for i, district1 in enumerate(districtPlan1["features"]):
    for j, district2 in enumerate(districtPlan2["features"]):
        plan1Precincts = district1["properties"]["PRECINCTS"].split(",")
        plan2Precincts = district2["properties"]["PRECINCTS"].split(",")
        distanceBtwnPrecincts = compare_precincts(plan1Precincts, plan2Precincts)
        distanceMatrix[i][j] = distanceBtwnPrecincts

#### Hungarian algorithm - obtain perfect one-to-one matching of districts using minimum cost (lowest distance)
matching = min_cost_matching(distanceMatrix)

# Print the matching
for pair in matching:
    print(f"Node in set 1: {pair[0]}, Node in set 2: {pair[1]}, Weight between set: {distanceMatrix[pair[0]][pair[1]]}")

# Sum all weights
finalDistance = 0
for pair in matching:
    matchingDistrict1 = pair[0]
    matchingDistrict2 = pair[1]
    finalDistance += distanceMatrix[matchingDistrict1][matchingDistrict2]

# Add this final distance to distanceMatrix of plans




