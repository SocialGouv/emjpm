import { isAfter, isBefore } from "date-fns";
import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
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
  context: any
) => {
  logger.info(args, context);

  const mesures: SearchMesureResult[] = await mesureQuery.searchMesures({
    closed: {
      gt_or_null: args.start
    },
    opening: {
      lt: args.end
    },

    court: args.court,
    department: args.department,
    region: args.region
  });

  const res: MesureTypeCategoryEvolution[] = buildMesureTypeCategoryEvolutions(
    args.start,
    args.end
  );

  for (const mesureTypeEvolution of res) {
    const typeCategory = mesureTypeEvolution.mesureTypeCategory;
    const filterByType = (mesure: SearchMesureResult) =>
      mesureStatAdapter.adaptType(mesure.type) === typeCategory;
    const mesuresFilterByType = mesures.filter(filterByType);

    for (const monthlyEvolution of mesureTypeEvolution.monthlyEvolutions) {
      const month = new Date(monthlyEvolution.year, monthlyEvolution.month, 1);
      const isInProgress = (elm: SearchMesureResult) => {
        const openingDate = elm.date_ouverture;
        const closedDate = elm.extinction;

        const openingCondition = openingDate && isBefore(openingDate, month);
        const closedCondition = !closedDate || isAfter(closedDate, month);
        if (openingCondition && closedCondition) {
          return true;
        }
        return false;
      };

      monthlyEvolution.number = mesuresFilterByType.filter(isInProgress).length;
    }
  }
  return res;
};
