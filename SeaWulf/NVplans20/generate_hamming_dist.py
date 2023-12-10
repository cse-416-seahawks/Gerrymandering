import json
import os
import shutil
from tqdm import tqdm
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import linear_sum_assignment
from sklearn.manifold import MDS
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from random import randint

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

        distanceMatrix = [[-1 for _ in districtPlan1["features"]] for _ in districtPlan2["features"]]

        for i, district1 in enumerate(districtPlan1["features"]):
            for j, district2 in enumerate(districtPlan2["features"]):
                if distanceMatrix[i][j] == -1:
                    plan1Precincts = district1["properties"]["PRECINCTS"].split(",")
                    plan2Precincts = district2["properties"]["PRECINCTS"].split(",")
                    distanceBtwnPrecincts = self.compare_precincts(plan1Precincts, plan2Precincts)
                    distanceMatrix[i][j] = distanceBtwnPrecincts # if distanceBtwnPrecincts > 0 else 0.1
                    distanceMatrix[j][i] = distanceBtwnPrecincts # if distanceBtwnPrecincts > 0 else 0.1

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

def find_silhouette_score(k, data):
    kmeans = KMeans(n_clusters=k, random_state=0, n_init='auto')
    labels = kmeans.fit_predict(data)
    return silhouette_score(data, labels)

def create_folder_of_clusters(cluster_num, district_plans, files):
    current_directory = os.getcwd()
    new_directory = f'cluster{cluster_num}'
    os.mkdir(new_directory)
    for i in district_plans:
        shutil.move(os.path.join(current_directory, files[i]), os.path.join(new_directory, files[i]))

def generateUID():
    return str(randint(100000, 999999))

