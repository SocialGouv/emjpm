const { buildMesureGroupsAttributes } = require("./activiteSchemaUtil");
const { getValidationStatus, getGlobalStatus } = require("../../common");
const yup = require("yup");

async function enqueteMandataireIndividuelActiviteStatus(enqueteReponse) {
  const data = enqueteReponse.enquete_reponses_activite;

  const activiteStatus = {
    curatelleRenforcee: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_renforcee_etablissement",
          "curatelle_renforcee_domicile"
        ])
      )
    ),
    curatelleSimple: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_simple_etablissement",
          "curatelle_simple_domicile"
        ])
      )
    ),
    tutelle: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "tutelle_etablissement",
          "tutelle_domicile"
        ])
      )
    ),
    accompagnementJudiciaire: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "accompagnement_judiciaire_etablissement",
          "accompagnement_judiciaire_domicile"
        ])
      ),
      "accompagnementJudiciaire"
    ),
    curatelleBiens: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_biens_etablissement",
          "curatelle_biens_domicile"
        ])
      ),
      "curatelle_biens"
    ),
    curatellePersonne: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "curatelle_personne_etablissement",
          "curatelle_personne_domicile"
        ])
      )
    ),
    subrogeTuteurCreateur: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "subroge_tuteur_createur_etablissement",
          "subroge_tuteur_createur_domicile"
        ])
      )
    ),
    sauvegardeJustice: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "sauvegarde_justice_etablissement",
          "sauvegarde_justice_etablissement"
        ])
      )
    ),
    mandatHadocMajeur: await getValidationStatus(
      data,
      yup.object(
        buildMesureGroupsAttributes([
          "mandat_adhoc_majeur_domicile",
          "mandat_adhoc_majeur_domicile"
        ])
      )
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
      )
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
      )
    )
  };

  activiteStatus.global = getGlobalStatus(activiteStatus);

  console.log("xxx =>>>>>>>>> activiteStatus:", activiteStatus);

  return activiteStatus;
}

module.exports = enqueteMandataireIndividuelActiviteStatus;
