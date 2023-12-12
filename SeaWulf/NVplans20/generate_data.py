import json
import os
import shutil
#from tqdm import tqdm
import pandas as pd
import numpy as np
import multiprocessing
import matplotlib.pyplot as plt
from scipy.optimize import linear_sum_assignment
from sklearn.manifold import MDS
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from random import randint
from calc_hamming import HammingPair

# def find_silhouette_score(k, data):
#     kmeans = KMeans(n_clusters=k)
#     labels = kmeans.fit_predict(data)
#     return silhouette_score(data, labels)

def create_folder_of_clusters(cluster_num, district_plans, files):
    current_directory = os.getcwd()
    new_directory = "cluster" + str(cluster_num)
    os.mkdir(new_directory)
    for i in district_plans:
        shutil.move(os.path.join(current_directory, files[i]), os.path.join(new_directory, files[i]))

def generateUID():
    return str(randint(100000, 999999))

    # Returns a tuple of 3 items to index distance matrix
def calculate_hamming_distance(i,j, plan1, plan2, planIDMappings, distanceMatrix):
    if distanceMatrix[i][j] == -1:
        try:
            jsonplan1 = pd.read_json(plan1)
        except ValueError as e:
            print(f"Error reading JSON for plan", planIDMappings[i][1])
        
        try:
            jsonplan2 = pd.read_json(plan2)
        except ValueError as e:
            print(f"Error reading JSON for plan", planIDMappings[j][1])
        return [i,j,HammingPair(jsonplan1, jsonplan2).calculate_hamming_distance()]


if __name__ == "__main__":
    current_directory = os.getcwd()
    # folderOfPlans = 'NVplans20'

    # Get a list of all files of plans
    districtPlans = [file for file in os.listdir(current_directory) if file.endswith('.json')]
    # print(unsortedDistrictPlans)
    # Sorts plans by number in file (e.g. 'NVplan0')
    # districtPlans = sorted(unsortedDistrictPlans, key= lambda p:int(''.join(filter(str.isdigit, p))))

    # Create ID for each district plan
    planIDMappings = {}
    for i, plan in enumerate(districtPlans):
        planIDMappings[i] = (generateUID(), ''.join(filter(str.isdigit, plan)), i)

    # initalize distance matrix of plans
    distanceMatrix = [[-1 for _ in districtPlans] for _ in districtPlans]


    # Multiprocessing  
    num_plans = len(districtPlans)

    args_list = [(i, j, districtPlans[planIDMappings[i][2]],districtPlans[planIDMappings[j][2]], planIDMappings, distanceMatrix)
                 for i in range(num_plans) for j in range(i + 1, num_plans)]

    with multiprocessing.Pool() as pool:
        distances = pool.starmap(calculate_hamming_distance, args_list)

    for i, j, distance in distances:
            distanceMatrix[i][j] = distance
            distanceMatrix[j][i] = distance


            
    # for i, plan1 in enumerate(districtPlans):
    #     for j, plan2 in enumerate(districtPlans):
    #         if distanceMatrix[i][j] == -1:
    #             distPlan1 = pd.read_json(plan1) #f'{folderOfPlans}/{plan2}
    #             distPlan2 = pd.read_json(plan2)
    #             distance = HammingPair(distPlan1, distPlan2).calculate_hamming_distance()
    #             distanceMatrix[i][j] = distance
    #             distanceMatrix[j][i] = distance
                
    # min-max normalization
    minDist = np.min(distanceMatrix)
    maxDist = np.max(distanceMatrix)

    normalizedDistanceMatrix = (distanceMatrix - minDist) / (maxDist - minDist)

    print(normalizedDistanceMatrix)

    # MDS Graph
    mds = MDS(n_components=2, random_state=0, dissimilarity='precomputed')
    pos = mds.fit(normalizedDistanceMatrix).embedding_

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


    # Find the most optimal k by obtaining the max silhouette score for each possible k
    kClusters = range(4, 11) # must be at least 2 clusters
    silhouetteScores = []

    for k in kClusters:
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(normalizedDistanceMatrix)
        cluster_silhouette = silhouette_score(normalizedDistanceMatrix, kmeans.labels_)
        silhouetteScores.append(cluster_silhouette)
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
    #plt.show()

    # Get district plan points in each cluster
    pointsInCluster = {}
    for i, point in enumerate(pos):
        cluster_num = int(labels[i]) + 1
        if not cluster_num in pointsInCluster:
            pointsInCluster[cluster_num] = []
        pointsInCluster[cluster_num].append({
            "district_plan_id": planIDMappings[i][0],
            "district_plan": str(planIDMappings[i][1]),
            "x":round(point[0],3),
            "y": round(point[1],3)
        })

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
        "num_district_plans": len(districtPlans),
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
        dist_plan_ids = []
        for planNum, pointCoords in zip(cluster_indices, cluster_points):
            planNum = int(planNum)
            current_cluster["num_dist_plans"] += 1
            cluster_of_plans.append(planNum)
            dist_plan_ids.append(planIDMappings[planNum][0])

        # dist_plans = [str(i) for i in cluster_of_plans]
        current_cluster['district_plans'] = dist_plan_ids
        cluster_graph_data['num_district_plans'] = len(dist_plan_ids)

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
    with open('EnsembleSummaryData.json', 'w') as file:
        json.dump(ensemble_data, file, indent=2) 
    with open('ClustersEnsembleData.json', 'w') as file:
        json.dump(clusters_in_ensemble, file, indent=2) 
    with open('DistanceMeasuresData.json', 'w') as file:
        json.dump(dist_measure_data, file, indent=2)
    with open('MDSPlotOfClusters.json', 'w') as file:
        json.dump(mds_graph_data, file, indent=2)
    with open('DistrictPlanClusterPoints.json', 'w') as file:
        json.dump(pointsInCluster, file, indent=2)