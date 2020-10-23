import {
  availableMesureNumber,
  closedMesureNumber,
  departmentAvailabilities,
  mesureNatureCategoryEvolution,
  mesureNatureCategoryStatistics,
  newMesureNumber,
  openMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    availableMesureNumber,
    closedMesureNumber,
    departmentAvailabilities,
    mesureNatureCategoryEvolution,
    mesureNatureCategoryStatistics,
    newMesureNumber,
    openMesureNumber
  }
};

export default resolvers;
