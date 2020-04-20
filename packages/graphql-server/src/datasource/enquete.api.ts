import { logger } from "../logger";
import {
  CreateEnqueteIndividuelReponseQueryProps,
  EnqueteIndividuelQueryProps,
  EnqueteReponse
} from "../types";
import { AuthDataSource } from "./auth-datasource";

export class EnqueteAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public async createEnqueteIndividuelReponse(
    enqueteId: number,
    mandataireId: number
  ): Promise<EnqueteReponse | null> {
    const query = `
    mutation create_enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, type: "", enquete_individuel: {data: {mandataire_id: $mandataireId}}}) {
        id
        enquete_id
        enquete_individuel {
          id
          mandataire_id
          estimation_etp
          secretaire_specialise
          secretaire_specialise_etp
          cumul_prepose
          cumul_prepose_etp
          cumul_delegue_service
          cumul_delegue_service_etp
          debut_activite_avant_2009
          annee_debut_activite
          annee_agrement
          cnc_mjpm_annee_obtention
          cnc_mjpm_heure_formation
          cnc_maj_annee_obtention
          cnc_maj_heure_formation
          cnc_dpf_annee_obtention
          cnc_dpf_heure_formation
          niveau_qualification
          niveau_qualification_secretaire_spe
        }
        activite_curatelle_renforcee_etablissement_debut_annee
        activite_curatelle_renforcee_etablissement_fin_annee
        activite_curatelle_renforcee_domicile_debut_annee
        activite_curatelle_renforcee_domicile_fin_annee
        activite_curatelle_simple_etablissement_debut_annee
        activite_curatelle_simple_etablissement_fin_annee
        activite_curatelle_simple_domicile_debut_annee
        activite_curatelle_simple_domicile_fin_annee
        activite_tutelle_etablissement_debut_annee
        activite_tutelle_etablissement_fin_annee
        activite_tutelle_domicile_debut_annee
        activite_tutelle_domicile_fin_annee
        activite_accompagnement_judiciaire_etablissement_debut_annee
        activite_accompagnement_judiciaire_domicile_fin_annee
        activite_curatelle_biens_etablissement_debut_annee
        activite_curatelle_biens_etablissement_fin_annee
        activite_curatelle_biens_domicile_debut_annee
        activite_curatelle_biens_domicile_fin_annee
        activite_curatelle_personne_etablissement_debut_annee
        activite_curatelle_personne_etablissement_fin_annee
        activite_curatelle_personne_domicile_debut_annee
        activite_curatelle_personne_domicile_fin_annee
        activite_revisions_main_levee
        activite_revisions_masp
        activite_revisions_reconduction
        activite_revisions_changement
        activite_revisions_autre
        activite_sorties_main_levee
        activite_sorties_deces
        activite_sorties_masp
      }
    }    
    `;

    const { data, errors } = await this.post<
      CreateEnqueteIndividuelReponseQueryProps
    >("/", {
      query,
      variables: { enqueteId, mandataireId }
    });

    if (errors) {
      errors.forEach(e => logger.error(e.message));
      return null;
    }

    return data.insert_enquete_reponses_one;
  }

  public async getEnqueteIndividuel(enqueteId: number) {
    const query = `
      query enquete_individuels($enqueteId: Int!) {
        enquete_reponses(where: { enquete_id: {_eq: $enqueteId}}) {
          id
          enquete_id
          enquete_individuel {
            id
            mandataire_id
            estimation_etp
            secretaire_specialise
            secretaire_specialise_etp
            cumul_prepose
            cumul_prepose_etp
            cumul_delegue_service
            cumul_delegue_service_etp
            debut_activite_avant_2009
            annee_debut_activite
            annee_agrement
            cnc_mjpm_annee_obtention
            cnc_mjpm_heure_formation
            cnc_maj_annee_obtention
            cnc_maj_heure_formation
            cnc_dpf_annee_obtention
            cnc_dpf_heure_formation
            niveau_qualification
            niveau_qualification_secretaire_spe
          }
          activite_curatelle_renforcee_etablissement_debut_annee
          activite_curatelle_renforcee_etablissement_fin_annee
          activite_curatelle_renforcee_domicile_debut_annee
          activite_curatelle_renforcee_domicile_fin_annee
          activite_curatelle_simple_etablissement_debut_annee
          activite_curatelle_simple_etablissement_fin_annee
          activite_curatelle_simple_domicile_debut_annee
          activite_curatelle_simple_domicile_fin_annee
          activite_tutelle_etablissement_debut_annee
          activite_tutelle_etablissement_fin_annee
          activite_tutelle_domicile_debut_annee
          activite_tutelle_domicile_fin_annee
          activite_accompagnement_judiciaire_etablissement_debut_annee
          activite_accompagnement_judiciaire_domicile_fin_annee
          activite_curatelle_biens_etablissement_debut_annee
          activite_curatelle_biens_etablissement_fin_annee
          activite_curatelle_biens_domicile_debut_annee
          activite_curatelle_biens_domicile_fin_annee
          activite_curatelle_personne_etablissement_debut_annee
          activite_curatelle_personne_etablissement_fin_annee
          activite_curatelle_personne_domicile_debut_annee
          activite_curatelle_personne_domicile_fin_annee
          activite_revisions_main_levee
          activite_revisions_masp
          activite_revisions_reconduction
          activite_revisions_changement
          activite_revisions_autre
          activite_sorties_main_levee
          activite_sorties_deces
          activite_sorties_masp
        }
      }
    `;

    const { data } = await this.post<EnqueteIndividuelQueryProps>("/", {
      query,
      variables: { enqueteId }
    });

    return data;
  }
}
