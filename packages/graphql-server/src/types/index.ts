import { Mesures, MesureStatus } from "../model/mesures.model";

export interface UpdateServiceMesuresResponse {
  data: {
    update_services: {
      affected_rows: number;
    };
    update_service_antenne: {
      affected_rows: number;
    }
  };
}

export interface UpdateMandataireMesuresResponse {
  data: {
    update_mandataires: {
      affected_rows: number;
    };
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
      mesures_awaiting: number;
      mesures_in_progress: number;
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
      service_id: number;
      mesures_awaiting: number;
      mesures_in_progress: number;
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
  "date_ouverture" | "cabinet" | "civilite" | "status" | "type" | "extinction"
>;
