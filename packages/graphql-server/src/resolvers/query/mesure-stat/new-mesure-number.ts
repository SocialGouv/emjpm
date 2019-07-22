import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
import { logger } from "../../../logger";
import { QueryGetNewMesureNumberArgs } from "../../../types/resolvers-types";

export const getNewMesureNumber = async (
  _: any,
  args: QueryGetNewMesureNumberArgs,
  context: any
) => {
  logger.info(args, context);

  const mesures: SearchMesureResult[] = await mesureQuery.searchMesures({
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
  return mesures.length;
};
