/* eslint-disable no-unused-vars */
const logger = require("~/utils/logger");
const { graphqlFetch, backendAuthHeaders } = require("~/utils/graphql-fetcher");
const {
  ENQUETE,
  ENQUETE_REPONSE,
  ENQUETE_REPONSE_DEFAULT_VALUES,
} = require("./queries");
const { INIT_ENQUETE_REPONSE, SUBMIT_ENQUETE_REPONSE } = require("./mutations");

module.exports = {
  createEmptyEnqueteReponse: async ({ enqueteId, mandataireId }) => {
    const { data: enqueteData } = await graphqlFetch(
      { enqueteId },
      ENQUETE,
      backendAuthHeaders
    );

    const enqueteAnnee = enqueteData.enquetes_by_pk.annee;
    const previousYear = (enqueteAnnee - 1).toString();
    try {
      const { data: enqueteReponseDefaultData } = await graphqlFetch(
        { mandataireId, previousYear },
        ENQUETE_REPONSE_DEFAULT_VALUES,
        backendAuthHeaders
      );

      const defaultValues = {
        departement: null,
        nom: null,
        region: null,
      };

      if (enqueteReponseDefaultData.mandataires_by_pk) {
        const { lb_user } = enqueteReponseDefaultData.mandataires_by_pk;

        if (lb_user) {
          defaultValues.nom = `${lb_user.prenom} ${lb_user.nom}`;
          const { lb_departements } = lb_user;
          if (lb_departements && lb_departements.length) {
            const departement_financeur = lb_departements.find(
              (row) => row.departement_financeur
            );
            const lb_departement = departement_financeur || lb_departements[0];
            const { departement } = lb_departement;

            defaultValues.region = departement.region.nom;
            defaultValues.departement = departement.nom;
            defaultValues.departementCode = departement.id;
          }
        }
      }

      if (
        enqueteReponseDefaultData.previous_enquete?.[0]?.enquete_reponses?.[0]
          ?.enquete_reponses_informations_mandataire
      ) {
        const previousYearEnqueteReponsesInformationsMandataire =
          enqueteReponseDefaultData.previous_enquete[0].enquete_reponses[0]
            .enquete_reponses_informations_mandataire;

        defaultValues.benevole =
          previousYearEnqueteReponsesInformationsMandataire.benevole;
      }

      const value = {
        benevole: defaultValues.benevole,
        departement: defaultValues.departement,
        departementCode: defaultValues.departementCode,
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
