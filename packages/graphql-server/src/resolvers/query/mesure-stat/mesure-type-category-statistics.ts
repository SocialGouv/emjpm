import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
import { logger } from "../../../logger";
import {
  MesureTypeCategoryStatistic,
  QueryMesureTypeCategoryStatisticsArgs
} from "../../../types/resolvers-types";
import { mesureStatAdapter } from "./utils/mesure-stat.adapter";
import { buildMesureTypeCategoryStatistics } from "./utils/mesure-stat.builder";

export const mesureTypeCategoryStatistics = async (
  _: any,
  args: QueryMesureTypeCategoryStatisticsArgs,
  context: any
) => {
  logger.info(args, context);
  const mesures: SearchMesureResult[] = await mesureQuery.searchMesures(args);

  const res: MesureTypeCategoryStatistic[] = buildMesureTypeCategoryStatistics();
  for (const mesure of mesures) {
    const mesureTypeCategory = mesureStatAdapter.adaptType(mesure.type);
    const mesureTypeCategoryStatistic = res.find(
      (value: MesureTypeCategoryStatistic) =>
        value.mesureTypeCategory === mesureTypeCategory
    );
    if (!mesureTypeCategoryStatistic) {
      throw new Error(
        `no mesureTypeCategoryStatistic found for type ${mesure.type}`
      );
    }
    mesureTypeCategoryStatistic.number++;
  }

  return res;
};
