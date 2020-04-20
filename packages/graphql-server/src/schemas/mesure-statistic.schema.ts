import { gql } from "apollo-server-koa";

export default gql`
  type Query {
    newMesureNumber(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): Int!

    closedMesureNumber(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): Int!

    enqueteIndividuel(enqueteId: Int!, mandataireId: Int!): EnqueteIndividuel!

    openMesureNumber(region: Int, department: Int, court: Int): Int!

    availableMesureNumber(region: Int, department: Int, court: Int): Int!

    mesureTypeCategoryStatistics(
      region: Int
      department: Int
      court: Int
    ): [MesureTypeCategoryStatistic!]!

    mesureTypeCategoryEvolution(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): [MesureTypeCategoryEvolution!]!

    departmentAvailabilities: [DepartmentAvailibility!]!
  }

  type Mutation {
    recalculateMandataireMesuresCount(mandataireId: Int!): UpdatedRows
    recalculateServiceMesuresCount(serviceId: Int!): UpdatedRows
  }

  type EnqueteIndividuelInformations {
    estimation_etp: String
    secretaire_specialise: Boolean
    secretaire_specialise_etp: String
    cumul_prepose: Boolean
    cumul_prepose_etp: String
    cumul_delegue_service: Boolean
    cumul_delegue_service_etp: String
    debut_activite_avant_2009: Boolean
    annee_debut_activite: Int
    annee_agrement: Int
    cnc_mjpm_annee_obtention: Int
    cnc_mjpm_heure_formation: Int
    cnc_maj_annee_obtention: Int
    cnc_maj_heure_formation: Int
    cnc_dpf_annee_obtention: Int
    cnc_dpf_heure_formation: Int
    niveau_qualification: Int
    niveau_qualification_secretaire_spe: Int
  }

  type EnqueteIndividuel {
    mandataire_id: Int
    enquete_id: Int
    enquete_reponse_id: Int
    enquete_individuel_id: Int
    informations: EnqueteIndividuelInformations
    activite: EnqueteActivite
  }

  type EnqueteActivite {
    curatelle_renforcee_etablissement_debut_annee: Int
    curatelle_renforcee_etablissement_fin_annee: Int
    curatelle_renforcee_domicile_debut_annee: Int
    curatelle_renforcee_domicile_fin_annee: Int
    curatelle_simple_etablissement_debut_annee: Int
    curatelle_simple_etablissement_fin_annee: Int
    curatelle_simple_domicile_debut_annee: Int
    curatelle_simple_domicile_fin_annee: Int
    tutelle_etablissement: Int
    tutelle_domicile: Int
    accompagnement_judiciaire_etablissement: Int
    accompagnement_judiciaire_domicile: Int
    curatelle_biens_etablissement: Int
    curatelle_biens_domicile: Int
    curatelle_personne_etablissement: Int
    curatelle_personne_domicile: Int
    revisions_main_levee: Int
    revisions_masp: Int
    revisions_reconduction: Int
    revisions_changement: Int
    revisions_autre: Int
    sorties_main_levee: Int
    sorties_deces: Int
    sorties_masp: Int
  }

  type UpdatedRows {
    success: Boolean!
    updatedRows: Int
  }

  type DepartmentAvailibility {
    department: Department!
    inProgress: Int!
    available: Int!
    awaiting: Int!
    max: Int!
  }

  type Department {
    code: String!
    nom: String!
  }

  type MesureTypeCategoryEvolution {
    start: String!
    end: String!
    mesureTypeCategory: MesureTypeCategory!
    monthlyEvolutions: [MonthlyNumber!]!
  }

  type MonthlyNumber {
    month: Int!
    year: Int!
    number: Int!
  }

  type MesureTypeCategoryStatistic {
    mesureTypeCategory: MesureTypeCategory!
    number: Int!
  }

  enum MesureTypeCategory {
    TUTELLE
    CURATELLE_SIMPLE
    CURATELLE_RENFORCEE
    SAUVEGARDE_JUSTICE
    OTHER
  }
`;
