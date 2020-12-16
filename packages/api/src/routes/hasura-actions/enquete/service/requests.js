/* eslint-disable no-unused-vars */

const { graphqlFetch, backendAuthHeaders } = require("~/utils/graphql-fetcher");
const {
  ENQUETE_REPONSE_SERVICE,
  ENQUETE_REPONSE_DEFAULT_VALUES,
} = require("./queries");
const { INIT_ENQUETE_REPONSE, SUBMIT_ENQUETE_REPONSE } = require("./mutations");
const logger = require("~/utils/logger");

module.exports = {
  createEmptyEnqueteReponse: async ({ enqueteId, serviceId }) => {
    try {
      const queryResult = await graphqlFetch(
        { serviceId },
        ENQUETE_REPONSE_DEFAULT_VALUES,
        backendAuthHeaders
      );

      const defaultValues = {
        departement: null,
        nom: null,
        region: null,
      };

      if (queryResult.data.services_by_pk) {
        const {
          id,
          etablissement,
          departement,
        } = queryResult.data.services_by_pk;

        defaultValues.region = departement.region.nom;
        defaultValues.departementId = departement.id;
        defaultValues.departement = departement.nom;
        defaultValues.nom = etablissement;
      }

      const value = {
        departement: defaultValues.departement,
        departementId: defaultValues.departementId,
        enqueteId,
        nom: defaultValues.nom,
        region: defaultValues.region,
        serviceId,
      };

      const { data, errors } = await graphqlFetch(
        value,
        INIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }

      return data;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  getEnqueteReponseService: async ({ enqueteId, serviceId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          serviceId,
        },
        ENQUETE_REPONSE_SERVICE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }

      const { enquete_reponses } = data;
      const [enqueteReponse] = enquete_reponses;
      return enqueteReponse;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  submitEnqueteReponse: async (id) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          id,
          submittedAt: new Date(),
        },
        SUBMIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }
      return data.update_enquete_reponses_by_pk;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
};
