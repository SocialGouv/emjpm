import {
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle
} from "../EnquetePopulations";
import {
  EnquetePreposeModaliteExerciceEtablissements,
  EnquetePreposeModaliteExerciceInformations
} from "../EnquetePreposeModaliteExercice";
import { EnquetePreposeSubmit } from "./EnquetePreposeSubmit";
import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";

export const enqueteIndividuelMenuBuilder = {
  buildMenuSections
};

function buildMenuSections(enqueteReponse) {
  return [
    {
      steps: [
        {
          label: "Bienvenue",
          component: EnquetePreposeWelcome
        }
      ]
    },
    {
      label: "Modalité d'exercice",
      steps: [
        {
          label: "Informations générales",
          component: EnquetePreposeModaliteExerciceInformations
        },
        {
          label: "Etablissements",
          component: EnquetePreposeModaliteExerciceEtablissements
        }
      ]
    },
    {
      label: "Populations",
      steps: [
        {
          label: "Curatelle",
          component: EnquetePopulationsCuratelle,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_populations_curatelle_status
          )
        },
        {
          label: "Tutelle",
          component: EnquetePopulationsTutelle,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_populations_tutelle_status
          )
        },
        {
          label: "Mesure d'accompagnement de justice",
          component: EnquetePopulationsMAJ,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_populations_accompagnement_judiciaire_status
          )
        },
        {
          label: "Sauvegarde de justice",
          component: EnquetePopulationsSauvegardeJustice,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_populations_sauvegarde_justice_status
          )
        },
        {
          label: "Autre",
          component: EnquetePopulationsAutreMesures,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_populations_autre_status
          )
        }
      ]
    },
    {
      steps: [{ label: "Envoi de vos réponses", component: EnquetePreposeSubmit }]
    }
  ];
}

function transformStatusToIsValidProperty(status) {
  if (status === 0) {
    return null;
  }

  return status === 2 ? true : false;
}

export const enquetePreposeMenuBuilder = {
  buildMenuSections
};
