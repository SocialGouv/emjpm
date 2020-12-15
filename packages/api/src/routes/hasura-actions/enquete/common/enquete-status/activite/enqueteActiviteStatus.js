const { buildMesureGroupsAttributes } = require("./activiteSchemaUtil");
const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");
const logger = require("~/utils/logger");

module.exports = async (enqueteReponse) => {
  logger.info(
    enqueteReponse.enquete_reponses_activite,
    "enquete_reponses_activite"
  );

  const data = enqueteReponse.enquete_reponses_activite;

  const activiteStatus = {
    accompagnementJudiciaire: await getValidationStatus(data, {
      debugName: "activite/accompagnementJudiciaire",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "accompagnement_judiciaire_etablissement",
          "accompagnement_judiciaire_domicile",
        ])
      ),
    }),
    causesSortiesDispositif: await getValidationStatus(data, {
      debugName: "activite/causesSortiesDispositif",
      logDataWithErrors: false,
      schema: yup.object(
        ["sorties_main_levee", "sorties_deces", "sorties_masp"].reduce(
          (acc, attrName) => {
            acc[attrName] = yup.number().min(0).integer().nullable();
            return acc;
          },
          []
        )
      ),
    }),
    curatelleBiens: await getValidationStatus(data, {
      debugName: "activite/curatelleBiens",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_biens_etablissement",
          "curatelle_biens_domicile",
        ])
      ),
    }),
    curatellePersonne: await getValidationStatus(data, {
      debugName: "activite/curatellePersonne",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_personne_etablissement",
          "curatelle_personne_domicile",
        ])
      ),
    }),
    curatelleRenforcee: await getValidationStatus(data, {
      debugName: "activite/curatelleRenforcee",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_renforcee_etablissement",
          "curatelle_renforcee_domicile",
        ])
      ),
    }),
    curatelleSimple: await getValidationStatus(data, {
      debugName: "activite/curatelleSimple",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_simple_etablissement",
          "curatelle_simple_domicile",
        ])
      ),
    }),
    mandatHadocMajeur: await getValidationStatus(data, {
      debugName: "activite/mandatHadocMajeur",
      logDataWithErrors: false,
      schema: yup.object(buildMesureGroupsAttributes(["mandat_adhoc_majeur"])),
    }),
    revisionMesures: await getValidationStatus(data, {
      debugName: "activite/revisionMesures",
      logDataWithErrors: false,
      schema: yup.object(
        [
          "revisions_main_levee",
          "revisions_masp",
          "revisions_reconduction",
          "revisions_changement",
          "revisions_autre",
        ].reduce((acc, attrName) => {
          acc[attrName] = yup.number().min(0).integer().nullable();
          return acc;
        }, [])
      ),
    }),
    sauvegardeJustice: await getValidationStatus(data, {
      debugName: "activite/sauvegardeJustice",
      logDataWithErrors: false,
      schema: yup.object(buildMesureGroupsAttributes(["sauvegarde_justice"])),
    }),
    subrogeTuteurCreateur: await getValidationStatus(data, {
      debugName: "activite/subrogeTuteurCreateur",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes(["subroge_tuteur_createur"])
      ),
    }),
    tutelle: await getValidationStatus(data, {
      debugName: "activite/tutelle",
      logDataWithErrors: false,
      schema: yup.object(
        buildMesureGroupsAttributes([
          "tutelle_etablissement",
          "tutelle_domicile",
        ])
      ),
    }),
  };

  activiteStatus.global = getGlobalStatus(activiteStatus);

  return activiteStatus;
};
