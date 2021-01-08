import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Box, Text } from "rebass";

import { EtablissementViewForm } from "./EtablissementViewForm";
import { ETABLISSEMENT } from "./queries";

export const EtablissementView = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(ETABLISSEMENT, {
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
