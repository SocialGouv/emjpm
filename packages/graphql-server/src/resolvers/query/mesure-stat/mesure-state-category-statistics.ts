import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
import { logger } from "../../../logger";
import {
  MesureStateCategory,
  MesureStateCategoryStatistic,
  QueryMesureStateCategoryStatisticsArgs
} from "../../../types/resolvers-types";
import { buildMesureStateCategoryStatistics } from "./utils/mesure-stat.builder";

export const mesureStateCategoryStatistics = async (
  _: any,
  args: QueryMesureStateCategoryStatisticsArgs,
  context: any
) => {
  logger.info(args, context);
  const mesures: SearchMesureResult[] = await mesureQuery.searchMesures({
    created: {
      lt: args.date
    }
  });

  const defineStateCategory = (mesure: SearchMesureResult) => {
    if (mesure.extinction) {
      return MesureStateCategory.Closed;
    } else if (mesure.date_ouverture) {
      return MesureStateCategory.InProgress;
    }
    return MesureStateCategory.Awaiting;
  };

  const res: MesureStateCategoryStatistic[] = buildMesureStateCategoryStatistics();
  for (const mesure of mesures) {
    const mesureStateCategory = defineStateCategory(mesure);
    res
      .filter(
        (value: MesureStateCategoryStatistic) =>
          value.mesureStateCategory === mesureStateCategory
      )
      .forEach(
        mesureStateCategoryStatistic => mesureStateCategoryStatistic.number++
      );
  }
  const total = res.reduce((acc, current) => acc + current.number, 0) || 1;
  res.forEach(current => (current.percentage = current.number / total));

  return res;
};
