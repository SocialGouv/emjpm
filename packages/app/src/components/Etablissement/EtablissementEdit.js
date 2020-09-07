import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box, Text } from "rebass";

import { EtablissementEditForm } from "./EtablissementEditForm";
import { UPDATE_ETABLISSEMENT } from "./mutations";
import { ETABLISSEMENT } from "./queries";

export const EtablissementEdit = (props) => {
  const { id } = props;

  const router = useRouter();
  const { data, loading, error } = useQuery(ETABLISSEMENT, {
    variables: { id },
  });

  const [updateEtablissement] = useMutation(UPDATE_ETABLISSEMENT);

  if (error) {
    return <Text>Oups, une erreur est survenue.</Text>;
  }

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  if (data && data.etablissements_by_pk) {
    const { departements, etablissements_by_pk: etablissement } = data;

    return (
      <EtablissementEditForm
        departements={departements}
        onSubmit={async (values) => {
          await updateEtablissement({
            variables: {
              id,
              data: values,
            },
          });
          router.push("/admin/etablissements");
        }}
        data={etablissement}
      />
    );
  }
};

export default EtablissementEdit;
