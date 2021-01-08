import { useMutation } from "@apollo/client";
import { Export } from "@styled-icons/boxicons-regular/Export";
import { useContext } from "react";
import { Button } from "rebass";

import { UserContext } from "~/components/UserContext";
import { b64toBlob } from "~/util/base64/b64toBlob";

import { EXPORT_MESURES_EXCEL_FILE } from "./mutations";

const downloadMesuresFile = async (b64Data) => {
  const element = document.createElement("a");
  const file = b64toBlob(b64Data);
  element.href = URL.createObjectURL(file);
  element.download = `export_mesures_${new Date().toISOString()}.xlsx`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

const MesureExportExcelButton = (props) => {
  const { id: userId, service_members = [] } = useContext(UserContext);
  const [service_member] = service_members;
  const service = service_member ? service_member.service : undefined;

  const [exportMesure] = useMutation(EXPORT_MESURES_EXCEL_FILE);

  const exportMesuresToExcel = async () => {
    const res = await exportMesure({
      variables: {
        mandataireUserId: userId,
        serviceId: service ? service.id : undefined,
      },
    });
    downloadMesuresFile(res.data.export_mesures_file.data);
  };

  return (
    <Button
      {...props}
      onClick={exportMesuresToExcel}
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
      <Export size="24" />
    </Button>
  );
};

export { MesureExportExcelButton };
