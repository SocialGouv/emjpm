import {
  closedMesureNumber,
  mesureNatureCategoryEvolution,
  mesureNatureCategoryStatistics,
  newMesureNumber,
  openMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    closedMesureNumber,
    mesureNatureCategoryEvolution,
    mesureNatureCategoryStatistics,
    newMesureNumber,
    openMesureNumber
  }
};

export default resolvers;
