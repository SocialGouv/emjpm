import { DataSource } from "../../../datasource";
import { SearchMesureResult } from "../../../datasource/mesure.api";
import { QueryNewMesureNumberArgs } from "../../../types/resolvers-types";

export const newMesureNumber = async (
  _: any,
  args: QueryNewMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const mesures: SearchMesureResult[] = await dataSources.mesureAPI.searchMesures(
    {
      opening: {
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
