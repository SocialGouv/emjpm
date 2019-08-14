import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../datasource/mesure.api";
import { QueryClosedMesureNumberArgs } from "../../../types/resolvers-types";

export const closedMesureNumber = async (
  _: any,
  args: QueryClosedMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
    {
      closed: {
        between: {
          end: args.end,
          start: args.start
        }
      },

      court: args.court,
      department: args.department,
      region: args.region
    }
  );
  return mesures.length;
};
