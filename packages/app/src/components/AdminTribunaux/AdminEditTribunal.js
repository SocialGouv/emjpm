import { useMutation } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";

import { useDepartements } from "~/util/departements/useDepartements.hook";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";

export const AdminEditTribunal = ({ tribunal, closePanel }) => {
  const { departements, loading } = useDepartements();
  const [updateTribunal] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel,
  });

  if (loading) {
    return null;
  }

  return (
    <AdminTribunalForm
      tribunal={tribunal}
      onCancel={closePanel}
      onSubmit={async (values) => {
        const departement = findDepartementByCodeOrId(departements, {
          code: values.geocode.depcode,
        });
        await updateTribunal({
          refetchQueries: ["tis", "tis_aggregate"],
          variables: {
            adresse: values.geocode.label,
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
