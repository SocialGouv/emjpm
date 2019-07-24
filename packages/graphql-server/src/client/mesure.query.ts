import { gql } from "apollo-server-koa";
import { Mesures } from "../model/mesures.model";
import { NullableNumber } from "../utils/types.util";
import { query } from "./apollo-client";

const convertDates = (mesure: SearchMesureResult) => {
  mesure.date_ouverture = mesure.date_ouverture
    ? new Date(mesure.date_ouverture)
    : null;
  mesure.extinction = mesure.extinction ? new Date(mesure.extinction) : null;
};

export interface SearchMesureResultWrapper {
  mesures: SearchMesureResult[];
}

export type SearchMesureResult = Pick<
  Mesures,
  "date_ouverture" | "cabinet" | "civilite" | "status" | "type" | "extinction"
>;

export const mesureQuery = {
  searchMesures: (args: {
    opening?: {
      between?: {
        start: string;
        end: string;
      };
      lt?: string;
    };
    closed?: {
      between?: {
        start: string;
        end: string;
      };
      gt_or_null?: string;
    };
    created?: {
      between?: {
        start: string;
        end: string;
      };
      lt?: string;
    };
    region?: NullableNumber;
    department?: NullableNumber;
    court?: NullableNumber;
  }) => {
    const filters = [];
    if (args.created) {
      if (args.created.between) {
        const between = args.created.between;
        filters.push(
          `created_at: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (args.created.lt) {
        filters.push(`created_at: { _lt: "${args.created.lt}" }`);
      }
    }
    if (args.opening) {
      if (args.opening.between) {
        const between = args.opening.between;
        filters.push(
          `date_ouverture: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (args.opening.lt) {
        filters.push(`date_ouverture: { _lt: "${args.opening.lt}" }`);
      }
    }
    if (args.closed) {
      if (args.closed.between) {
        const between = args.closed.between;
        filters.push(
          `extinction: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (args.closed.gt_or_null) {
        filters.push(
          `_or: [
                  {extinction: { _gt: "${args.closed.gt_or_null}"}},
                  {status: {_neq: "Eteindre mesure"}}
              ]`
        );
      }
    }
    if (args.region) {
      filters.push(`region_id: {_eq: ${args.region}}`);
    }
    if (args.department) {
      filters.push(`code_postal: {_like: "${args.department}%"}`);
    }
    if (args.court) {
      filters.push(`ti_id: {_eq: ${args.court}}`);
    }
    const qglQuery = gql`
    {
      mesures(where: { ${filters.join(", ")} }) {
        date_ouverture
        cabinet
        civilite
        status
        type
        extinction
      }
    }
  `;
    return query<SearchMesureResultWrapper>(qglQuery)
      .then(queryResult => queryResult.data.mesures)
      .then(mesures => {
        mesures.forEach(convertDates);
        return mesures;
      });
  }
};
