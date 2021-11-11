import { useMutation } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";

import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { UPDATE_TRIBUNAL } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function AdminEditTribunal({ tribunal, closePanel }) {
  const { departements, loadingDepartements } = useDepartements();
  const [updateTribunal, { loading, error }] = useMutation(UPDATE_TRIBUNAL, {
    onCompleted: closePanel,
  });

  useQueryReady(loading, error);

  if (loadingDepartements) {
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
            departement_code: departement.id,
            email: values.email,
            etablissement: values.etablissement,
            id: tribunal.id,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            siret: values.siret,
            telephone: values.telephone,
            ville: values.geocode.city,
            actual_tribunal_id: values.actual_tribunal_id,
          },
        });
      }}
    />
  );
}
