import { useMutation } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";

import { useHistory } from "react-router-dom";

import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { AdminTribunalForm } from "./AdminTribunalForm";
import { ADD_TRIBUNAL } from "./mutations";

export function AdminAddTribunal() {
  const history = useHistory();

  const { departements, loading } = useDepartements();
  const [addTribunal] = useMutation(ADD_TRIBUNAL, {
    onCompleted: () => history.push("/admin/tribunaux"),
  });

  if (loading) {
    return null;
  }

  return (
    <AdminTribunalForm
      onCancel={() => history.push("/admin/tribunaux")}
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
}
