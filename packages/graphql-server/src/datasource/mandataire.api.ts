import { UpdateMandataireMesuresResponse } from "../types";
import { AuthDataSource } from "./auth-datasource";

export class MandataireAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public async updateMandataireMesures(
    userId: number,
    awaitingMesures: number,
    inprogressMesures: number
  ) {
    const query = `
    mutation update_mandataires($userId: Int!, $awaitingMesures: Int!, $inprogressMesures: Int!) {
        update_mandataires(
          where: { user_id: { _eq: $userId } }
          _set: { mesures_en_attente: $awaitingMesures, mesures_en_cours: $inprogressMesures }
        ) {
          affected_rows
        }
    }`;
    const response = await this.post<UpdateMandataireMesuresResponse>("/", {
      operationName: "update_mandataires",
      query,
      variables: { userId, awaitingMesures, inprogressMesures }
    });

    return response;
  }
}
