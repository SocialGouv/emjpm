import { DataSource } from "../../../datasource";
import { QueryClosedMesureNumberArgs } from "../../../types/resolvers-types";

export const closedMesureNumber = async (
  _: any,
  args: QueryClosedMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const closedMesuresNumber = await dataSources.mesureAPI.countMesures({
    closed: {
      between: {
        end: args.end,
        start: args.start
      }
    },

    court: args.court,
    department: args.department,
    region: args.region
  });
  return closedMesuresNumber.data.mesures_aggregate.aggregate.count;
};
