import { useMutation } from "@apollo/react-hooks";
import { Export } from "@styled-icons/boxicons-regular/Export";
import React, { useContext } from "react";
import { Box, Button, Flex } from "rebass";

import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { EXPORT_MESURES_EXCEL_FILE } from "./mutations";

const MandataireMesuresButtonBar = () => {
  const { id: userId } = useContext(UserContext);

  const [exportMesure] = useMutation(EXPORT_MESURES_EXCEL_FILE);

  const exportMesuresToExcel = async () => {
    const res = await exportMesure({
      variables: {
        mandataireUserId: userId,
      },
    });
    console.log(res);
  };

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton href="/mandataires/add-mesures">Ajouter une mesure</LinkButton>
        </Box>
        <Box ml={1}>
          <LinkButton href="/mandataires/import-mesures">Importez vos mesures</LinkButton>
        </Box>
        <Button
          onClick={exportMesuresToExcel}
          ml="1"
          mr="2"
          pt="0"
          pb="0"
          pl="1"
          pr="1"
          variant="outline"
          sx={{
            ":hover": {
              opacity: "0.7",
            },
          }}
        >
          <Export size="24" />
        </Button>
      </Flex>
    </Box>
  );
};

export { MandataireMesuresButtonBar };
