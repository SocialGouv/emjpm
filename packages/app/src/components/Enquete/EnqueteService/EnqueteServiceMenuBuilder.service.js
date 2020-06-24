import { EnqueteServiceInformations } from "../EnqueteServiceInformations";
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
      status: "valid",
      steps: [
        {
          label: "Informations service",
          component: EnqueteServiceInformations,
          status: "valid",
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
