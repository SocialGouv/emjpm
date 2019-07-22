import { logger } from "../logger";
import { QueryGetAvailableMesureNumberArgs } from "../types/resolvers-types";
import {
  getClosedMesureNumber,
  getMesureStateCategoryStatistics,
  getMesureTypeCategoryEvolution,
  getMesureTypeCategoryStatistics,
  getNewMesureNumber
} from "./query/mesure-stat";

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
