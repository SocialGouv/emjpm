export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export enum MesureStateCategory {
  Awaiting = "AWAITING",
  InProgress = "IN_PROGRESS",
  Closed = "CLOSED"
}

export type MesureStateCategoryStatistic = {
  __typename?: "MesureStateCategoryStatistic";
  mesureStateCategory: MesureStateCategory;
  number: Scalars["Int"];
  percentage: Scalars["Float"];
};

export enum MesureTypeCategory {
  Tutelle = "TUTELLE",
  CuratelleSimple = "CURATELLE_SIMPLE",
  CuratelleRenforcee = "CURATELLE_RENFORCEE",
  SauvegardeJustice = "SAUVEGARDE_JUSTICE",
  Other = "OTHER"
}

export type MesureTypeCategoryEvolution = {
  __typename?: "MesureTypeCategoryEvolution";
  start: Scalars["String"];
  end: Scalars["String"];
  mesureTypeCategory: MesureTypeCategory;
  monthlyEvolutions: Array<MonthlyNumber>;
};

export type MesureTypeCategoryStatistic = {
  __typename?: "MesureTypeCategoryStatistic";
  mesureTypeCategory: MesureTypeCategory;
  number: Scalars["Int"];
};

export type MonthlyNumber = {
  __typename?: "MonthlyNumber";
  month: Scalars["Int"];
  year: Scalars["Int"];
  number: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  getAvailableMesureNumber: Scalars["Int"];
  getNewMesureNumber: Scalars["Int"];
  getClosedMesureNumber: Scalars["Int"];
  getMesureTypeCategoryStatistics: Array<MesureTypeCategoryStatistic>;
  getMesureStateCategoryStatistics: Array<MesureStateCategoryStatistic>;
  getMesureTypeCategoryEvolution: Array<MesureTypeCategoryEvolution>;
};

export type QueryGetAvailableMesureNumberArgs = {
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryGetNewMesureNumberArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryGetClosedMesureNumberArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryGetMesureTypeCategoryStatisticsArgs = {
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryGetMesureStateCategoryStatisticsArgs = {
  date: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryGetMesureTypeCategoryEvolutionArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};
