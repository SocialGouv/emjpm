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
  EnqueteActiviteTutelle,
} from "../EnqueteActivite";
import {
  EnqueteIndividuelInformationsAgrement,
  EnqueteIndividuelInformationsFormation,
  EnqueteIndividuelInformationsMandataire,
} from "../EnqueteIndividuelInformations";
import { EnqueteIndividuelPrestationsSociales } from "../EnqueteIndividuelPrestationsSociales";
import {
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle,
} from "../EnquetePopulations";
import { EnqueteIndividuelSubmit } from "./EnqueteIndividuelSubmit";
import { EnqueteIndividuelWelcome } from "./EnqueteIndividuelWelcome";

export const enqueteIndividuelMenuBuilder = {
  buildMenuSections,
};

function buildMenuSections(enqueteReponse) {
  const status = enqueteReponse.enquete_reponse_validation_status;

  const menu = [
    {
      status: "valid",
      steps: [
        {
          component: EnqueteIndividuelWelcome,
          label: "Bienvenue",
          status: "valid",
        },
      ],
    },
    {
      label: "Vos informations",
      status: status.informations.global,
      steps: [
        {
          component: EnqueteIndividuelInformationsMandataire,
          label: "Informations générales",
          status: status.informations.informationsGenerales,
        },
        {
          component: EnqueteIndividuelInformationsAgrement,
          label: "Agrément",
          status: status.informations.agrements,
        },
        {
          component: EnqueteIndividuelInformationsFormation,
          label: "Formation",
          status: status.informations.formation,
        },
      ],
    },
    {
      label: "Votre activité en 2019",
      status: status.activite.global,
      steps: [
        {
          component: EnqueteActiviteCuratelleRenforcee,
          label: "Curatelle renforcée",
          status: status.activite.curatelleRenforcee,
        },
        {
          component: EnqueteActiviteCuratelleSimple,
          label: "Curatelle simple",
          status: status.activite.curatelleSimple,
        },
        {
          component: EnqueteActiviteTutelle,
          label: "Tutelle",
          status: status.activite.tutelle,
        },
        {
          component: EnqueteActiviteAccompagnementJudiciaire,
          label: "Mesure d'accompagnement judiciaire",
          status: status.activite.accompagnementJudiciaire,
        },
        {
          component: EnqueteActiviteCuratelleBiens,
          label: "Tutelle ou curatelle aux biens",
          status: status.activite.curatelleBiens,
        },
        {
          component: EnqueteActiviteCuratellePersonne,
          label: "Tutelle ou curatelle à la personne",
          status: status.activite.curatellePersonne,
        },
        {
          component: EnqueteActiviteSubrogeTuteurCreateur,
          label: "Subrogé tuteur ou curateur",
          status: status.activite.subrogeTuteurCreateur,
        },
        {
          component: EnqueteActiviteSauvegardeJustice,
          label: "Sauvegarde de justice",
          status: status.activite.sauvegardeJustice,
        },
        {
          component: EnqueteActiviteMandatHadocMajeur,
          label: "Mandat ad hoc majeur",
          status: status.activite.mandatHadocMajeur,
        },
        {
          component: EnqueteActiviteRevisionMesures,
          label: "Issues des révisions de mesures",
          status: status.activite.revisionMesures,
        },
        {
          component: EnqueteActiviteCausesSortiesDispositif,
          label: "Causes des sorties du dispositif",
          status: status.activite.causesSortiesDispositif,
        },
      ],
    },
    {
      label: "Populations",
      status: status.populations.global,
      steps: [
        {
          component: EnquetePopulationsCuratelle,
          label: "Curatelle",
          status: status.populations.curatelle,
        },
        {
          component: EnquetePopulationsTutelle,
          label: "Tutelle",
          status: status.populations.tutelle,
        },
        {
          component: EnquetePopulationsMAJ,
          label: "Mesure d'accompagnement de justice",
          status: status.populations.accompagnementJudiciaire,
        },
        {
          component: EnquetePopulationsSauvegardeJustice,
          label: "Sauvegarde de justice",
          status: status.populations.sauvegardeJustice,
        },
        {
          component: EnquetePopulationsAutreMesures,
          label: "Autre",
          status: status.populations.autresMesures,
        },
      ],
    },
    {
      label: "Prestations sociales",
      status: status.prestationsSociales.global,
      steps: [
        {
          component: EnqueteIndividuelPrestationsSociales,
          label: "Prestations sociales",
          status: status.prestationsSociales.global,
        },
      ],
    },
    {
      status: enqueteReponse.status === "draft" ? "empty" : "valid",
      steps: [
        {
          component: EnqueteIndividuelSubmit,
          label: "Envoi de vos réponses",
          status: status.global === "valid" ? "valid" : "empty",
        },
      ],
    },
  ];

  return menu;
}
