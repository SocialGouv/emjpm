import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";
import { DEPARTEMENTS } from "./queries";

export const AdminEditTribunal = ({ tribunal, closePanel }) => {
  const { data, loading } = useQuery(DEPARTEMENTS);
  const [updateTribunal] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel,
  });

  if (loading && !data) {
    return null;
  }

  return (
    <AdminTribunalForm
      tribunal={tribunal}
      onCancel={closePanel}
      onSubmit={async (values) => {
        const departement = data.departements.find(
          ({ code }) => code === values.geocode.depcode
        );
        await updateTribunal({
          refetchQueries: ["tis", "tis_aggregate"],
          variables: {
            address: values.geocode.label,
            code_postal: values.geocode.postcode,
            departement_id: departement.id,
            email: values.email,
            etablissement: values.etablissement,
            id: tribunal.id,
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
