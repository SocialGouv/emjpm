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
  const status = enqueteReponse.enquete_reponses_status;
  console.log("xxx status:", status);

  return [
    {
      status: "valid",
      steps: [
        {
          label: "Bienvenue",
          component: EnquetePreposeWelcome,
          status: "valid"
        }
      ]
    },
    {
      label: "Modalité d'exercice",
      status: status.modalitesExercice.global,
      steps: [
        {
          label: "Informations générales",
          component: EnquetePreposeModaliteExerciceInformations,
          status: status.modalitesExercice.informationsGenerales
        },
        {
          label: "Etablissements",
          component: EnquetePreposeModaliteExerciceEtablissements,
          status: status.modalitesExercice.etablissements
        }
      ]
    },
    {
      label: "Populations",
      status: status.populations.global,
      steps: [
        {
          label: "Curatelle",
          component: EnquetePopulationsCuratelle,
          status: status.populations.curatelle
        },
        {
          label: "Tutelle",
          component: EnquetePopulationsTutelle,
          status: status.populations.tutelle
        },
        {
          label: "Mesure d'accompagnement de justice",
          component: EnquetePopulationsMAJ,
          status: status.populations.accompagnementJudiciaire
        },
        {
          label: "Sauvegarde de justice",
          component: EnquetePopulationsSauvegardeJustice,
          status: status.populations.sauvegardeJustice
        },
        {
          label: "Autre",
          component: EnquetePopulationsAutreMesures,
          status: status.populations.autresMesures
        }
      ]
    },
    {
      status: status.global === "valid" ? "valid" : "empty",
      steps: [
        {
          label: "Envoi de vos réponses",
          component: EnquetePreposeSubmit,
          status: status.global === "valid" ? "valid" : "empty"
        }
      ]
    }
  ];
}

export const enquetePreposeMenuBuilder = {
  buildMenuSections
};
