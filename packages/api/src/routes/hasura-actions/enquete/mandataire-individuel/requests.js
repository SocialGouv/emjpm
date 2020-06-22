/* eslint-disable no-unused-vars */
const logger = require("../../../../utils/logger");
const {
  graphqlFetch,
  backendAuthHeaders,
} = require("../../../../utils/graphql-fetcher");
const {
  ENQUETE_REPONSE,
  ENQUETE_REPONSE_DEFAULT_VALUES,
} = require("./queries");
const { INIT_ENQUETE_REPONSE, SUBMIT_ENQUETE_REPONSE } = require("./mutations");

module.exports = {
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

  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const queryResult = await graphqlFetch(
        { mandataireId },
        ENQUETE_REPONSE_DEFAULT_VALUES,
        backendAuthHeaders
      );

      const defaultValues = {
        nom: null,
        region: null,
        departement: null,
      };

      if (queryResult.data.mandataires_by_pk) {
        const { id, lb_user } = queryResult.data.mandataires_by_pk;

        if (lb_user) {
          defaultValues.nom = `${lb_user.prenom} ${lb_user.nom}`;
          if (lb_user.lb_departements) {
            const [{ departement }] = lb_user.lb_departements;
            defaultValues.region = departement.region.nom;
            defaultValues.departement = departement.nom;
          }
        }
      }

      const value = {
        enqueteId,
        mandataireId,
        nom: defaultValues.nom,
        departement: defaultValues.departement,
        region: defaultValues.region,
      };

      logger.info(value);

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

  getEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          mandataireId,
        },
        ENQUETE_REPONSE,
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
      throw err;
    }
  },
};
