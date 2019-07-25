import { closedMesureNumber, mesureStateCategoryStatistics, mesureTypeCategoryEvolution, mesureTypeCategoryStatistics, newMesureNumber } from "./query/mesure-stat";

export const resolvers = {
  Query: {
    closedMesureNumber,
    mesureStateCategoryStatistics,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber
  }
};

export default resolvers;
