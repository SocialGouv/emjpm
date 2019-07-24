import { mesureQuery, SearchMesureResult } from "../../../client/mesure.query";
import { logger } from "../../../logger";
import { QueryClosedMesureNumberArgs } from "../../../types/resolvers-types";

export const closedMesureNumber = async (
  _: any,
  args: QueryClosedMesureNumberArgs,
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
