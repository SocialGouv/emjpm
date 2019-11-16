import { useMutation } from "@apollo/react-hooks";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";

export const AdminEditTribunal = ({ tribunal, closePanel }) => {
  const [UpdateTribunal] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel
  });

  return (
    <AdminTribunalForm
      tribunal={tribunal}
      onCancel={closePanel}
      onSubmit={values =>
        UpdateTribunal({
          refetchQueries: ["tis", "tis_aggregate"],
          variables: {
            code_postal: values.code_postal,
            email: values.email,
            etablissement: values.etablissement,
            id: tribunal.id,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.ville
          }
        })
      }
    />
  );
};
