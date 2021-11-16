import useQueryReady from "~/hooks/useQueryReady";

import { useMutation } from "@apollo/client";

import { Box, Flex } from "rebass";
import { Text, Button } from "~/components";

import { Warning } from "@styled-icons/entypo/Warning";

import { DELETE_ALL_MESURES } from "./mutations";

import styled from "styled-components";

const StyledWarning = styled(Warning)`
  margin-right: 10px;
  color: orange;
`;

export default function MesureImportDeleteAll() {
  const [deleteAllMesures, { loading, error }] = useMutation(
    DELETE_ALL_MESURES,
    {
      refetchQueries: ["MESURES_QUERY", "CURRENT_USER_QUERY"],
    }
  );
  useQueryReady(loading, error);
  return (
    <>
      <Box>
        <Text mb="1">
          {`L'import de mesure est incrémental. Ainsi, aucune mesure est supprimée durant l'import. Nous mettons à jour les mesures en nous basant sur leur numéro RG et le SIRET du tribunal. Si vous souhaitez supprimer toutes les mesures de votre compte eMJPM avant d'effectuer votre import, vous pouvez le faire en cliquant sur le bouton ci-dessous.`}
        </Text>
        <Text mb="1">
          <StyledWarning size={18} />
          {`Attention, cela supprimera toutes les mesures, excepté les mesures en attente, de votre compte eMJPM.`}
        </Text>
      </Box>
      <Flex justifyContent="center">
        <Button mt="1" onClick={() => deleteAllMesures()}>
          Supprimer toutes les mesures
        </Button>
      </Flex>
    </>
  );
}
