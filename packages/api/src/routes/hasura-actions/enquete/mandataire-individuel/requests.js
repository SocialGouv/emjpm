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
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const queryResult = await graphqlFetch(
        { mandataireId },
        ENQUETE_REPONSE_DEFAULT_VALUES,
        backendAuthHeaders
      );

      const defaultValues = {
        departement: null,
        nom: null,
        region: null,
      };

      if (queryResult.data.mandataires_by_pk) {
        const { id, lb_user } = queryResult.data.mandataires_by_pk;

        if (lb_user) {
          defaultValues.nom = `${lb_user.prenom} ${lb_user.nom}`;
          if (lb_user.lb_departements && lb_user.lb_departements.length) {
            if (lb_user.lb_departements) {
              const [{ departement }] = lb_user.lb_departements;
              defaultValues.region = departement.region.nom;
              defaultValues.departement = departement.nom;
              defaultValues.departementId = departement.id;
            }
          }
        }
      }

      const value = {
        departement: defaultValues.departement,
        departementId: defaultValues.departementId,
        enqueteId,
        mandataireId,
        nom: defaultValues.nom,
        region: defaultValues.region,
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
