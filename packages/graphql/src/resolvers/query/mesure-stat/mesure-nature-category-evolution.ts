import { addMonths } from "date-fns";
import { DataSource } from "../../../datasource";
import { logger } from "../../../logger";
import {
  MesureNatureCategoryEvolution,
  QueryMesureNatureCategoryEvolutionArgs,
} from "../../../types/resolvers-types";
import { mesureStatAdapter } from "./utils/mesure-stat.adapter";
import { buildMesureNatureCategoryEvolutions } from "./utils/mesure-stat.builder";

export const mesureNatureCategoryEvolution = async (
  _: any,
  args: QueryMesureNatureCategoryEvolutionArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const res: MesureNatureCategoryEvolution[] = buildMesureNatureCategoryEvolutions(
    args.start,
    args.end
  );

  const months = res[0].monthlyEvolutions.map((elm) => ({
    month: elm.month,
    year: elm.year,
  }));

  for (const mesureNatureEvolution of res) {
    const currentNatureCategory = mesureNatureEvolution.mesureNatureCategory;

    for (const month of months) {
      logger.info(
        `${month.year} ${month.month} - ${currentNatureCategory} - START`
      );

      const startMonthDate = new Date(month.year, month.month, 1);
      const endMonthDate = addMonths(startMonthDate, 1);

      const mesureNatures = mesureStatAdapter.adaptCategory(currentNatureCategory);

      const mesureNumberResult = await dataSources.mesureAPI.countMesures({
        closed: {
          gt_or_null: startMonthDate.toISOString(),
        },
        court: args.court,
        department: args.department,
        nature: { _in: mesureNatures },
        opening: {
          lt: endMonthDate.toISOString(),
        },
        region: args.region,
      });
      const mesureNumber =
        mesureNumberResult.data.mesures_aggregate.aggregate.count;

      logger.info(
        `${month.year} ${month.month} - ${mesureNumber} ${currentNatureCategory}`
      );

      const monthlyEvolution = mesureNatureEvolution.monthlyEvolutions.find(
        (elm) => elm.month === month.month && elm.year === month.year
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
        `${month.year} ${month.month} - ${currentNatureCategory} - END`
      );
    }
  }

  logger.info(res);
  return res;
};
