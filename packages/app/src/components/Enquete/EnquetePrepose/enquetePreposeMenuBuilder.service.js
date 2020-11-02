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
import { EnquetePreposeFinancement } from "../EnquetePreposeFinancement";
import {
  EnquetePreposeModaliteExerciceEtablissements,
  EnquetePreposeModaliteExerciceInformations,
} from "../EnquetePreposeModaliteExercice";
import { EnquetePreposePersonnelFormationAutres } from "../EnquetePreposePersonnelFormation/EnquetePreposePersonnelFormationAutres";
import { EnquetePreposePersonnelFormationMjpm } from "../EnquetePreposePersonnelFormation/EnquetePreposePersonnelFormationMjpm";
import {
  EnquetePreposePrestationsSocialesAutresMesures,
  EnquetePreposePrestationsSocialesCuratelleRenforcee,
  EnquetePreposePrestationsSocialesCuratelleSimple,
  EnquetePreposePrestationsSocialesMAJ,
  EnquetePreposePrestationsSocialesRepartitionPersonnes,
  EnquetePreposePrestationsSocialesTutelle,
} from "../EnquetePreposePrestationsSociales";
import { EnquetePreposeSubmit } from "./EnquetePreposeSubmit";
import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";

function buildMenuSections(enqueteReponse) {
  const status = enqueteReponse.enquete_reponse_validation_status;
  const menu = [
    {
      status: "valid",
      steps: [
        {
          component: EnquetePreposeWelcome,
          label: "Bienvenue",
          status: "valid",
        },
      ],
    },
    {
      label: "Modalité d'exercice",
      status: status.modalitesExercice.global,
      steps: [
        {
          component: EnquetePreposeModaliteExerciceInformations,
          label: "Informations générales",
          status: status.modalitesExercice.informationsGenerales,
        },
        {
          component: EnquetePreposeModaliteExerciceEtablissements,
          label: "Etablissements",
          status: status.modalitesExercice.etablissements,
        },
      ],
    },
    {
      label: "Personnel et formation",
      status: status.personnelFormation.global,
      steps: [
        {
          component: EnquetePreposePersonnelFormationMjpm,
          label: "Préposés MJPM",
          status: status.personnelFormation.mjpm,
        },
        {
          component: EnquetePreposePersonnelFormationAutres,
          label: "Autres informations",
          status: status.personnelFormation.autres,
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
      label: "Revenus / Prestations sociales",
      status: status.prestationsSociales.global,
      steps: [
        {
          component: EnquetePreposePrestationsSocialesTutelle,
          label: "Revenus tutelle",
          status: status.prestationsSociales.tutelle,
        },
        {
          component: EnquetePreposePrestationsSocialesCuratelleSimple,
          label: "Revenus curatelle simple",
          status: status.prestationsSociales.curatelle_simple,
        },
        {
          component: EnquetePreposePrestationsSocialesCuratelleRenforcee,
          label: "Revenus curatelle renforcée",
          status: status.prestationsSociales.curatelle_renforcee,
        },
        {
          component: EnquetePreposePrestationsSocialesAutresMesures,
          label: "Revenus autres mesures",
          status: status.prestationsSociales.sauvegarde_autres_mesures,
        },
        {
          component: EnquetePreposePrestationsSocialesMAJ,
          label: "Revenus MAJ",
          status: status.prestationsSociales.maj,
        },
        {
          component: EnquetePreposePrestationsSocialesRepartitionPersonnes,
          label: "Prestations sociales",
          status: status.prestationsSociales.repartition,
        },
      ],
    },
    {
      status: status.financement.global,
      steps: [
        {
          component: EnquetePreposeFinancement,
          label: "Financement",
          status: status.financement.global,
        },
      ],
    },
    {
      status: enqueteReponse.status === "draft" ? "empty" : "valid",
      steps: [
        {
          component: EnquetePreposeSubmit,
          label: "Envoi de vos réponses",
          status: status.global === "valid" ? "valid" : "empty",
        },
      ],
    },
  ];

  return menu;
}

export const enquetePreposeMenuBuilder = {
  buildMenuSections,
};
