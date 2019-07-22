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
  availableMesureNumber: Scalars["Int"];
  newMesureNumber: Scalars["Int"];
  closedMesureNumber: Scalars["Int"];
  mesureTypeCategoryStatistics: Array<MesureTypeCategoryStatistic>;
  mesureStateCategoryStatistics: Array<MesureStateCategoryStatistic>;
  mesureTypeCategoryEvolution: Array<MesureTypeCategoryEvolution>;
};

export type QueryAvailableMesureNumberArgs = {
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryNewMesureNumberArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryClosedMesureNumberArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryMesureTypeCategoryStatisticsArgs = {
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryMesureStateCategoryStatisticsArgs = {
  date: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};

export type QueryMesureTypeCategoryEvolutionArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
  region?: Maybe<Scalars["Int"]>;
  department?: Maybe<Scalars["Int"]>;
  court?: Maybe<Scalars["Int"]>;
};
