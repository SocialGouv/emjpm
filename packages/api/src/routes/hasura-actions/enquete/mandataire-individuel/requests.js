/* eslint-disable no-unused-vars */
const logger = require("~/utils/logger");
const { capitalizeName } = require("~/utils/strings");

const { graphqlFetch, backendAuthHeaders } = require("~/utils/graphql-fetcher");
const {
  ENQUETE,
  ENQUETE_REPONSE,
  ENQUETE_REPONSE_DEFAULT_VALUES,
  NB_MESURES,
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

      const mandataire = enqueteReponseDefaultData.mandataires_by_pk;

      const { lb_user } = mandataire;

      defaultValues.genre = mandataire.genre;

      let lb_departements;
      let departement_financeur;
      let lb_departement;
      if (lb_user) {
        defaultValues.nom = capitalizeName(`${lb_user.prenom} ${lb_user.nom}`);
        lb_departements = lb_user.lb_departements;
        if (lb_departements && lb_departements.length) {
          departement_financeur = lb_departements.find(
            (row) => row.departement_financeur
          );
          lb_departement = departement_financeur || lb_departements[0];
          const { departement } = lb_departement;

          defaultValues.region = departement.region.nom;
          defaultValues.departement = departement.nom;
          defaultValues.departementCode = departement.id;
        }
      }

      const previous =
        enqueteReponseDefaultData.previous_enquete?.[0]?.enquete_reponses?.[0];

      // # 2. Vos informations
      // ## informations générales
      if (previous) {
        for (const k of [
          "benevole",
          "anciennete",
          "estimation_etp",
          "secretaire_specialise_etp",
          "local_professionnel",
          "exerce_seul_activite",
          "exerce_secretaires_specialises",
          "tranche_age",
        ]) {
          defaultValues[k] =
            previous.enquete_reponses_informations_mandataire[k];
        }
      }

      // ## agrément
      if (previous) {
        for (const k of ["debut_activite_avant_2009", "annee_agrement"]) {
          defaultValues[k] = previous.enquete_reponses_agrements_formation[k];
        }
      }
      if (lb_user) {
        const length = lb_user.lb_departements.length;
        if (length >= 5) {
          defaultValues.nb_departements = "5+";
        } else {
          defaultValues.nb_departements = length.toString();
        }
      }
      const departementCode = departement_financeur.departement.id;
      const dateStart = new Date(enqueteAnnee - 1, 0, 1);
      const dateEnd = new Date(enqueteAnnee - 1, 11, 31);
      const { data: nbMesures, errors: errorsNbMesures } = await graphqlFetch(
        {
          dateEnd,
          dateStart,
          departementCode,
          mandataireId,
        },
        NB_MESURES,
        backendAuthHeaders
      );

      if (errorsNbMesures) {
        console.error("errorsNbMesures", errorsNbMesures);
      }

      defaultValues.nb_mesures_dep_finance = departementCode
        ? nbMesures.nb_mesures_dep_finance.aggregate.count
        : 0;
      defaultValues.nb_mesures_dep_autres =
        nbMesures.nb_mesures_dep_autres.aggregate.count;

      // ## formation
      if (previous) {
        for (const k of [
          "cnc_annee_obtention",
          "cnc_heures_formation",
          "niveau_qualification",
          "secretaire_specialise_etp_n1",
          "secretaire_specialise_etp_n2",
          "secretaire_specialise_etp_n3",
          "secretaire_specialise_etp_n4",
          "secretaire_specialise_etp_n5",
          "secretaire_specialise_etp_n6",
        ]) {
          defaultValues[k] = previous.enquete_reponses_agrements_formation[k];
        }
      }
      for (const k of [
        "secretaire_specialise_etp_n1",
        "secretaire_specialise_etp_n2",
        "secretaire_specialise_etp_n3",
        "secretaire_specialise_etp_n4",
        "secretaire_specialise_etp_n5",
        "secretaire_specialise_etp_n6",
      ]) {
        if (!defaultValues[k]) {
          defaultValues[k] = 0;
        }
      }

      // # 3. Activité dans l'année
      for (const k of [
        "curatelle_renforcee_etablissement_debut_annee",
        "curatelle_renforcee_etablissement_fin_annee",
        "curatelle_renforcee_domicile_debut_annee",
        "curatelle_renforcee_domicile_fin_annee",
        "curatelle_simple_etablissement_debut_annee",
        "curatelle_simple_etablissement_fin_annee",
        "curatelle_simple_domicile_debut_annee",
        "curatelle_simple_domicile_fin_annee",
        "tutelle_etablissement_debut_annee",
        "tutelle_etablissement_fin_annee",
        "tutelle_domicile_debut_annee",
        "tutelle_domicile_fin_annee",
        "accompagnement_judiciaire_etablissement_debut_annee",
        "accompagnement_judiciaire_etablissement_fin_annee",
        "accompagnement_judiciaire_domicile_debut_annee",
        "accompagnement_judiciaire_domicile_fin_annee",
        "curatelle_biens_etablissement_debut_annee",
        "curatelle_biens_etablissement_fin_annee",
        "curatelle_biens_domicile_debut_annee",
        "curatelle_personne_etablissement_debut_annee",
        "curatelle_personne_etablissement_fin_annee",
        "curatelle_personne_domicile_debut_annee",
        "curatelle_personne_domicile_fin_annee",
        "subroge_tuteur_createur_debut_annee",
        "subroge_tuteur_createur_fin_annee",
        "sauvegarde_justice_debut_annee",
        "sauvegarde_justice_fin_annee",
        "mandat_adhoc_majeur_debut_annee",
        "mandat_adhoc_majeur_fin_annee",
      ]) {
        defaultValues[k] = nbMesures[k].aggregate.count;
      }

      const values = {
        ...defaultValues,
        enqueteId,
        mandataireId,
      };

      const { data, errors } = await graphqlFetch(
        values,
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
