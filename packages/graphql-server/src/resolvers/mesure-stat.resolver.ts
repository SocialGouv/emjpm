import { logger } from "../logger";
import {
  getClosedMesureNumber,
  getMesureStateCategoryStatistics,
  getMesureTypeCategoryEvolution,
  getMesureTypeCategoryStatistics,
  getNewMesureNumber
} from "../query-resolvers/mesure-stat";
import { QueryGetAvailableMesureNumberArgs } from "../types/resolvers-types";

export const resolvers = {
  Query: {
    getAvailableMesureNumber: async (
      _: any,
      args: QueryGetAvailableMesureNumberArgs,
      context: any
    ) => {
      logger.info(args, context);
      return null;
    },
    getClosedMesureNumber,
    getMesureStateCategoryStatistics,
    getMesureTypeCategoryEvolution,
    getMesureTypeCategoryStatistics,
    getNewMesureNumber
  }
};

export default resolvers;
