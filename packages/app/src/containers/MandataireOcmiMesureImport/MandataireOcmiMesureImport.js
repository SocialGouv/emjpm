import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import useUser from "~/hooks/useUser";
import MandataireOcmiMesureImportSwitcher from "./MandataireOcmiMesureImportSwitcher";

const StyledCheckCircleOutline = styled(CheckCircleOutline)`
  margin-right: 10px;
  color: green;
`;
const StyledWarning = styled(Warning)`
  margin-right: 10px;
  color: orange;
`;

function MandataireOcmiMesureImport() {
  const user = useUser();
  const mandataireId = user.mandataire.id;
  const syncEnableOrigin = user.mandataire.sync_ocmi_enable || null;
  return (
    <MandataireOcmiMesureImportSwitcher
      syncEnableOrigin={syncEnableOrigin}
      mandataireId={mandataireId}
    />
  );
}

export { MandataireOcmiMesureImport };
