import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE = gql`
  query enquete_reponses_informations_mandataire($id: Int!) {
    enquete_reponses_informations_mandataire_by_pk(id: $id) {
      anciennete
      benevole
      created_at
      estimation_etp
      forme_juridique
      id
      last_update
      local_professionnel
      exerce_seul_activite
      exerce_secretaires_specialises
      secretaire_specialise_etp
      sexe
      region
      departement
      nom
      tranche_age
    }
  }
`;

export const ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS = gql`
  query enquete_reponses_agrements($id: Int!) {
    enquete_reponses_agrements_formations_by_pk(id: $id) {
      id
      debut_activite_avant_2009
      annee_agrement
      annee_debut_activite
      nb_departements
      nb_mesures_dep_finance
      nb_mesures_dep_autres
    }
  }
`;

export const ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION = gql`
  query enquete_reponses_formation($id: Int!) {
    enquete_reponses_agrements_formations_by_pk(id: $id) {
      cnc_annee_obtention
      cnc_heures_formation
      created_at
      cumul_delegue_service
      cumul_delegue_service_etp
      cumul_prepose
      cumul_prepose_etp
      debut_activite_avant_2009
      id
      last_update
      niveau_qualification
      nb_departements
      nb_mesures_dep_finance
      nb_mesures_dep_autres
      secretaire_specialise_etp_n1
      secretaire_specialise_etp_n2
      secretaire_specialise_etp_n3
      secretaire_specialise_etp_n4
      secretaire_specialise_etp_n5
      secretaire_specialise_etp_n6
    }
  }
`;
