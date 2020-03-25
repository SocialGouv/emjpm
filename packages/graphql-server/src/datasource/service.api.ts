import { UpdateServiceMesuresResponse } from "../types";
import { AuthDataSource } from "./auth-datasource";

export class ServiceAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public async updateServiceMesures(
    serviceId: number,
    awaitingMesures: number,
    inprogressMesures: number
  ) {
    const query = `
    mutation update_service($serviceId: Int!, $awaitingMesures: Int!, $inprogressMesures: Int!) {
        update_services(
          where: { id: { _eq: $serviceId } }
          _set: { mesures_awaiting: $awaitingMesures, mesures_in_progress: $inprogressMesures }
        ) {
          affected_rows
        }
    }`;
    const response = await this.post<UpdateServiceMesuresResponse>("/", {
      operationName: "update_service",
      query,
      variables: { serviceId, awaitingMesures, inprogressMesures }
    });
    return response;
  }
}
