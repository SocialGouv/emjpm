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
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle
} from "../EnquetePopulations";
import { EnquetePreposeFinancement } from "../EnquetePreposeFinancement";
import {
  EnquetePreposeModaliteExerciceEtablissements,
  EnquetePreposeModaliteExerciceInformations
} from "../EnquetePreposeModaliteExercice";
import { EnquetePreposePersonelFormationAutres } from "../EnquetePreposePersonelFormation/EnquetePreposePersonelFormationAutres";
import { EnquetePreposePersonelFormationMjpm } from "../EnquetePreposePersonelFormation/EnquetePreposePersonelFormationMjpm";
import {
  EnquetePreposePrestationsSocialesAutresMesures,
  EnquetePreposePrestationsSocialesCuratelleRenforcee,
  EnquetePreposePrestationsSocialesCuratelleSimple,
  EnquetePreposePrestationsSocialesMAJ,
  EnquetePreposePrestationsSocialesRepartitionPersonnes,
  EnquetePreposePrestationsSocialesTutelle
} from "../EnquetePreposePrestationsSociales";
import { EnquetePreposeSubmit } from "./EnquetePreposeSubmit";
import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";

function buildMenuSections(enqueteReponse) {
  const status = enqueteReponse.enquete_reponse_status;

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
      label: "Personel et formation",
      status: status.personelFormation.global,
      steps: [
        {
          label: "Préposés MJPM",
          component: EnquetePreposePersonelFormationMjpm,
          status: status.personelFormation.mjpm
        },
        {
          label: "Autres informations",
          component: EnquetePreposePersonelFormationAutres,
          status: status.personelFormation.autres
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
      label: "Revenus / Prestations sociales",
      status: status.prestationsSociales.global,
      steps: [
        {
          label: "Revenus tutelle",
          component: EnquetePreposePrestationsSocialesTutelle,
          status: status.prestationsSociales.tutelle
        },
        {
          label: "Revenus curatelle simple",
          component: EnquetePreposePrestationsSocialesCuratelleSimple,
          status: status.prestationsSociales.curatelle_simple
        },
        {
          label: "Revenus curatelle renforcée",
          component: EnquetePreposePrestationsSocialesCuratelleRenforcee,
          status: status.prestationsSociales.curatelle_renforcee
        },
        {
          label: "Revenus autres mesures",
          component: EnquetePreposePrestationsSocialesAutresMesures,
          status: status.prestationsSociales.sauvegarde_autres_mesures
        },
        {
          label: "Revenus MAJ",
          component: EnquetePreposePrestationsSocialesMAJ,
          status: status.prestationsSociales.maj
        },
        {
          label: "Prestations sociales",
          component: EnquetePreposePrestationsSocialesRepartitionPersonnes,
          status: status.prestationsSociales.repartition
        }
      ]
    },
    {
      status: status.financement.global,
      steps: [
        {
          label: "Financement",
          component: EnquetePreposeFinancement,
          status: status.financement.global
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
