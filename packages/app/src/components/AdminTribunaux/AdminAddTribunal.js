import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { ADD_TRIBUNAL } from "./mutations";
import { DEPARTEMENTS } from "./queries";

export const AdminAddTribunal = () => {
  const { data, loading } = useQuery(DEPARTEMENTS);
  const [addTribunal] = useMutation(ADD_TRIBUNAL, {
    onCompleted: () => Router.push("/admin/tribunaux"),
  });

  if (loading && !data) {
    return null;
  }

  return (
    <AdminTribunalForm
      onCancel={() => Router.push("/admin/tribunaux")}
      onSubmit={async (values) => {
        const departement = data.departements.find(({ code }) => code === values.geocode.depcode);
        await addTribunal({
          variables: {
            address: values.geocode.label,
            code_postal: values.geocode.postcode,
            email: values.email,
            etablissement: values.etablissement,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.geocode.city,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            departement_id: departement.id,
          },
        });
      }}
    />
  );
};
