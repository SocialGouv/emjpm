import { gql } from "apollo-server-koa";

export default gql`
  type Query {
    getAvailableMesureNumber(region: Int, department: Int, court: Int): Int!

    getNewMesureNumber(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): Int!

    getClosedMesureNumber(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): Int!

    getMesureTypeCategoryStatistics(
      region: Int
      department: Int
      court: Int
    ): [MesureTypeCategoryStatistic!]!

    getMesureStateCategoryStatistics(
      date: String!
      region: Int
      department: Int
      court: Int
    ): [MesureStateCategoryStatistic!]!

    getMesureTypeCategoryEvolution(
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
