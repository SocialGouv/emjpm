import { useMutation } from "@apollo/react-hooks";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import Router from "next/router";
import React from "react";

import { useDepartements } from "~/util/departements/useDepartements.hook";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { ADD_TRIBUNAL } from "./mutations";

export const AdminAddTribunal = () => {
  const { departements, loading } = useDepartements();
  const [addTribunal] = useMutation(ADD_TRIBUNAL, {
    onCompleted: () => Router.push("/admin/tribunaux"),
  });

  if (loading) {
    return null;
  }

  return (
    <AdminTribunalForm
      onCancel={() => Router.push("/admin/tribunaux")}
      onSubmit={async (values) => {
        const departement = findDepartementByCodeOrId(departements, {
          code: values.geocode.depcode,
        });
        await addTribunal({
          variables: {
            adresse: values.geocode.label,
            code_postal: values.geocode.postcode,
            departement_id: departement.id,
            email: values.email,
            etablissement: values.etablissement,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.geocode.city,
          },
        });
      }}
    />
  );
};
