import { EnquetePreposeSubmit } from "./EnquetePreposeSubmit";
import { EnquetePreposeWelcome } from "./EnquetePreposeWelcome";

export const enqueteIndividuelMenuBuilder = {
  buildMenuSections
};

function buildMenuSections() {
  return [
    {
      steps: [
        {
          label: "Bienvenue",
          component: EnquetePreposeWelcome
        }
      ]
    },
    {
      steps: [{ label: "Envoi de vos réponses", component: EnquetePreposeSubmit }]
    }
  ];
}

// function transformStatusToIsValidProperty(status) {
//   if (status === 0) {
//     return null;
//   }

//   return status === 2 ? true : false;
// }

export const enquetePreposeMenuBuilder = {
  buildMenuSections
};
