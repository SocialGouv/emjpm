/* eslint-disable no-unused-vars */
const logger = require("../../../../utils/logger");
const {
  graphqlFetch,
  backendAuthHeaders
} = require("../../../../utils/graphql-fetcher");
const { ENQUETE_REPONSE_MANDATAIRE_PREPOSE } = require("./queries");
const { INIT_ENQUETE_REPONSE } = require("./mutations");

module.exports = {
  getEnqueteReponseMandatairePrepose: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          mandataireId
        },
        ENQUETE_REPONSE_MANDATAIRE_PREPOSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map(error => logger.error(error));
      }

      const { enquete_reponses } = data;
      const [enqueteReponse] = enquete_reponses;
      return enqueteReponse;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          mandataireId
        },
        INIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map(error => logger.error(error));
      }

      return data;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
};
