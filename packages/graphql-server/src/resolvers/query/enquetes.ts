import { DataSource } from "../../datasource";
import { mapEnqueteIndividuelProperties } from "../../utils/enquetes";

export const enqueteIndividuel = async (
  _: any,
  { enqueteId, mandataireId }: { enqueteId: number; mandataireId: number },
  { dataSources }: { dataSources: DataSource }
) => {
  const {
    enquete_reponses
  } = await dataSources.enqueteAPI.getEnqueteIndividuel(enqueteId);
  if (enquete_reponses.length) {
    return mapEnqueteIndividuelProperties(enquete_reponses[0]);
  }
  const enqueteReponse = await dataSources.enqueteAPI.createEnqueteIndividuelReponse(
    enqueteId,
    mandataireId
  );
  if (enqueteReponse) {
    return mapEnqueteIndividuelProperties(enqueteReponse);
  }
  return null;
};
