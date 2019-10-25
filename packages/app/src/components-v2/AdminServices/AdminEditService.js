import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { AdminServiceForm } from "./AdminServiceForm";
import { UPDATE_SERVICE } from "./mutations";

export const AdminEditService = ({ service, closePanel }) => {
  const [UpdateService] = useMutation(UPDATE_SERVICE, {
    onCompleted: closePanel
  });

  return (
    <AdminServiceForm
      service={service}
      onCancel={closePanel}
      onSubmit={values =>
        UpdateService({
          variables: {
            id: service.id,
            etablissement: values.etablissement,
            email: values.email,
            code_postal: values.code_postal,
            ville: values.ville,
            telephone: values.telephone,
            department_id: values.departement.value
          },
          refetchQueries: ["services", "services_aggregate"]
        })
      }
    />
  );
};
