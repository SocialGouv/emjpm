import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
import { logger } from "../../../logger";
import { QueryGetClosedMesureNumberArgs } from "../../../types/resolvers-types";

export const getClosedMesureNumber = async (
  _: any,
  args: QueryGetClosedMesureNumberArgs,
  context: any
) => {
  logger.info(args, context);

  const mesures: SearchMesureResult[] = await mesureQuery.searchMesures({
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
  return mesures.length;
};
