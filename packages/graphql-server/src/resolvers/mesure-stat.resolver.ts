import {
  recalculateMandataireMesuresCount,
  recalculateServiceMesuresCount
} from "./mutation";
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
  Mutation: {
    recalculateMandataireMesuresCount,
    recalculateServiceMesuresCount
  },
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