if __name__ == "__main__":
    current_directory = os.getcwd()
    # folderOfPlans = 'NVplans20'

    # Get a list of all files of plans
    unsortedDistrictPlans = [file for file in os.listdir(current_directory) if file.endswith('.json')]

    # Sorts plans by number in file (e.g. 'NVplan0')
    districtPlans = sorted(unsortedDistrictPlans, key= lambda p:int(''.join(filter(str.isdigit, p))))

    # initalize distance matrix of plans
    distanceMatrix = [[-1 for _ in districtPlans] for _ in districtPlans]
    
    for i, plan1 in tqdm(enumerate(districtPlans), total=len(districtPlans)):
        for j, plan2 in enumerate(districtPlans):
            if distanceMatrix[i][j] == -1:
                distPlan1 = pd.read_json(f'{plan1}') #f'{folderOfPlans}/{plan2}
                distPlan2 = pd.read_json(f'{plan2}')
                distance = Pair(distPlan1, distPlan2).calculate_hamming_distance()
                distanceMatrix[i][j] = distance
                distanceMatrix[j][i] = distance
                
    # min-max normalization
    minDist = np.min(distanceMatrix)
    maxDist = np.max(distanceMatrix)

    normalizedDistanceMatrix = (distanceMatrix - minDist) / (maxDist - minDist)

    # MDS Graph
    mds = MDS(n_components=2, random_state=0, dissimilarity='precomputed')
    pos = mds.fit(normalizedDistanceMatrix).embedding_
   
    # Find the most optimal k by obtaining the max silhouette score for each possible k
    kClusters = range(2, 11) # must be at least 2 clusters
    silhouetteScores = []

    for k in kClusters:
        kScore = find_silhouette_score(k, normalizedDistanceMatrix)
        silhouetteScores.append(kScore)
    # plt.plot(kClusters, silhouetteScores, marker='o')
    # plt.xlabel('Number of Clusters (k)')
    # plt.ylabel('Silhouette Score')
    # plt.show()

    optimalKClusters = kClusters[np.argmax(silhouetteScores)]
    print(f"Most optimal number of clusters (k): {optimalKClusters}")

    # View K-Means plot 
    kmeans = KMeans(n_clusters=optimalKClusters, random_state=0, n_init='auto')
    kmeans.fit(pos)
    labels = kmeans.labels_
    plt.scatter(pos[:, 0], pos[:, 1], c=labels, cmap='viridis')
    plt.title('MDS with K-Means Clustering')
    # plt.show()

    # Get district plan points in each cluster
    pointsInCluster = {}
    for i, point in enumerate(pos):
        cluster_num = int(labels[i]) + 1
        if not cluster_num in pointsInCluster:
            pointsInCluster[cluster_num] = []
        pointsInCluster[cluster_num].append((round(point[0],3), round(point[1],3)))
        

    # Get centroids and number of points in each cluster
    centroids = []
    cluster_sizes = []
    for i in range(optimalKClusters):
        cluster_points = pos[labels == i]
        centroid = np.mean(cluster_points, axis=0)
        centroids.append(centroid)
        cluster_sizes.append(len(cluster_points))

    # for i in range(optimalKClusters):
    #     print(f"Cluster {i + 1}, Centroid: {centroids[i]} - x: {centroids[i][0]} - y: {centroids[i][1]}, # of district plans: {cluster_sizes[i]}")

    
    flattenedDistanceMatrix = np.array(normalizedDistanceMatrix).flatten()

    # Generate unique ID for current ensemble
    ensemble_UID = generateUID()

    ensemble_data = {
        "type": "EnsembleData",
        "ensemble_id": ensemble_UID,
        "num_district_plans": len(unsortedDistrictPlans),
        "data": {
            "distance_measure": "Hamming Distance",
            "num_clusters": 0,
            "avg_distance": float(round(np.mean(flattenedDistanceMatrix), 3)),
        }
    }

    clusters_in_ensemble = {
        "type": "ClusterData",
        "ensemble_id": ensemble_UID,
        "distance_measure": "Hamming Distance",
        "data": []
    }

    mds_graph_data = {
        "type": "MDSPlotOfClusters",
        "ensemble_id": ensemble_UID,
        "distance_measure": "Hamming Distance",
        "x_axis_label": "Dimension 1",
        "y_axis_label": "Dimension 2",
        "data": []
    }
    # Get points in each cluster
    for cluster_num in np.unique(labels):
        clusterNum = int(cluster_num) + 1
        current_cluster = {
            "cluster_number": clusterNum,
            "name": "cluster_placeholder",
            "num_dist_plans": 0,
            # avg_distance, splits, rep_percentage, dem_percentage, demographics
            "district_plans": [],
        }
        cluster_graph_data = {
            "cluster_num": clusterNum,
            "x": float(round(centroids[cluster_num][0], 3)),
            "y": float(round(centroids[cluster_num][1], 3)),
            "num_district_plans": 0,
            "cluster_id": generateUID()
        }
        ensemble_data['data']['num_clusters'] += 1
        cluster_points = pos[labels == cluster_num]
        cluster_indices = np.where(labels == cluster_num)[0]

        cluster_of_plans = []
        for planNum, pointCoords in zip(cluster_indices, cluster_points):
            planNum = int(planNum)
            current_cluster["num_dist_plans"] += 1
            cluster_of_plans.append(planNum)

        dist_plans = [str(i) for i in cluster_of_plans]
        current_cluster['district_plans'] = dist_plans
        cluster_graph_data['num_district_plans'] = len(dist_plans)

        clusters_in_ensemble["data"].append(current_cluster)
        mds_graph_data["data"].append(cluster_graph_data)

        create_folder_of_clusters(cluster_num+1, cluster_of_plans, districtPlans)
    
    dist_measure_data = {
            "type": "DistanceMeasuresData",
            "ensemble_id": ensemble_UID,
            "data": [
                {
                    "distanceMeasure": "Hamming Distance",
                    "min": float(round(np.min(flattenedDistanceMatrix), 3)),
                    "first_quartile": float(round(np.percentile(flattenedDistanceMatrix, 25), 3)),
                    "third_quartile": float(round(np.percentile(flattenedDistanceMatrix, 75),3)),
                    "max": float(round(np.max(flattenedDistanceMatrix),3)),
                }
            ]
        }

    # Output to json
    with open('EnsembleSummary.json', 'w') as file:
        json.dump(ensemble_data, file, indent=2) 
    with open('ClustersInEnsemble.json', 'w') as file:
        json.dump(clusters_in_ensemble, file, indent=2) 
    with open('DistanceMeasureData.json', 'w') as file:
        json.dump(dist_measure_data, file, indent=2)
    with open('MDSClusterData.json', 'w') as file:
        json.dump(mds_graph_data, file, indent=2)
    with open('DistrictPlanClusterPoints.json', 'w') as file:
        json.dump(pointsInCluster, file, indent=2)