import pandas as pd

def compare_precincts(plan1Precincts, plan2Precincts):
    sharedPrecincts = [p1 for p1, p2 in zip(plan1Precincts, plan2Precincts) if p1 == p2]
    return len(sharedPrecincts)

def find_district_num(index, plan):
    district = plan["features"][index]
    return district["properties"]["DISTRICT"]

def remove_duplicate_edges(graph, edge):
    for district, edges in graph.items():
        if edge in edges:
            graph[district].remove(edge)
    return graph

districtPlan1 = pd.read_json("NVplan0.json")
districtPlan2 = pd.read_json("NVplan1.json")

distanceMatrix = [[0 for _ in districtPlan1["features"]] for _ in districtPlan2["features"]]


for i, district1 in enumerate(districtPlan1["features"]):
    for j, district2 in enumerate(districtPlan2["features"]):
        plan1Precincts = district1["properties"]["PRECINCTS"].split(",")
        plan2Precincts = district2["properties"]["PRECINCTS"].split(",")
        numSharedPrecincts = compare_precincts(plan1Precincts, plan2Precincts)
        distanceMatrix[i][j] = numSharedPrecincts
print(distanceMatrix, "\n")
# Build hashmap with key: districtPlan2 index (district) and value: [all edges from districtPlan1]
# Initialize graph with key being the district number in districtPlan2
graph = {}
for i, district in enumerate(districtPlan1["features"]):
    graph[i] = []

# Find all matches > 0 for each district in plan2 (finding its edges)
num = 0
for plan1district in range(len(distanceMatrix)):
    for plan2district in range(len(distanceMatrix[0])):
        sharedPrecinctCount = distanceMatrix[plan1district][plan2district]
        if sharedPrecinctCount > 0:
            graph[plan1district].append((plan2district, sharedPrecinctCount))
            num+=1

print(graph)
# For all districts with one matching district (edge), assign that as a matching pair and remove from hashmap (plan1District, plan2District)
matchedPairs = set() 

while True:
    matchingComplete = False
    for district, edges in graph.items():
        if len(edges) == 1:
            matchedPairs.add((edges[0][0], district))
            remove_duplicate_edges(graph, edges[0]) # remove the pairs from other edges since we can only have one match
            graph[district] = []
            matchingComplete = True

    if not matchingComplete:
        break

for district in list(graph.keys()):
    if len(graph[district]) == 0: del graph[district]

print("\n",graph)



