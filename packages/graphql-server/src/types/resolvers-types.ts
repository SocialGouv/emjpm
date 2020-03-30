export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
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

