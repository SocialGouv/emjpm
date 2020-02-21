import { addMonths } from "date-fns";
import { DataSource } from "../../../datasource";
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

  for (const mesureTypeEvolution of res) {
    const currentTypeCategory = mesureTypeEvolution.mesureTypeCategory;

    for (const month of months) {
      logger.info(
        `${month.year} ${month.month} - ${currentTypeCategory} - START`
      );

      const startMonthDate = new Date(month.year, month.month, 1);
      const endMonthDate = addMonths(startMonthDate, 1);

      const mesureTypes = mesureStatAdapter.adaptCategory(currentTypeCategory);

      const mesureNumberResult = await dataSources.mesureAPI.countMesures({
        closed: {
          gt_or_null: startMonthDate.toISOString()
        },
        court: args.court,
        department: args.department,
        opening: {
          lt: endMonthDate.toISOString()
        },
        region: args.region,
        type: { _in: mesureTypes }
      });
      const mesureNumber =
        mesureNumberResult.data.mesures_aggregate.aggregate.count;

      logger.info(
        `${month.year} ${month.month} - ${mesureNumber} ${currentTypeCategory}`
      );

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
      monthlyEvolution.number = mesureNumber;

      logger.info(
        `${month.year} ${month.month} - ${currentTypeCategory} - END`
      );
    }
  }

  logger.info(res);
  return res;
};
