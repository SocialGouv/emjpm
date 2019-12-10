import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../datasource/mesure.api";
import { QueryOpenMesureNumberArgs } from "../../../types/resolvers-types";

export const openMesureNumber = async (
  _: any,
  args: QueryOpenMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
    {
      court: args.court,
      department: args.department,
      region: args.region,
      status: "Mesure en cours"
    }
  );
  return mesures.length;
};
