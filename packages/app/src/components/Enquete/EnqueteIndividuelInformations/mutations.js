import gql from "graphql-tag";

export const UPDATE_ENQUETE_INFORMATIONS_AGREMENTS = gql`
  mutation update_enquete_individuel_agrements(
    $id: Int!
    $debut_activite_avant_2009: Boolean
    $annee_agrement: Int
    $nb_departements: String
    $nb_mesures_dep_finance: Int
    $nb_mesures_dep_autres: Int
  ) {
    update_enquete_reponses_agrements_formations_by_pk(
      pk_columns: { id: $id }
      _set: {
        debut_activite_avant_2009: $debut_activite_avant_2009
        annee_agrement: $annee_agrement
        nb_departements: $nb_departements
        nb_mesures_dep_finance: $nb_mesures_dep_finance
        nb_mesures_dep_autres: $nb_mesures_dep_autres
      }
    ) {
      id
      debut_activite_avant_2009
      annee_agrement
      nb_departements
      nb_mesures_dep_finance
      nb_mesures_dep_autres
    }
  }
`;

export const UPDATE_ENQUETE_INFORMATIONS_FORMATION = gql`
  mutation update_enquete_individuel_formation(
    $id: Int!
    $cnc_annee_obtention: Int
    $cnc_heures_formation: Float
    $niveau_qualification: Int
    $secretaire_specialise_etp_n1: Float
    $secretaire_specialise_etp_n2: Float
    $secretaire_specialise_etp_n3: Float
    $secretaire_specialise_etp_n4: Float
    $secretaire_specialise_etp_n5: Float
    $secretaire_specialise_etp_n6: Float
  ) {
    update_enquete_reponses_agrements_formations_by_pk(
      pk_columns: { id: $id }
      _set: {
        cnc_annee_obtention: $cnc_annee_obtention
        cnc_heures_formation: $cnc_heures_formation
        niveau_qualification: $niveau_qualification
        secretaire_specialise_etp_n1: $secretaire_specialise_etp_n1
        secretaire_specialise_etp_n2: $secretaire_specialise_etp_n2
        secretaire_specialise_etp_n3: $secretaire_specialise_etp_n3
        secretaire_specialise_etp_n4: $secretaire_specialise_etp_n4
        secretaire_specialise_etp_n5: $secretaire_specialise_etp_n5
        secretaire_specialise_etp_n6: $secretaire_specialise_etp_n6
      }
    ) {
      id
      cnc_annee_obtention
      cnc_heures_formation
      niveau_qualification
      secretaire_specialise_etp_n1
      secretaire_specialise_etp_n2
      secretaire_specialise_etp_n3
      secretaire_specialise_etp_n4
      secretaire_specialise_etp_n5
      secretaire_specialise_etp_n6
    }
  }
`;

export const UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS = gql`
  mutation update_enquete_individuel_informations(
    $id: Int!
    $anciennete: String
    $benevole: Boolean
    $estimation_etp: String
    $forme_juridique: String
    $exerce_seul_activite: Boolean
    $local_professionnel: Boolean
    $secretaire_specialise_etp: Float
    $sexe: String
    $tranche_age: String
    $departement: String
    $region: String
    $nom: String
  ) {
    update_enquete_reponses_informations_mandataire_by_pk(
      pk_columns: { id: $id }
      _set: {
        anciennete: $anciennete
        benevole: $benevole
        estimation_etp: $estimation_etp
        forme_juridique: $forme_juridique
        local_professionnel: $local_professionnel
        exerce_seul_activite: $exerce_seul_activite
        secretaire_specialise_etp: $secretaire_specialise_etp
        sexe: $sexe
        tranche_age: $tranche_age
        departement: $departement
        region: $region
        nom: $nom
      }
    ) {
      sexe
      exerce_seul_activite
      secretaire_specialise_etp
      local_professionnel
      last_update
      id
      forme_juridique
      estimation_etp
      created_at
      benevole
      anciennete
      tranche_age
      departement
      region
      nom
    }
  }
`;
