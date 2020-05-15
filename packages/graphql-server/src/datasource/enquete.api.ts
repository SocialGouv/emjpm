import { logger } from "../logger";
import {
  CreateEnqueteIndividuelReponseQueryProps,
  EnqueteReponse,
  EnqueteReponseQueryProps
} from "../types";
import { AuthDataSource } from "./auth-datasource";

export class EnqueteAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public async createEnqueteReponse(
    enqueteId: number,
    mandataireId: number
  ): Promise<EnqueteReponse | null> {
    const query = `
      mutation create_enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!) {
        insert_enquete_reponses_one(object: {enquete_id: $enqueteId, mandataire_id: $mandataireId, enquete_reponses_activite: {data: {}}, enquete_reponses_agrements_formation: {data: {}}, enquete_reponses_informations_mandataire: {data: {}}, enquete_reponses_population: {data: {}}, enquete_reponses_prestations_sociale: {data: {}}}) {
          id
          enquete_reponses_activite_id
          enquete_reponses_agrements_formations_id
          enquete_reponses_informations_mandataire_id
          enquete_reponses_populations_id
          enquete_reponses_prestations_sociale_id
          mandataire_id
          service_id
          submitted_at
          created_at
          enquete_id
        }
      }    
    `;

    const { data, errors } = await this.post<
      CreateEnqueteIndividuelReponseQueryProps
    >("/", {
      query,
      variables: { enqueteId, mandataireId }
    });

    if (errors) {
      errors.forEach(e => logger.error(e.message));
      return null;
    }

    return data.insert_enquete_reponses_one;
  }

  public async getEnqueteReponse(
    enqueteId: number
  ): Promise<EnqueteReponse | null> {
    const query = `
      query enquete_individuels($enqueteId: Int!) {
        enquete_reponses(where: {enquete_id: {_eq: $enqueteId}}) {
          id
          enquete_reponses_activite_id
          enquete_reponses_agrements_formations_id
          enquete_reponses_informations_mandataire_id
          enquete_reponses_populations_id
          enquete_reponses_prestations_sociale_id
          mandataire_id
          service_id
          submitted_at
          created_at
          enquete_id
        }
      }    
    `;

    const { data } = await this.post<EnqueteReponseQueryProps>("/", {
      query,
      variables: { enqueteId }
    });

    return data.enquete_reponses && data.enquete_reponses.length
      ? data.enquete_reponses[0]
      : null;
  }
}
