import { useMutation } from "@apollo/react-hooks";
import { Export } from "@styled-icons/boxicons-regular/Export";
import React, { useContext } from "react";
import { Box, Button, Flex } from "rebass";
import { b64toBlob } from "../../util/base64/b64toBlob";
import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { EXPORT_MESURES_EXCEL_FILE } from "./mutations";

const downloadMesuresFile = async (b64Data) => {
  const element = document.createElement("a");
  const file = b64toBlob(b64Data);
  element.href = URL.createObjectURL(file);
  element.download = `export_mesures_${new Date().toISOString()}.xlsx`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

const ServiceMesuresButtonBar = () => {
  const { service_members } = useContext(UserContext);
  const [{ service }] = service_members;

  const [exportMesure] = useMutation(EXPORT_MESURES_EXCEL_FILE);

  const exportMesuresToExcel = async () => {
    const res = await exportMesure({
      variables: {
        serviceId: service.id,
      },
    });
    downloadMesuresFile(res.data.export_mesures_file.data);
  };

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton href="/services/add-mesures">Ajouter une mesure</LinkButton>
        </Box>
        <Box ml={1}>
          <LinkButton href="/services/import-mesures">Importez vos mesures</LinkButton>
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

export { ServiceMesuresButtonBar };
