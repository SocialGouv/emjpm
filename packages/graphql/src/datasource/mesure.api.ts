import {
  CountMandataireMesuresQueryResult,
  CountServiceMesuresQueryResult,
  SearchMesureResult,
  SearchMesuresParam
} from "../types";
import { AuthDataSource } from "./auth-datasource";
import { logger } from "../logger";

const convertDates = (mesure: SearchMesureResult) => {
  mesure.date_nomination = mesure.date_nomination
    ? new Date(mesure.date_nomination)
    : null;
  mesure.date_fin_mesure = mesure.date_fin_mesure
    ? new Date(mesure.date_fin_mesure)
    : null;
  return mesure;
};

export class MesureAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public searchMesures(params: SearchMesuresParam) {
    const where = this.buildFilters(params).join(", ");
    const query = `
    {
      mesures(where: { ${where} }) {
        date_nomination
        cabinet
        civilite
        status
        nature_mesure
        date_fin_mesure
      }
    }
  `;

    return this.post("/", { query }).then(response => {
      return response.data.mesures.map(convertDates);
    });
  }

  public async countServiceMesures(
    serviceId: number
  ): Promise<CountServiceMesuresQueryResult> {
    const query = `
    query service_mesures($serviceId: Int!) {
      inprogressMesures: mesures_aggregate(
        where: { status: { _eq: "en_cours" }, service_id: { _eq: $serviceId } }
      ) {
        aggregate {
          count(columns: id)
        }
      }
      awaitingMesures: mesures_aggregate(
        where: { status: { _eq: "en_attente" }, service_id: { _eq: $serviceId } }
      ) {
        aggregate {
          count(columns: id)
        }
      }
      services(where: { id: { _eq: $serviceId } }) {
        id
        mesures_awaiting
        mesures_in_progress
      }
      service_antenne(where: {service_id: {_eq: $serviceId}}) {
        id
        mesures_awaiting: mesures_aggregate(where: { status: { _eq: "en_attente" } }) {
          aggregate {
            count(columns: antenne_id)
          }
        }
        mesures_in_progress: mesures_aggregate(where: { status: { _eq: "en_cours" } }) {
          aggregate {
            count(columns: antenne_id)
          }
        }
      }
    }`;
    logger.info("countServiceMesures countServiceMesures countServiceMesures");
    logger.info(this);
    const response = await this.post<CountServiceMesuresQueryResult>(
      "/",
      {
        operationName: "service_mesures",
        query,
        variables: { serviceId }
      },
      {
        headers: this.adminHeader
      }
    );

    return response;
  }

  public async countMandataireMesures(
    mandataireId: number
  ): Promise<CountMandataireMesuresQueryResult> {
    const query = `
    query mandataire_mesures($mandataireId: Int!) {
      inprogressMesures: mesures_aggregate(
        where: { status: { _eq: "en_cours" }, mandataire: { id: { _eq: $mandataireId } } }
      ) {
        aggregate {
          count(columns: id)
        }
      }
      awaitingMesures: mesures_aggregate(
        where: { status: { _eq: "en_attente" }, mandataire: { id: { _eq: $mandataireId } } }
      ) {
        aggregate {
          count(columns: id)
        }
      }
      mandataires(where: { id: { _eq: $mandataireId } }) {
        mesures_en_cours
        mesures_en_attente
      }
    }`;

    const response = await this.post<CountMandataireMesuresQueryResult>(
      "/",
      {
        operationName: "mandataire_mesures",
        query,
        variables: { mandataireId }
      },
      {
        headers: this.adminHeader
      }
    );
    return response;
  }

  public countMesures(params: SearchMesuresParam) {
    const where = this.buildFilters(params).join(", ");
    const query = `
    {
      mesures_aggregate(where: { ${where} }) {
        aggregate {
          count
        }
      }
    }
  `;

    return this.post("/", { query });
  }

  private buildFilters(params: SearchMesuresParam): string[] {
    const filters = [];
    if (params.nature) {
      if (params.nature._in) {
        filters.push(
          `nature_mesure: { _in: ${JSON.stringify(params.nature._in)} }`
        );
      }
    }
    if (params.created) {
      if (params.created.between) {
        const between = params.created.between;
        filters.push(
          `created_at: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.created.lt) {
        filters.push(`created_at: { _lt: "${params.created.lt}" }`);
      }
    }
    if (params.opening) {
      if (params.opening.between) {
        const between = params.opening.between;
        filters.push(
          `date_nomination: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.opening.lt) {
        filters.push(`date_nomination: { _lt: "${params.opening.lt}" }`);
      }
    }
    if (params.closed) {
      if (params.closed.between) {
        const between = params.closed.between;
        filters.push(
          `date_fin_mesure: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.closed.gt_or_null) {
        filters.push(
          `_or: [
                  {date_fin_mesure: { _gt: "${params.closed.gt_or_null}"}},
                  {status: {_neq: "eteinte"}}
              ]`
        );
      }
    }
    if (params.region) {
      filters.push(
        `departement:
          {
            region: {
                id: {_eq: ${params.region}}
            }
          }`
      );
    }
    if (params.department) {
      filters.push(`department_id: {_eq: ${params.department}}`);
    }
    if (params.court) {
      filters.push(`ti_id: {_eq: ${params.court}}`);
    }
    if (params.status) {
      filters.push(`status: {_eq: "${params.status}"}`);
    }
    return filters;
  }
}
