import type {
  ensembleData,
  ensemble_summary_table,
  district_summary_table,
} from "./types/TableTypes";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Details about the ensembles (Distance measures data)


// Ensemble data
export const ensembleData_2 = [
  {"Num": 1, "ensemble1": 9, "ensemble2": 6, "ensemble3": 3, "ensemble4": 9, "ensemble5": 5},
  {"Num": 26, "ensemble1": 40, "ensemble2": 23, "ensemble3": 17, "ensemble4": 37, "ensemble5": 20},
  {"Num": 51, "ensemble1": 40, "ensemble2": 30, "ensemble3": 30, "ensemble4": 42, "ensemble5": 28},
  {"Num": 76, "ensemble1": 50, "ensemble2": 39, "ensemble3": 35, "ensemble4": 45, "ensemble5": 35},
  {"Num": 101, "ensemble1": 52, "ensemble2": 40, "ensemble3": 40, "ensemble4": 47, "ensemble5": 37},
  {"Num": 126, "ensemble1": 54, "ensemble2": 41, "ensemble3": 42, "ensemble4": 49, "ensemble5": 39},
]

export const data01 = [
  { x: 100, y: 60, z: 1 },
  { x: 120, y: 30, z: 2 },
  { x: 170, y: 50, z: 3 },
  { x: 140, y: 35, z: 4 },
  { x: 150, y: 70, z: 5 },
  { x: 110, y: 58, z: 6 },
  { x: 140, y: 31, z: 7 },
  { x: 20, y: 40, z: 8 },
  { x: 16, y: 70, z: 9 },
  { x: 90, y: 20, z: 10 },
  { x: 45, y: 58, z: 11 },
  { x: 45, y: 91, z: 12 },
  { x: 20, y: 40, z: 13 },
  { x: 97, y: 70, z: 14 },
  { x: 94, y: 30, z: 15 },
  { x: 87, y: 29, z: 16 },
  { x: 89, y: 35, z: 17 },
];

// Unavailable data for district plan scatter plot data
export const data02 = [
  { x: 133, y: 60, z: 18 },
  { x: 122, y: 30, z: 19 },
  { x: 111, y: 50, z: 20 },
  { x: 138, y: 35, z: 21 },
  { x: 177, y: 70, z: 22 },
  { x: 173, y: 58, z: 23 },
  { x: 179, y: 31, z: 24 },
  { x: 35, y: 40, z: 25 },
  { x: 11, y: 70, z: 26 },
  { x: 88, y: 20, z: 27 },
  { x: 45, y: 58, z: 28 },
  { x: 90, y: 91, z: 29 },
  { x: 20, y: 40, z: 30 },
  { x: 97, y: 70, z: 31 },
  { x: 94, y: 30, z: 32 },
  { x: 87, y: 29, z: 33 },
  { x: 89, y: 35, z: 34 },
];




export const district_plan_data: district_summary_table[] = [
  {
    district_plan: 1,
    opportunity_districts: 5,
    democrat: '30%',
    republican: '70%',
    map_value: [35.5, -115],
  },
  {
    district_plan: 2,
    opportunity_districts: 20,
    democrat: '60%',
    republican: '40%',
    map_value: [40.5, -115],
  },
  {
    district_plan: 3,
    opportunity_districts: 13,
    democrat: '70%',
    republican: '30%',
    map_value: [38.5, -118], // -112 goes right and -115 goes left
  },
  {
    district_plan: 4,
    opportunity_districts: 9,
    democrat: '55%',
    republican: '45%',
    map_value: [40.5, -118],
  },
  {
    district_plan: 5,
    opportunity_districts: 17,
    democrat: '34%',
    republican: '66%',
    map_value: [39.5, -120],
  },
];