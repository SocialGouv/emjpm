import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EtablissementEditForm } from "./EtablissementEditForm";
import { CREATE_ETABLISSEMENT } from "./mutations";
import { DEPARTEMENTS } from "./queries";

export const EtablissementCreate = () => {
  const { data, loading: queryLoading } = useQuery(DEPARTEMENTS);
  const [createEtablissement, { loading }] = useMutation(CREATE_ETABLISSEMENT);

  if (queryLoading) {
    return <Box>Chargement...</Box>;
  }

  return (
    <EtablissementEditForm
      loading={loading}
      departements={data.departements || []}
      onSubmit={async (values) => {
        await createEtablissement({
          variables: {
            adresse: values.adresse,
            code_postal: values.code_postal,
            departement_id: values.departement_id,
            fax: values.fax,
            id_finess: values.id_finess,
            latitude: values.latitude,
            longitude: values.longitude,
            nom: values.nom,
            tel: values.tel,
            ville: values.ville,
          },
        });
      }}
    />
  );
};

export default EtablissementCreate;
