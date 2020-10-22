import { DataSource } from "../../../datasource";
import { QueryNewMesureNumberArgs } from "../../../types/resolvers-types";

export const newMesureNumber = async (
  _: any,
  args: QueryNewMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const newMesuresNumber = await dataSources.mesureAPI.countMesures({
    opening: {
      between: {
        end: args.end,
        start: args.start
      }
    },

    court: args.court,
    department: args.department,
    region: args.region
  });
  return newMesuresNumber.data.mesures_aggregate.aggregate.count;
};
