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
      steps: [
        {
          label: "Informations générales",
          component: EnqueteIndividuelInformations,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_informations_mandataire_generales_status
          )
        },
        {
          label: "Agréments",
          component: EnqueteIndividuelInformationsAgrements,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_informations_mandataire_agrements_status
          )
        },
        {
          label: "Formation",
          component: EnqueteIndividuelInformationsFormation,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_informations_mandataire_formation_status
          )
        }
      ]
    },
    {
      label: "Votre activité",
      steps: [
        {
          label: "Curatelle renforcée",
          component: EnqueteActiviteCuratelleRenforcee,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_renforcee_status
          )
        },
        {
          label: "Curatelle simple",
          component: EnqueteActiviteCuratelleSimple,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_simple_status
          )
        },
        {
          label: "Tutelle",
          component: EnqueteActiviteTutelle,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_tutelle_status
          )
        },
        {
          label: "Mesure d'accompagnement judiciaire",
          component: EnqueteActiviteAccompagnementJudiciaire,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_accompagnement_judiciaire_status
          )
        },
        {
          label: "Tutelle ou curatelle aux biens",
          component: EnqueteActiviteCuratelleBiens,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_biens_status
          )
        },
        {
          label: "Tutelle ou curatelle à la personne",
          component: EnqueteActiviteCuratellePersonne,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_personne_status
          )
        },
        {
          label: "Subrogé tuteur ou curateur",
          component: EnqueteActiviteSubrogeTuteurCreateur,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_personne_status // FIXME
          )
        },
        {
          label: "Sauvegarde de justice",
          component: EnqueteActiviteSauvegardeJustice,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_personne_status // FIXME
          )
        },
        {
          label: "Mandat ad hoc majeur",
          component: EnqueteActiviteMandatHadocMajeur,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_curatelle_personne_status // FIXME
          )
        },
        {
          label: "Issues des révisions de mesures",
          component: EnqueteActiviteRevisionMesures,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_revision_mesures_status // FIXME
          )
        },
        {
          label: "Causes des sorties du dispositif",
          component: EnqueteActiviteCausesSortiesDispositif,
          isValid: transformStatusToIsValidProperty(
            enqueteReponse.enquete_reponses_activite_revision_mesures_status // FIXME
          )
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
      label: "Prestations sociales",
      steps: [{ label: "Prestations sociales", component: EnqueteIndividuelPrestationsSociales }]
    },
    {
      steps: [{ label: "Envoi de vos réponses", component: EnqueteIndividuelSubmit }]
    }
  ];
}

function transformStatusToIsValidProperty(status) {
  if (status === 0) {
    return null;
  }

  return status === 2 ? true : false;
}
