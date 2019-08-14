import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../datasource/mesure.api";
import {
  MesureTypeCategoryStatistic,
  QueryMesureTypeCategoryStatisticsArgs
} from "../../../types/resolvers-types";
import { mesureStatAdapter } from "./utils/mesure-stat.adapter";
import { buildMesureTypeCategoryStatistics } from "./utils/mesure-stat.builder";

export const mesureTypeCategoryStatistics = async (
  _: any,
  args: QueryMesureTypeCategoryStatisticsArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
    args
  );

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
