import { DataSource } from "../../datasource";

export const enqueteIndividuelReponse = async (
  _: any,
  { enqueteId, mandataireId }: { enqueteId: number; mandataireId: number },
  { dataSources }: { dataSources: DataSource }
) => {
  const enqueteResponse = await dataSources.enqueteAPI.getEnqueteReponse(
    enqueteId
  );

  if (!enqueteResponse) {
    const createdEnqueteReponse = await dataSources.enqueteAPI.createEnqueteReponse(
      enqueteId,
      mandataireId
    );
    return createdEnqueteReponse;
  } else {
    return enqueteResponse;
  }
};
