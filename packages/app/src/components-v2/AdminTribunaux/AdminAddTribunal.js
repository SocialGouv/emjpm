import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { ADD_TRIBUNAL } from "./mutations";

export const AdminAddTribunal = () => {
  const [AddTribunal] = useMutation(ADD_TRIBUNAL, {
    onCompleted: () => Router.push("/admin/tribunaux")
  });
  return (
    <AdminTribunalForm
      onCancel={() => Router.push("/admin/tribunaux")}
      onSubmit={values =>
        AddTribunal({
          variables: {
            code_postal: values.code_postal,
            email: values.email,
            etablissement: values.etablissement,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.ville
          }
        })
      }
    />
  );
};
