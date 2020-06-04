const { buildMesureGroupsAttributes } = require("./activiteSchemaUtil");
const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  const data = enqueteReponse.enquete_reponses_activite;

  const activiteStatus = {
    curatelleRenforcee: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_renforcee_etablissement",
          "curatelle_renforcee_domicile"
        ])
      ),
      "activite/curatelleRenforcee"
    ),
    curatelleSimple: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_simple_etablissement",
          "curatelle_simple_domicile"
        ])
      ),
      "activite/curatelleSimple"
    ),
    tutelle: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "tutelle_etablissement",
          "tutelle_domicile"
        ])
      ),
      "activite/tutelle"
    ),
    accompagnementJudiciaire: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "accompagnement_judiciaire_etablissement",
          "accompagnement_judiciaire_domicile"
        ])
      ),
      "activite/accompagnementJudiciaire"
    ),
    curatelleBiens: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_biens_etablissement",
          "curatelle_biens_domicile"
        ])
      ),
      "activite/curatelleBiens"
    ),
    curatellePersonne: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_personne_etablissement",
          "curatelle_personne_domicile"
        ])
      ),
      "activite/curatellePersonne"
    ),
    subrogeTuteurCreateur: await getValidationStatus(
      data,
      yup.object(buildMesureGroupsAttributes(["subroge_tuteur_createur"])),
      "activite/subrogeTuteurCreateur"
    ),
    sauvegardeJustice: await getValidationStatus(
      data,
      yup.object(buildMesureGroupsAttributes(["sauvegarde_justice"])),
      "activite/sauvegardeJustice"
    ),
    mandatHadocMajeur: await getValidationStatus(
      data,
      yup.object(buildMesureGroupsAttributes(["mandat_adhoc_majeur"])),
      "activite/mandatHadocMajeur"
    ),
    revisionMesures: await getValidationStatus(
      data,
      yup.object(
        [
          "revisions_main_levee",
          "revisions_masp",
          "revisions_reconduction",
          "revisions_changement",
          "revisions_autre"
        ].reduce((acc, attrName) => {
          acc[attrName] = yup
            .number()
            .positive()
            .integer();
          return acc;
        }, [])
      ),
      "activite/revisionMesures"
    ),
    causesSortiesDispositif: await getValidationStatus(
      data,
      yup.object(
        ["sorties_main_levee", "sorties_deces", "sorties_masp"].reduce(
          (acc, attrName) => {
            acc[attrName] = yup
              .number()
              .positive()
              .integer();
            return acc;
          },
          []
        )
      ),
      "activite/causesSortiesDispositif"
    )
  };

  activiteStatus.global = getGlobalStatus(activiteStatus);

  return activiteStatus;
};
