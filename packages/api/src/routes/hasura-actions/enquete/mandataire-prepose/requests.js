/* eslint-disable no-unused-vars */
const logger = require("../../../../utils/logger");
const {
  graphqlFetch,
  backendAuthHeaders,
} = require("../../../../utils/graphql-fetcher");
const {
  ENQUETE_REPONSE_MANDATAIRE_PREPOSE,
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
  getEnqueteReponseMandatairePrepose: async ({ enqueteId, mandataireId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          mandataireId,
        },
        ENQUETE_REPONSE_MANDATAIRE_PREPOSE,
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
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    try {
      const queryResult = await graphqlFetch(
        { mandataireId },
        ENQUETE_REPONSE_DEFAULT_VALUES,
        backendAuthHeaders
      );

      const defaultValues = {
        region: null,
        departement: null,
      };

      if (queryResult.data.mandataires_by_pk) {
        const { lb_user } = queryResult.data.mandataires_by_pk;
        if (
          lb_user &&
          lb_user.lb_departements &&
          lb_user.lb_departements.length
        ) {
          const [{ departement }] = lb_user.lb_departements;
          defaultValues.region = departement.region.nom;
          defaultValues.departement_id = departement.id;
          defaultValues.departement = departement.nom;
        }
      }

      const value = {
        enqueteId,
        mandataireId,
        departementId: defaultValues.departement_id,
        departement: defaultValues.departement,
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
};
