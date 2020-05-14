import { Mesures, MesureStatus } from "../model/mesures.model";
import { ApolloError } from "apollo-server-koa";

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

export interface EnqueteIndividuel {
  id: number;
  mandataire_id: number;
  estimation_etp?: string;
  secretaire_specialise?: string;
  secretaire_specialise_etp?: string;
  cumul_prepose?: boolean;
  cumul_prepose_etp?: string;
  cumul_delegue_service?: boolean;
  cumul_delegue_service_etp?: string;
  debut_activite_avant_2009?: boolean;
  annee_debut_activite?: number;
  annee_agrement?: number;
  cnc_mjpm_annee_obtention?: number;
  cnc_mjpm_heure_formation?: number;
  cnc_maj_annee_obtention?: number;
  cnc_maj_heure_formation?: number;
  cnc_dpf_annee_obtention?: number;
  cnc_dpf_heure_formation?: number;
  niveau_qualification?: number;
  niveau_qualification_secretaire_spe?: number;
}

export interface CreateEnqueteIndividuelReponseQueryProps {
  errors: ApolloError[];
  data: {
    insert_enquete_reponses_one: EnqueteReponse;
  };
}

export interface EnqueteReponse {
  id: number;
  enquete_reponses_activite_id?: number;
  enquete_reponses_agrements_formations_id?: number;
  enquete_reponses_informations_mandataire_id?: number;
  enquete_reponses_populations_id?: number;
  enquete_reponses_prestations_sociale_id?: number;
  mandataire_id?: number;
  service_id?: number;
  submitted_at: string;
  created_at: string;
}

export interface EnqueteReponseQueryProps {
  error: ApolloError;
  data: {
    enquete_reponses: EnqueteReponse[];
  };
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
