import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import { Sync } from "@styled-icons/boxicons-regular/Sync";
import React from "react";
import { Button } from "rebass";

import { MESURES_QUERY } from "~/components/MesureList/queries";

import { IMPORT_OCMI_MESURES } from "./mutations";

const MesureImportOcmiButton = (props) => {
  const [importOcmiMesures] = useMutation(IMPORT_OCMI_MESURES);

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
