import {
  closedMesureNumber,
  departmentAvailabilities,
  mesureTypeCategoryEvolution,
  mesureTypeCategoryStatistics,
  newMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    closedMesureNumber,
    departmentAvailabilities,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber
  }
};

export default resolvers;
