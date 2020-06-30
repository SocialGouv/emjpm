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
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle,
} from "../EnquetePopulations";
import { EnqueteServiceInformations } from "../EnqueteServiceInformations";
import { EnqueteServicePersonnelFormation } from "../EnqueteServicePersonnelFormation";
import { EnqueteServiceSubmit } from "./EnqueteServiceSubmit";
import { EnqueteServiceWelcome } from "./EnqueteServiceWelcome";

function buildMenuSections(enqueteReponse) {
  const status = enqueteReponse.enquete_reponse_validation_status;

  const menu = [
    {
      status: "valid",
      steps: [
        {
          label: "Bienvenue",
          component: EnqueteServiceWelcome,
          status: "valid",
        },
      ],
    },
    {
      status: status.informations.global,
      steps: [
        {
          label: "Informations service",
          component: EnqueteServiceInformations,
          status: status.informations.informations,
        },
      ],
    },
    {
      status: status.personnelFormation.global,
      steps: [
        {
          label: "Personnel et formation",
          component: EnqueteServicePersonnelFormation,
          status: status.personnelFormation.personnelFormation,
        },
      ],
    },
    {
      label: "Votre activité",
      status: status.activite.global,
      steps: [
        {
          label: "Curatelle renforcée",
          component: EnqueteActiviteCuratelleRenforcee,
          status: status.activite.curatelleRenforcee,
        },
        {
          label: "Curatelle simple",
          component: EnqueteActiviteCuratelleSimple,
          status: status.activite.curatelleSimple,
        },
        {
          label: "Tutelle",
          component: EnqueteActiviteTutelle,
          status: status.activite.tutelle,
        },
        {
          label: "Mesure d'accompagnement judiciaire",
          component: EnqueteActiviteAccompagnementJudiciaire,
          status: status.activite.accompagnementJudiciaire,
        },
        {
          label: "Tutelle ou curatelle aux biens",
          component: EnqueteActiviteCuratelleBiens,
          status: status.activite.curatelleBiens,
        },
        {
          label: "Tutelle ou curatelle à la personne",
          component: EnqueteActiviteCuratellePersonne,
          status: status.activite.curatellePersonne,
        },
        {
          label: "Subrogé tuteur ou curateur",
          component: EnqueteActiviteSubrogeTuteurCreateur,
          status: status.activite.subrogeTuteurCreateur,
        },
        {
          label: "Sauvegarde de justice",
          component: EnqueteActiviteSauvegardeJustice,
          status: status.activite.sauvegardeJustice,
        },
        {
          label: "Mandat ad hoc majeur",
          component: EnqueteActiviteMandatHadocMajeur,
          status: status.activite.mandatHadocMajeur,
        },
        {
          label: "Issues des révisions de mesures",
          component: EnqueteActiviteRevisionMesures,
          status: status.activite.revisionMesures,
        },
        {
          label: "Causes des sorties du dispositif",
          component: EnqueteActiviteCausesSortiesDispositif,
          status: status.activite.causesSortiesDispositif,
        },
      ],
    },
    {
      label: "Populations",
      status: status.populations.global,
      steps: [
        {
          label: "Curatelle",
          component: EnquetePopulationsCuratelle,
          status: status.populations.curatelle,
        },
        {
          label: "Tutelle",
          component: EnquetePopulationsTutelle,
          status: status.populations.tutelle,
        },
        {
          label: "Mesure d'accompagnement de justice",
          component: EnquetePopulationsMAJ,
          status: status.populations.accompagnementJudiciaire,
        },
        {
          label: "Sauvegarde de justice",
          component: EnquetePopulationsSauvegardeJustice,
          status: status.populations.sauvegardeJustice,
        },
        {
          label: "Autre",
          component: EnquetePopulationsAutreMesures,
          status: status.populations.autresMesures,
        },
      ],
    },
    {
      status: enqueteReponse.status === "draft" ? "empty" : "valid",
      steps: [
        {
          label: "Envoi de vos réponses",
          component: EnqueteServiceSubmit,
          status: status.global === "valid" ? "valid" : "empty",
        },
      ],
    },
  ];

  return menu;
}

export const enqueteServiceMenuBuilder = {
  buildMenuSections,
};
