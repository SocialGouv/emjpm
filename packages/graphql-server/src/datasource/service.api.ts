import {
  UpdateAntenneServiceMesuresResponse,
  UpdateServiceMesuresResponse
} from "../types";
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
    mutation update_service_mesures($serviceId: Int!, $awaitingMesures: Int!, $inprogressMesures: Int!) {
        update_services(
          where: { id: { _eq: $serviceId } }
          _set: { mesures_awaiting: $awaitingMesures, mesures_in_progress: $inprogressMesures }
        ) {
          affected_rows
        }
    }`;
    const response = await this.post<UpdateServiceMesuresResponse>("/", {
      operationName: "update_service_mesures",
      query,
      variables: { serviceId, awaitingMesures, inprogressMesures }
    });
    return response;
  }

  public async updateAntenneServiceMesures(
    id: number,
    awaitingMesures: number,
    inprogressMesures: number
  ): Promise<UpdateAntenneServiceMesuresResponse> {
    const query = `
    mutation update_service_antenne($id: Int!, $awaitingMesures: Int!, $inprogressMesures: Int!) {
      update_service_antenne(where: {id: {_eq: $id}}, _set: {mesures_awaiting: $awaitingMesures, mesures_in_progress: $inprogressMesures}) {
        affected_rows
      }
    }`;
    const response = await this.post<UpdateAntenneServiceMesuresResponse>("/", {
      operationName: "update_service_antenne",
      query,
      variables: { id, awaitingMesures, inprogressMesures }
    });
    return response;
  }
}
