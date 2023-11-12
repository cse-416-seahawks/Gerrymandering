import type {
  ensembleData,
  ensemble_summary_table,
  district_summary_table,
} from "./tables/TableTypes";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Details about the ensembles (Distance measures data)
export const Data3: ensemble_summary_table[] = [
  { ensemble: 1, num_clusters: 3, plans_needed: 309 },
  { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
  { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
  { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
  { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
];

// Ensemble data
export const ensembleData_2: ensembleData[] = [];
let a = Math.random() * 10;
let b = Math.random() * 10;
let c = Math.random() * 10;
let d = Math.random() * 10;
for (let i = 1; i <= 500; i++) {
  ensembleData_2.push({
    Num: i,
    ensemble1: Math.log(i) * 10,
    ensemble2: (Math.log(i) / Math.log(9)) * 10 + a,
    ensemble3: Math.log(i) / Math.log(8) + b,
    ensemble4: (Math.log(i) / Math.log(7)) * 10 + c,
    ensemble5: (Math.log(i) * 10) / Math.log(6) + d,
  });
}


// Scatter plot data for cluster and district plan (dummy data)
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


