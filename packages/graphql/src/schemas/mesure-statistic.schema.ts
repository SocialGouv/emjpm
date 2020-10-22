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

    mesureNatureCategoryStatistics(
      region: Int
      department: Int
      court: Int
    ): [MesureNatureCategoryStatistic!]!

    mesureNatureCategoryEvolution(
      start: String!
      end: String!
      region: Int
      department: Int
      court: Int
    ): [MesureNatureCategoryEvolution!]!

    departmentAvailabilities: [DepartmentAvailibility!]!
  }

  type Mutation {
    recalculateMandataireMesuresCount(mandataireId: Int!): UpdatedRows
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

  type MesureNatureCategoryEvolution {
    start: String!
    end: String!
    mesureNatureCategory: MesureNatureCategory!
    monthlyEvolutions: [MonthlyNumber!]!
  }

  type MonthlyNumber {
    month: Int!
    year: Int!
    number: Int!
  }

  type MesureNatureCategoryStatistic {
    mesureNatureCategory: MesureNatureCategory!
    number: Int!
  }

  enum MesureNatureCategory {
    TUTELLE
    CURATELLE_SIMPLE
    CURATELLE_RENFORCEE
    SAUVEGARDE_JUSTICE
    OTHER
  }
`;
