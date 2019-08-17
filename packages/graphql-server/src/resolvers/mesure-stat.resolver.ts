import {
  availableMesureNumber,
  closedMesureNumber,
  departmentAvailabilities,
  mesureTypeCategoryEvolution,
  mesureTypeCategoryStatistics,
  newMesureNumber,
  openMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    availableMesureNumber,
    closedMesureNumber,
    departmentAvailabilities,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber,
    openMesureNumber
  }
};

export default resolvers;
