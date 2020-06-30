const { buildMesureGroupsAttributes } = require("./activiteSchemaUtil");
const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");
const logger = require("../../../../../../utils/logger");

module.exports = async (enqueteReponse) => {
  logger.info(
    enqueteReponse.enquete_reponses_activite,
    "enquete_reponses_activite"
  );

  const data = enqueteReponse.enquete_reponses_activite;

  const activiteStatus = {
    curatelleRenforcee: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_renforcee_etablissement",
          "curatelle_renforcee_domicile",
        ])
      ),
      debugName: "activite/curatelleRenforcee",
      logDataWithErrors: false,
    }),
    curatelleSimple: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_simple_etablissement",
          "curatelle_simple_domicile",
        ])
      ),
      debugName: "activite/curatelleSimple",
      logDataWithErrors: false,
    }),
    tutelle: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "tutelle_etablissement",
          "tutelle_domicile",
        ])
      ),
      debugName: "activite/tutelle",
      logDataWithErrors: false,
    }),
    accompagnementJudiciaire: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "accompagnement_judiciaire_etablissement",
          "accompagnement_judiciaire_domicile",
        ])
      ),
      debugName: "activite/accompagnementJudiciaire",
      logDataWithErrors: false,
    }),
    curatelleBiens: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_biens_etablissement",
          "curatelle_biens_domicile",
        ])
      ),
      debugName: "activite/curatelleBiens",
      logDataWithErrors: false,
    }),
    curatellePersonne: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes([
          "curatelle_personne_etablissement",
          "curatelle_personne_domicile",
        ])
      ),
      debugName: "activite/curatellePersonne",
      logDataWithErrors: false,
    }),
    subrogeTuteurCreateur: await getValidationStatus(data, {
      schema: yup.object(
        buildMesureGroupsAttributes(["subroge_tuteur_createur"])
      ),
      debugName: "activite/subrogeTuteurCreateur",
      logDataWithErrors: false,
    }),
    sauvegardeJustice: await getValidationStatus(data, {
      schema: yup.object(buildMesureGroupsAttributes(["sauvegarde_justice"])),
      debugName: "activite/sauvegardeJustice",
      logDataWithErrors: false,
    }),
    mandatHadocMajeur: await getValidationStatus(data, {
      schema: yup.object(buildMesureGroupsAttributes(["mandat_adhoc_majeur"])),
      debugName: "activite/mandatHadocMajeur",
      logDataWithErrors: false,
    }),
    revisionMesures: await getValidationStatus(data, {
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
      debugName: "activite/revisionMesures",
      logDataWithErrors: false,
    }),
    causesSortiesDispositif: await getValidationStatus(data, {
      schema: yup.object(
        ["sorties_main_levee", "sorties_deces", "sorties_masp"].reduce(
          (acc, attrName) => {
            acc[attrName] = yup.number().min(0).integer().nullable();
            return acc;
          },
          []
        )
      ),
      debugName: "activite/causesSortiesDispositif",
      logDataWithErrors: false,
    }),
  };

  activiteStatus.global = getGlobalStatus(activiteStatus);

  return activiteStatus;
};
