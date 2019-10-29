import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { UPDATE_TRIBUNAL } from "./mutations";
import { AdminTribunalForm } from "./AdminTribunalForm";

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
          variables: {
            id: tribunal.id,
            etablissement: values.etablissement,
            email: values.email,
            code_postal: values.code_postal,
            ville: values.ville,
            telephone: values.telephone,
            siret: values.siret
          },
          refetchQueries: ["tis", "tis_aggregate"]
        })
      }
    />
  );
};
