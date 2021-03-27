import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";

import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import { SYNC_OCMI_ENABLED } from "./queries";

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

  const { data, error, loading } = useQuery(SYNC_OCMI_ENABLED, {
    variables: {
      mandataireId,
    },
  });
  if (!useQueryReady(loading, error)) {
    return null;
  }
  const syncEnableOrigin = data.mandataires_by_pk.sync_ocmi_enable || null;
  return (
    <MandataireOcmiMesureImportSwitcher
      syncEnableOrigin={syncEnableOrigin}
      mandataireId={mandataireId}
    />
  );
}

export { MandataireOcmiMesureImport };
