import { Mesures, MesureStatus } from "../model/mesures.model";

export interface UpdateServiceMesuresResponse {
  data: {
    update_services: {
      affected_rows: number;
    };
  };
}

export interface UpdateAntenneServiceMesuresResponse {
  data: {
    update_service_antenne: {
      affected_rows: number;
    };
  };
}

export interface UpdateMandataireMesuresResponse {
  data: {
    update_mandataires: {
      affected_rows: number;
    };
  };
}

export interface CountAntenneMesuresQueryResult {
  data?: {
    service_antenne: {
      service_id: number;
      id: number;
      mesures_aggregate: {
        aggregate: {
          count: number;
        };
      };
    }[];
  };
}

export interface CountMandataireMesuresQueryResult {
  data?: {
    inprogressMesures: {
      aggregate: {
        count: number;
      };
    };
    awaitingMesures: {
      aggregate: {
        count: number;
      };
    };
    mandataires: {
      mesures_en_attente: number;
      mesures_en_cours: number;
    }[];
  };
}

export interface CountServiceMesuresQueryResult {
  data?: {
    inprogressMesures: {
      aggregate: {
        count: number;
      };
    };
    awaitingMesures: {
      aggregate: {
        count: number;
      };
    };
    services: {
      id: number;
      mesures_awaiting: number;
      mesures_in_progress: number;
    }[];
    service_antenne: {
      id: number;
      mesures_awaiting: {
        aggregate: {
          count: number;
        };
      };
      mesures_in_progress: {
        aggregate: {
          count: number;
        };
      };
    }[];
  };
}

export type NullableString = string | null;
export type NullableNumber = number | null;
export type NullableDate = Date | null;

export interface SearchMesureResultWrapper {
  mesures: SearchMesureResult[];
}

export interface SearchMesuresParam {
  closed?: {
    between?: {
      start: string;
      end: string;
    };
    gt_or_null?: string;
  };
  court?: NullableNumber;
  created?: {
    between?: {
      start: string;
      end: string;
    };
    lt?: string;
  };
  department?: NullableNumber;
  opening?: {
    between?: {
      start: string;
      end: string;
    };
    lt?: string;
  };
  region?: NullableNumber;
  status?: MesureStatus;
  type?: {
    _in: string[];
  };
}

export type SearchMesureResult = Pick<
  Mesures,
  "date_nomination" | "cabinet" | "civilite" | "status" | "type" | "date_fin_mesure"
>;
