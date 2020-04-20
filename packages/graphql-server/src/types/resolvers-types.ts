export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Department = {
   __typename?: 'Department',
  code: Scalars['String'],
  nom: Scalars['String'],
};

export type DepartmentAvailibility = {
   __typename?: 'DepartmentAvailibility',
  department: Department,
  inProgress: Scalars['Int'],
  available: Scalars['Int'],
  awaiting: Scalars['Int'],
  max: Scalars['Int'],
};

export type EnqueteActivite = {
   __typename?: 'EnqueteActivite',
  curatelle_renforcee_etablissement_debut_annee?: Maybe<Scalars['Int']>,
  curatelle_renforcee_etablissement_fin_annee?: Maybe<Scalars['Int']>,
  curatelle_renforcee_domicile_debut_annee?: Maybe<Scalars['Int']>,
  curatelle_renforcee_domicile_fin_annee?: Maybe<Scalars['Int']>,
  curatelle_simple_etablissement_debut_annee?: Maybe<Scalars['Int']>,
  curatelle_simple_etablissement_fin_annee?: Maybe<Scalars['Int']>,
  curatelle_simple_domicile_debut_annee?: Maybe<Scalars['Int']>,
  curatelle_simple_domicile_fin_annee?: Maybe<Scalars['Int']>,
  tutelle_etablissement?: Maybe<Scalars['Int']>,
  tutelle_domicile?: Maybe<Scalars['Int']>,
  accompagnement_judiciaire_etablissement?: Maybe<Scalars['Int']>,
  accompagnement_judiciaire_domicile?: Maybe<Scalars['Int']>,
  curatelle_biens_etablissement?: Maybe<Scalars['Int']>,
  curatelle_biens_domicile?: Maybe<Scalars['Int']>,
  curatelle_personne_etablissement?: Maybe<Scalars['Int']>,
  curatelle_personne_domicile?: Maybe<Scalars['Int']>,
  revisions_main_levee?: Maybe<Scalars['Int']>,
  revisions_masp?: Maybe<Scalars['Int']>,
  revisions_reconduction?: Maybe<Scalars['Int']>,
  revisions_changement?: Maybe<Scalars['Int']>,
  revisions_autre?: Maybe<Scalars['Int']>,
  sorties_main_levee?: Maybe<Scalars['Int']>,
  sorties_deces?: Maybe<Scalars['Int']>,
  sorties_masp?: Maybe<Scalars['Int']>,
};

export type EnqueteIndividuel = {
   __typename?: 'EnqueteIndividuel',
  mandataire_id?: Maybe<Scalars['Int']>,
  enquete_id?: Maybe<Scalars['Int']>,
  enquete_reponse_id?: Maybe<Scalars['Int']>,
  enquete_individuel_id?: Maybe<Scalars['Int']>,
  informations?: Maybe<EnqueteIndividuelInformations>,
  activite?: Maybe<EnqueteActivite>,
};

export type EnqueteIndividuelInformations = {
   __typename?: 'EnqueteIndividuelInformations',
  estimation_etp?: Maybe<Scalars['String']>,
  secretaire_specialise?: Maybe<Scalars['Boolean']>,
  secretaire_specialise_etp?: Maybe<Scalars['String']>,
  cumul_prepose?: Maybe<Scalars['Boolean']>,
  cumul_prepose_etp?: Maybe<Scalars['String']>,
  cumul_delegue_service?: Maybe<Scalars['Boolean']>,
  cumul_delegue_service_etp?: Maybe<Scalars['String']>,
  debut_activite_avant_2009?: Maybe<Scalars['Boolean']>,
  annee_debut_activite?: Maybe<Scalars['Int']>,
  annee_agrement?: Maybe<Scalars['Int']>,
  cnc_mjpm_annee_obtention?: Maybe<Scalars['Int']>,
  cnc_mjpm_heure_formation?: Maybe<Scalars['Int']>,
  cnc_maj_annee_obtention?: Maybe<Scalars['Int']>,
  cnc_maj_heure_formation?: Maybe<Scalars['Int']>,
  cnc_dpf_annee_obtention?: Maybe<Scalars['Int']>,
  cnc_dpf_heure_formation?: Maybe<Scalars['Int']>,
  niveau_qualification?: Maybe<Scalars['Int']>,
  niveau_qualification_secretaire_spe?: Maybe<Scalars['Int']>,
};

export enum MesureTypeCategory {
  Tutelle = 'TUTELLE',
  CuratelleSimple = 'CURATELLE_SIMPLE',
  CuratelleRenforcee = 'CURATELLE_RENFORCEE',
  SauvegardeJustice = 'SAUVEGARDE_JUSTICE',
  Other = 'OTHER'
}

export type MesureTypeCategoryEvolution = {
   __typename?: 'MesureTypeCategoryEvolution',
  start: Scalars['String'],
  end: Scalars['String'],
  mesureTypeCategory: MesureTypeCategory,
  monthlyEvolutions: Array<MonthlyNumber>,
};

export type MesureTypeCategoryStatistic = {
   __typename?: 'MesureTypeCategoryStatistic',
  mesureTypeCategory: MesureTypeCategory,
  number: Scalars['Int'],
};

export type MonthlyNumber = {
   __typename?: 'MonthlyNumber',
  month: Scalars['Int'],
  year: Scalars['Int'],
  number: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  recalculateMandataireMesuresCount?: Maybe<UpdatedRows>,
  recalculateServiceMesuresCount?: Maybe<UpdatedRows>,
};


export type MutationRecalculateMandataireMesuresCountArgs = {
  mandataireId: Scalars['Int']
};


export type MutationRecalculateServiceMesuresCountArgs = {
  serviceId: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  newMesureNumber: Scalars['Int'],
  closedMesureNumber: Scalars['Int'],
  enqueteIndividuel: EnqueteIndividuel,
  openMesureNumber: Scalars['Int'],
  availableMesureNumber: Scalars['Int'],
  mesureTypeCategoryStatistics: Array<MesureTypeCategoryStatistic>,
  mesureTypeCategoryEvolution: Array<MesureTypeCategoryEvolution>,
  departmentAvailabilities: Array<DepartmentAvailibility>,
};


export type QueryNewMesureNumberArgs = {
  start: Scalars['String'],
  end: Scalars['String'],
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};


export type QueryClosedMesureNumberArgs = {
  start: Scalars['String'],
  end: Scalars['String'],
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};


export type QueryEnqueteIndividuelArgs = {
  enqueteId: Scalars['Int'],
  mandataireId: Scalars['Int']
};


export type QueryOpenMesureNumberArgs = {
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};


export type QueryAvailableMesureNumberArgs = {
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};


export type QueryMesureTypeCategoryStatisticsArgs = {
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};


export type QueryMesureTypeCategoryEvolutionArgs = {
  start: Scalars['String'],
  end: Scalars['String'],
  region?: Maybe<Scalars['Int']>,
  department?: Maybe<Scalars['Int']>,
  court?: Maybe<Scalars['Int']>
};

export type UpdatedRows = {
   __typename?: 'UpdatedRows',
  success: Scalars['Boolean'],
  updatedRows?: Maybe<Scalars['Int']>,
};

