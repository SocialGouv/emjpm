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
          component: EnqueteServiceWelcome,
          label: "Bienvenue",
          status: "valid",
        },
      ],
    },
    {
      status: status.informations.global,
      steps: [
        {
          component: EnqueteServiceInformations,
          label: "Informations service",
          status: status.informations.informations,
        },
      ],
    },
    {
      status: status.personnelFormation.global,
      steps: [
        {
          component: EnqueteServicePersonnelFormation,
          label: "Personnel et formation",
          status: status.personnelFormation.personnelFormation,
        },
      ],
    },
    {
      label: "Votre activité",
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
      status: enqueteReponse.status === "draft" ? "empty" : "valid",
      steps: [
        {
          component: EnqueteServiceSubmit,
          label: "Envoi de vos réponses",
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
