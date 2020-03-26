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
    recalculateMandataireMesuresCount(userId: Int!): UpdatedRows
    recalculateServiceMesuresCount(serviceId: Int!): UpdatedRows
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
