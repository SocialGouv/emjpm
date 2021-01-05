import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import Router from "next/router";
import React from "react";
import { Box, Button, Flex } from "rebass";

import { MESURES_QUERY } from "~/components/MesureList/queries";
import { Text } from "~/ui";

import { IMPORT_OCMI_MESURES } from "./mutations";

const MandataireOcmiMesureImport = () => {
  const [importOcmiMesures] = useMutation(IMPORT_OCMI_MESURES, {
    onCompleted: async () => {
      Router.push(`/mandataires/mesures`);
    },
  });

  const importMesure = async () => {
    await importOcmiMesures({
      awaitRefetchQueries: true,
      refetchQueries: [
        "CURRENT_USER_QUERY",
        {
          query: MESURES_QUERY,
          variables: {
            antenne: null,
            limit: 20,
            natureMesure: null,
            offset: 0,
            searchText: null,
            status: MESURE_PROTECTION_STATUS.en_cours,
          },
        },
      ],
    });
  };

  return (
    <Flex flexDirection="column">
      <Box mb={2} p={1}>
        <Text mb="1" lineHeight="2">
          {`Pour importer vos mesures de votre compte OCMI dans votre compte eMJPM, sélectionnez le bouton ci-dessous.`}
        </Text>
      </Box>
      <Flex justifyContent="center">
        <Button
          onClick={importMesure}
          variant="outline"
          sx={{
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          Importer les mesures de mon compte OCMI dans eMJPM
        </Button>
      </Flex>
    </Flex>
  );
};

export { MandataireOcmiMesureImport };
