import React from "react";
import { useQuery } from "react-apollo";
import { Box, Text } from "rebass";

import { EtablissementViewForm } from "./EtablissementViewForm";
import { ETABLISSEMENT } from "./queries";

export const EtablissementView = (props) => {
  const { id } = props;

  const { data, loading, error } = useQuery(ETABLISSEMENT, {
    ssr: false,
    variables: { id },
  });

  if (error) {
    return <Text>Oups, une erreur est survenue.</Text>;
  }

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  if (data && data.etablissements_by_pk) {
    const etablissement = data.etablissements_by_pk;
    return <EtablissementViewForm data={etablissement} />;
  }
};

export default EtablissementView;
