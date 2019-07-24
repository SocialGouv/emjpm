import { gql } from "apollo-server-koa";

export default gql`
  type Query {
    availableMesureNumber(region: Int, department: Int, court: Int): Int!

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

    mesureTypeCategoryStatistics(
      region: Int
      department: Int
      court: Int
    ): [MesureTypeCategoryStatistic!]!

    mesureStateCategoryStatistics(
      date: String!
      region: Int
      department: Int
      court: Int
    ): [MesureStateCategoryStatistic!]!

    mesureTypeCategoryEvolution(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): [MesureTypeCategoryEvolution!]!
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

  type MesureStateCategoryStatistic {
    mesureStateCategory: MesureStateCategory!
    number: Int!
    percentage: Float!
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

  enum MesureStateCategory {
    AWAITING
    IN_PROGRESS
    CLOSED
  }
`;
