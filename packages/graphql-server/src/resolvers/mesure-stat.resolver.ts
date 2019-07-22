import { logger } from "../logger";
import { QueryAvailableMesureNumberArgs } from "../types/resolvers-types";
import {
  closedMesureNumber,
  mesureStateCategoryStatistics,
  mesureTypeCategoryEvolution,
  mesureTypeCategoryStatistics,
  newMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Query: {
    availableMesureNumber: async (
      _: any,
      args: QueryAvailableMesureNumberArgs,
      context: any
    ) => {
      logger.info(args, context);
      return null;
    },
    closedMesureNumber,
    mesureStateCategoryStatistics,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber
  }
};

export default resolvers;
