import os
import json
import sys
from tqdm import tqdm

def process_directory(directory_path):
    items = os.listdir(directory_path)
    total_len = len(items)
    
    progress_bar = tqdm(total=total_len, desc="Processing Ensembles", unit="ensemble directory")
    for item in items:
        item_path = os.path.join(directory_path, item)

        if os.path.isdir(item_path):
            print(f"Processing directory: {item_path}")

            process_ensemble(item_path)
            
        progress_bar.update(1)
    
    progress_bar.close()

def find_file(directory_path, target_file_name):
    return next(
        (
            os.path.join(root, target_file_name)
            for root, dirs, files in os.walk(directory_path)
            if target_file_name in files
        ),
        None,
    )

def process_ensemble(ensemble_path):
    with open(find_file(ensemble_path, "DistrictPlanClusterPoints.json"), 'r') as file:
        cluster_points = json.load(file)
        
    for cluster, plans in cluster_points.items():
        process_cluster(os.path.join(ensemble_path, f"cluster{cluster}"), plans)

def process_cluster(cluster_path, plans):
    for plan in plans:
        plan_number = plan["district_plan"]
        if file_path := find_file(cluster_path, f"NVplan{plan_number}"):
            with open(file_path, 'r') as plan_file:
                plan_geojson = json.load(plan_file)

            for feature in plan_geojson["features"]:
                feature["properties"]["PLANID"] = plan["district_plan_id"]

            with open(file_path, 'w') as plan_file:
                json.dump(plan_geojson, plan_file, indent=2)


if len(sys.argv) != 2:
    print("Usage: python convert_planids.py <relative_file_path>")
    sys.exit(1)

relative_file_path = sys.argv[1]