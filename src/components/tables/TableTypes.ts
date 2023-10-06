
export type DistrictSelectionProps = {
    onDistrictSelection: (
      district_num: number,
      coordinates: Array<number>
    ) => void;
  }


export type ensembleData = {
  Num: number;
  ensemble1: number;
  ensemble2: number;
  ensemble3: number;
  ensemble4: number;
  ensemble5: number;
}

export type ensemble_summary_table = {
  ensemble: number;
  num_clusters: number;
  plans_needed: number;
}

export type district_summary_table = {
    district: number;
    predicted_winner: string;
    democrat: number;
    republican: number;
    map_value: Array<number>;
  }

  
