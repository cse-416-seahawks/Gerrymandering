import type {
  ensembleData,
  ensemble_summary_table,
  district_summary_table,
} from "./tables/TableTypes";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const clusterData = [
  {
    cluster: 1,
    name: "clusterA",
    num_dist_plans: 312,
    avg_distance: 12.2,
    avg_rep: "47%",
    avg_dem: "53%",
    avg_white: "72%",
    avg_black: "1%",
    avg_asian: "1%",
    avg_latino: "18%",
    other: "7%",
  },
  {
    cluster: 2,
    name: "clusterB",
    num_dist_plans: 126,
    avg_distance: 32.8,
    avg_rep: "31%",
    avg_dem: "69%",
    avg_white: "2%",
    avg_black: "18%",
    avg_asian: "15%",
    avg_latino: "18%",
    other: "47%",
  },
  {
    cluster: 3,
    name: "clusterC",
    num_dist_plans: 229,
    avg_distance: 12.2,
    avg_rep: "47%",
    avg_dem: "53%",
    avg_white: "72%",
    avg_black: "1%",
    avg_asian: "1%",
    avg_latino: "18%",
    other: "7%",
  },
  {
    cluster: 4,
    name: "clusterD",
    num_dist_plans: 581,
    avg_distance: 12.2,
    avg_rep: "47%",
    avg_dem: "53%",
    avg_white: "72%",
    avg_black: "1%",
    avg_asian: "1%",
    avg_latino: "18%",
    other: "7%",
  },
  {
    cluster: 5,
    name: "clusterE",
    num_dist_plans: 414,
    avg_distance: 12.2,
    avg_rep: "47%",
    avg_dem: "53%",
    avg_white: "72%",
    avg_black: "1%",
    avg_asian: "1%",
    avg_latino: "18%",
    other: "7%",
  },
];

export const clusterTempData = [
  {
    cluster: 1,
    name: "cluster A",
    data: [
      {
        name: "Number of Districts",
        value: "48",
      },
      {
        name: "Political Party Ratio",
        value: "68% Democratic / 32% Republican",
      },
      {
        name: "Average Republican Voters",
        value: "47%",
      },
      {
        name: "Average Democratic Voters",
        value: "53%",
      },
    ],
    distanceMeasures: [
      {
        name: "Optimal transport",
        value: "32.1",
      },
      {
        name: "Hamming distance",
        value: "21.2",
      },
      {
        name: "Total Variation Distance",
        value: "19.2",
      },
    ],
    demographicGroups: [
      // district average by racial group
      {
        name: "White",
        value: "31%",
      },
      {
        name: "Black",
        value: "32%",
      },
      {
        name: "Asian",
        value: "23%",
      },
      {
        name: "Other",
        value: "24%",
      },
    ],
  },
  {
    cluster: 2,
    name: "cluster B",
    data: [
      {
        name: "Number of Districts",
        value: "23",
      },
      {
        name: "Political Party Ratio",
        value: "32% Democratic / 68% Republican",
      },
      {
        name: "Average Republican Voters",
        value: "78%",
      },
      {
        name: "Average Democratic Voters",
        value: "22%",
      },
    ],
    distanceMeasures: [
      {
        name: "Optimal transport",
        value: "45.9",
      },
      {
        name: "Hamming distance",
        value: "17.4",
      },
      {
        name: "Total Variation Distance",
        value: "11",
      },
    ],
    demographicGroups: [
      // district average by racial group
      {
        name: "White",
        value: "31%",
      },
      {
        name: "Black",
        value: "32%",
      },
      {
        name: "Asian",
        value: "23%",
      },
      {
        name: "Other",
        value: "24%",
      },
    ],
  },
  {
    cluster: 3,
    name: "clusterC",
    data: [
      {
        name: "Number of Districts",
        value: "31",
      },
      {
        name: "Political Party Ratio",
        value: "56% Democratic / 44% Republican",
      },

      {
        name: "Average Republican Voters",
        value: "58%",
      },
      {
        name: "Average Democratic Voters",
        value: "42%",
      },
    ],
    demographicGroups: [
      // district average by racial group
      {
        name: "White",
        value: "31%",
      },
      {
        name: "Black",
        value: "32%",
      },
      {
        name: "Asian",
        value: "23%",
      },
      {
        name: "Other",
        value: "24%",
      },
    ],
    distanceMeasures: [
      {
        name: "Optimal transport",
        value: "8.8",
      },
      {
        name: "Hamming distance",
        value: "16.8",
      },
      {
        name: "Total Variation Distance",
        value: "15.1",
      },
    ],
  },
];

export const Data3: ensemble_summary_table[] = [
  { ensemble: 1, num_clusters: 3, plans_needed: 309 },
  { ensemble: 2, num_clusters: 4.3, plans_needed: 425 },
  { ensemble: 3, num_clusters: 4.6, plans_needed: 321 },
  { ensemble: 4, num_clusters: 5.3, plans_needed: 251 },
  { ensemble: 5, num_clusters: 6.3, plans_needed: 268 },
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

export const Data1 = [
  { party: "Republican", men: "59%", women: "41%" },
  { party: "Democrat", men: "44%", women: "56%" },
];

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

export let sampleEnsembleData = [
  {
    ensemble: 1,
    data: [
      { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
      {
        label: "Average distance between clusters",
        detail: getRandomNumber(12.1, 62.1),
      },
      {
        label: "Number of district plans",
        detail: getRandomNumber(500, 1000),
      },
    ],
    expanded: true,
  },
  {
    ensemble: 2,
    data: [
      { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
      {
        label: "Average distance between clusters",
        detail: getRandomNumber(12.1, 62.1),
      },
      {
        label: "Number of district plans",
        detail: getRandomNumber(500, 1000),
      },
    ],
  },
  {
    ensemble: 3,
    data: [
      { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
      {
        label: "Average distance between clusters",
        detail: getRandomNumber(12.1, 62.1),
      },
      {
        label: "Number of district plans",
        detail: getRandomNumber(500, 1000),
      },
    ],
  },
  {
    ensemble: 4,
    data: [
      { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
      {
        label: "Average distance between clusters",
        detail: getRandomNumber(12.1, 62.1),
      },
      {
        label: "Number of district plans",
        detail: getRandomNumber(500, 1000),
      },
    ],
  },
  {
    ensemble: 5,
    data: [
      { label: "Numbers of clusters", detail: getRandomNumber(7, 20) },
      {
        label: "Average distance between clusters",
        detail: getRandomNumber(12.1, 62.1),
      },
      {
        label: "Number of district plans",
        detail: getRandomNumber(500, 1000),
      },
    ],
  },
];

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
