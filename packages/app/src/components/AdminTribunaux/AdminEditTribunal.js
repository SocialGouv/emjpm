import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";
import { DEPARTEMENTS } from "./queries";

export const AdminEditTribunal = ({ tribunal, closePanel }) => {
  // TODO: discuter de ca avec christophe, thomas & paul
  // const [getDepartement, { data1, loading }] = useLazyQuery(DEPARTEMENT);

  const { data, loading } = useQuery(DEPARTEMENTS);

  const [updateTribunal] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel
  });

  if (loading && !data) {
    return null;
  }

  return (
    <AdminTribunalForm
      tribunal={tribunal}
      onCancel={closePanel}
      onSubmit={async values => {
        // TODO: il faudrait passer ca côté server-side
        const departement = data.departements.find(({ code }) => code === values.geocode.depcode);

        await updateTribunal({
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
            longitude: values.geocode.longitude,
            departement_id: departement.id
          }
        });
      }}
    />
  );
};
