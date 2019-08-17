import {
  closedMesureNumber,
  departmentAvailabilities,
  mesureTypeCategoryEvolution,
  mesureTypeCategoryStatistics,
  newMesureNumber,
  openMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    closedMesureNumber,
    departmentAvailabilities,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber,
    openMesureNumber
  }
};

export default resolvers;
