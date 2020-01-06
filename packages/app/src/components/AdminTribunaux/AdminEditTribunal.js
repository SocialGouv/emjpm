import { useMutation } from "@apollo/react-hooks";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";

export const AdminEditTribunal = ({ tribunal, closePanel }) => {
  const [updateTribunal] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel
  });

  return (
    <AdminTribunalForm
      tribunal={tribunal}
      onCancel={closePanel}
      onSubmit={values =>
        updateTribunal({
          refetchQueries: ["tis", "tis_aggregate"],
          variables: {
            address: values.geocode.label,
            code_postal: values.geocode.postcode,
            email: values.email,
            etablissement: values.etablissement,
            id: tribunal.id,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.geocode.city,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude
          }
        })
      }
    />
  );
};
