import { addMonths } from "date-fns";
import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../datasource/mesure.api";
import { logger } from "../../../logger";
import {
  MesureTypeCategoryEvolution,
  QueryMesureTypeCategoryEvolutionArgs
} from "../../../types/resolvers-types";
import { mesureStatAdapter } from "./utils/mesure-stat.adapter";
import { buildMesureTypeCategoryEvolutions } from "./utils/mesure-stat.builder";

export const mesureTypeCategoryEvolution = async (
  _: any,
  args: QueryMesureTypeCategoryEvolutionArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const res: MesureTypeCategoryEvolution[] = buildMesureTypeCategoryEvolutions(
    args.start,
    args.end
  );

  const months = res[0].monthlyEvolutions.map(elm => ({
    month: elm.month,
    year: elm.year
  }));

  for (const month of months) {
    logger.info(`${month.year} ${month.month} - START`);
    const startMonthDate = new Date(month.year, month.month, 1);
    const endMonthDate = addMonths(startMonthDate, 1);
    const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
      {
        closed: {
          gt_or_null: startMonthDate.toISOString()
        },
        court: args.court,
        department: args.department,
        opening: {
          lt: endMonthDate.toISOString()
        },
        region: args.region
      }
    );
    logger.info(`${month.year} ${month.month} - ${mesures.length} mesures`);

    const mesuresByCategoryMap = res.map(elm => ({
      number: 0,
      type: elm.mesureTypeCategory
    }));

    for (const mesure of mesures) {
      const typeCategory = mesureStatAdapter.adaptType(mesure.type);
      const mesuresByCategory = mesuresByCategoryMap.find(
        elm => elm.type === typeCategory
      );
      if (mesuresByCategory) {
        mesuresByCategory.number++;
      }
    }

    for (const mesuresByCategory of mesuresByCategoryMap) {
      const mesureTypeEvolution = res.find(
        elm => elm.mesureTypeCategory === mesuresByCategory.type
      );
      if (!mesureTypeEvolution) {
        logger.error(`No category type found for ${mesuresByCategory.type}`);
        throw new Error(`No category type found for ${mesuresByCategory.type}`);
      }

      const monthlyEvolution = mesureTypeEvolution.monthlyEvolutions.find(
        elm => elm.month === month.month && elm.year === month.year
      );
      if (!monthlyEvolution) {
        logger.error(
          `No monthly evolution found for year ${month.year}, month ${month.month}`
        );
        throw new Error(
          `No monthly evolution found for year ${month.year}, month ${month.month}`
        );
      }
      monthlyEvolution.number = mesuresByCategory.number;
      logger.info(`${month.year} ${month.month} - END`);
    }
  }
  logger.info(res);
  return res;
};
