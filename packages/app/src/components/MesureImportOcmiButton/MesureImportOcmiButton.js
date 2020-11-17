import { useMutation } from "@apollo/react-hooks";
import { Sync } from "@styled-icons/boxicons-regular/Sync";
import React from "react";
import { Button } from "rebass";

import { IMPORT_OCMI_MESURES } from "./mutations";

const MesureImportOcmiButton = (props) => {
  const [importOcmiMesures] = useMutation(IMPORT_OCMI_MESURES);

  const importMesure = async () => {
    const res = await importOcmiMesures();
    console.log(res);
  };

  return (
    <Button
      {...props}
      onClick={importMesure}
      variant="outline"
      pt="0"
      pb="0"
      pl="1"
      pr="1"
      sx={{
        ":hover": {
          opacity: "0.7",
        },
      }}
    >
      <Sync size="24" />
    </Button>
  );
};

export { MesureImportOcmiButton };
