import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";

import { AdminServiceForm } from "./AdminServiceForm";
import { ADD_SERVICE } from "./mutations";

export const AdminAddService = () => {
  const [AddService] = useMutation(ADD_SERVICE, {
    onCompleted: () => Router.push("/admin/services")
  });

  return (
    <AdminServiceForm
      onCancel={() => Router.push("/admin/services")}
      onSubmit={values =>
        AddService({
          variables: {
            code_postal: values.code_postal,
            department_id: values.departement.value,
            email: values.email,
            etablissement: values.etablissement,
            telephone: values.telephone,
            ville: values.ville
          }
        })
      }
    />
  );
};
