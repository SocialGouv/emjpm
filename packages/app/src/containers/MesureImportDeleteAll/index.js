import useQueryReady from "~/hooks/useQueryReady";

import { useMutation } from "@apollo/client";

import { Box, Flex } from "rebass";
import { Text, Button } from "~/components";

import { DELETE_ALL_MESURES } from "./mutations";

export default function MesureImportDeleteAll({ mandataireId, serviceId }) {
  const [deleteAllMesures, { loading, error }] = useMutation(
    DELETE_ALL_MESURES,
    {
      refetchQueries: ["MESURES_QUERY", "CURRENT_USER_QUERY"],
      variables: {
        mandataireId,
        serviceId,
      },
    }
  );
  useQueryReady(loading, error);
  return (
    <>
      <Box>
        <Text mb="1" lineHeight="2">
          {`Depuis l'activation de la fonctionnalité des imports incrémentaux, qui permet de mettre à jour une mesure en se basant sur son numéro rg et le SIRET du tribunal, les mesures ne sont plus supprimées avant l'importation. Si vous souhaitez malgré tout supprimer avant d'effectuer votre import vous pouvez le faire manuellement en cliquant sur le boutton ci dessous. Attention cela supprimera toutes vos mesures d'eMJPM. Vous pourrez ensuite réimporter vos mesures proprement sur une base vide.`}
        </Text>
      </Box>
      <Flex justifyContent="center">
        <Button onClick={() => deleteAllMesures()}>
          Supprimer toutes les mesures
        </Button>
      </Flex>
    </>
  );
}
