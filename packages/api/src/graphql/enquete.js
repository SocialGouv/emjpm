/* eslint-disable no-unused-vars */
const logger = require("../utils/logger");
const { execute, backendAuthHeaders } = require("./execute");
const { ENQUETE_REPONSE } = require("./queries");
const { INIT_ENQUETE_REPONSE } = require("./mutations");

module.exports = {
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await execute(
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
  },

  getEnqueteReponse: async ({ enqueteId, userId }) => {
    try {
      const { data, errors } = await execute(
        {
          enqueteId,
          userId
        },
        ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map(error => logger.error(error));
      }

      const { enquete_reponses, mandataires } = data;
      const [mandataire] = mandataires;
      const [enqueteReponse] = enquete_reponses;
      return {
        mandataireId: mandataire.id,
        enqueteReponse
      };
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
};
