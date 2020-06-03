import {
  EnqueteActiviteAccompagnementJudiciaire,
  EnqueteActiviteCausesSortiesDispositif,
  EnqueteActiviteCuratelleBiens,
  EnqueteActiviteCuratellePersonne,
  EnqueteActiviteCuratelleRenforcee,
  EnqueteActiviteCuratelleSimple,
  EnqueteActiviteMandatHadocMajeur,
  EnqueteActiviteRevisionMesures,
  EnqueteActiviteSauvegardeJustice,
  EnqueteActiviteSubrogeTuteurCreateur,
  EnqueteActiviteTutelle
} from "../EnqueteActivite";
import {
  EnqueteIndividuelInformations,
  EnqueteIndividuelInformationsAgrements,
  EnqueteIndividuelInformationsFormation
} from "../EnqueteIndividuelInformations";
import { EnqueteIndividuelPrestationsSociales } from "../EnqueteIndividuelPrestationsSociales";
import {
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle
} from "../EnquetePopulations";
import EnqueteIndividuelSubmit from "./EnqueteIndividuelSubmit";
import { EnqueteIndividuelWelcome } from "./EnqueteIndividuelWelcome";

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
          component: EnqueteIndividuelWelcome,
          status: "valid"
        }
      ]
    },
    {
      label: "Vos informations",
      status: status.informations.global,
      steps: [
        {
          label: "Informations générales",
          component: EnqueteIndividuelInformations,
          status: status.informations.informationsGenerales
        },
        {
          label: "Agréments",
          component: EnqueteIndividuelInformationsAgrements,
          status: status.informations.agrements
        },
        {
          label: "Formation",
          component: EnqueteIndividuelInformationsFormation,
          status: status.informations.formation
        }
      ]
    },
    {
      label: "Votre activité",
      status: status.activite.global,
      steps: [
        {
          label: "Curatelle renforcée",
          component: EnqueteActiviteCuratelleRenforcee,
          status: status.activite.curatelleRenforcee
        },
        {
          label: "Curatelle simple",
          component: EnqueteActiviteCuratelleSimple,
          status: status.activite.curatelleSimple
        },
        {
          label: "Tutelle",
          component: EnqueteActiviteTutelle,
          status: status.activite.tutelle
        },
        {
          label: "Mesure d'accompagnement judiciaire",
          component: EnqueteActiviteAccompagnementJudiciaire,
          status: status.activite.accompagnementJudiciaire
        },
        {
          label: "Tutelle ou curatelle aux biens",
          component: EnqueteActiviteCuratelleBiens,
          status: status.activite.curatelleBiens
        },
        {
          label: "Tutelle ou curatelle à la personne",
          component: EnqueteActiviteCuratellePersonne,
          status: status.activite.curatellePersonne
        },
        {
          label: "Subrogé tuteur ou curateur",
          component: EnqueteActiviteSubrogeTuteurCreateur,
          status: status.activite.subrogeTuteurCreateur
        },
        {
          label: "Sauvegarde de justice",
          component: EnqueteActiviteSauvegardeJustice,
          status: status.activite.sauvegardeJustice
        },
        {
          label: "Mandat ad hoc majeur",
          component: EnqueteActiviteMandatHadocMajeur,
          status: status.activite.mandatHadocMajeur
        },
        {
          label: "Issues des révisions de mesures",
          component: EnqueteActiviteRevisionMesures,
          status: status.activite.revisionMesures
        },
        {
          label: "Causes des sorties du dispositif",
          component: EnqueteActiviteCausesSortiesDispositif,
          status: status.activite.causesSortiesDispositif
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
      label: "Prestations sociales",
      status: status.prestationsSociales.global,
      steps: [
        {
          label: "Prestations sociales",
          component: EnqueteIndividuelPrestationsSociales,
          status: status.prestationsSociales.global
        }
      ]
    },
    {
      status: status.global === "valid" ? "valid" : "empty",
      steps: [
        {
          label: "Envoi de vos réponses",
          component: EnqueteIndividuelSubmit,
          status: status.global === "valid" ? "valid" : "empty"
        }
      ]
    }
  ];
}
