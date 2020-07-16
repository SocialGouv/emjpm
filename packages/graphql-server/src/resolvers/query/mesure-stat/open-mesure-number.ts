import { DataSource } from "../../../datasource";
import { QueryOpenMesureNumberArgs } from "../../../types/resolvers-types";

export const openMesureNumber = async (
  _: any,
  args: QueryOpenMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const openMesuresNumber = await dataSources.mesureAPI.countMesures({
    court: args.court,
    department: args.department,
    region: args.region,
    status: "en_cours"
  });
  return openMesuresNumber.data.mesures_aggregate.aggregate.count;
};
