import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../types";
import {
  MesureNatureCategoryStatistic,
  QueryMesureNatureCategoryStatisticsArgs,
} from "../../../types/resolvers-types";
import { mesureStatAdapter } from "./utils/mesure-stat.adapter";
import { buildMesureNatureCategoryStatistics } from "./utils/mesure-stat.builder";

export const mesureNatureCategoryStatistics = async (
  _: any,
  args: QueryMesureNatureCategoryStatisticsArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
    args
  );
  const res: MesureNatureCategoryStatistic[] = buildMesureNatureCategoryStatistics();
  for (const mesure of mesures) {
    const mesureNatureCategory = mesureStatAdapter.adaptNature(
      mesure.nature_mesure
    );
    const mesureNatureCategoryStatistic = res.find(
      (value: MesureNatureCategoryStatistic) =>
        value.mesureNatureCategory === mesureNatureCategory
    );
    if (mesureNatureCategoryStatistic) {
      mesureNatureCategoryStatistic.number++;
      // console.log(mesure)
      // throw new Error(
      //   `no mesureNatureCategoryStatistic found for type ${mesure.type}`
      // );
    }
  }

  return res;
};
