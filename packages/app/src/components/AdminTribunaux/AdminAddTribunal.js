import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { ADD_TRIBUNAL } from "./mutations";

export const AdminAddTribunal = () => {
  const [addTribunal] = useMutation(ADD_TRIBUNAL, {
    onCompleted: () => Router.push("/admin/tribunaux")
  });
  return (
    <AdminTribunalForm
      onCancel={() => Router.push("/admin/tribunaux")}
      onSubmit={values =>
        addTribunal({
          variables: {
            address: values.geocode.label,
            code_postal: values.geocode.postcode,
            email: values.email,
            etablissement: values.etablissement,
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
