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
      steps: [
        {
          label: "Bienvenue",
          component: EnqueteIndividuelWelcome
        }
      ]
    },
    {
      label: "Vos informations",
      status: "valid", // TODO
      steps: [
        {
          label: "Informations générales",
          component: EnqueteIndividuelInformations,
          status: enqueteReponse.enquete_reponses_informations_mandataire_generales_status
        },
        {
          label: "Agréments",
          component: EnqueteIndividuelInformationsAgrements,
          status: enqueteReponse.enquete_reponses_informations_mandataire_agrements_status
        },
        {
          label: "Formation",
          component: EnqueteIndividuelInformationsFormation,
          status: enqueteReponse.enquete_reponses_informations_mandataire_formation_status
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
      status: "valid", // TODO
      steps: [
        {
          label: "Curatelle",
          component: EnquetePopulationsCuratelle,
          status: enqueteReponse.enquete_reponses_populations_curatelle_status
        },
        {
          label: "Tutelle",
          component: EnquetePopulationsTutelle,
          status: enqueteReponse.enquete_reponses_populations_tutelle_status
        },
        {
          label: "Mesure d'accompagnement de justice",
          component: EnquetePopulationsMAJ,
          status: enqueteReponse.enquete_reponses_populations_accompagnement_judiciaire_status
        },
        {
          label: "Sauvegarde de justice",
          component: EnquetePopulationsSauvegardeJustice,
          status: enqueteReponse.enquete_reponses_populations_sauvegarde_justice_status
        },
        {
          label: "Autre",
          component: EnquetePopulationsAutreMesures,
          status: enqueteReponse.enquete_reponses_populations_autre_status
        }
      ]
    },
    {
      label: "Prestations sociales",
      status: "valid", // TODO
      steps: [{ label: "Prestations sociales", component: EnqueteIndividuelPrestationsSociales }]
    },
    {
      status: status.global === "valid" ? "valid" : "empty",
      steps: [{ label: "Envoi de vos réponses", component: EnqueteIndividuelSubmit }]
    }
  ];
}
