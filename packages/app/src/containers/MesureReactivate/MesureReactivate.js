import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/containers/MesureContext";
import { MESURE_CONTEXT_QUERY } from "~/containers/MesureContext/queries";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";

import { MesureReactivateForm } from "./MesureReactivateForm";
import { REACTIVATE_MESURE } from "./mutations";
import { MesureReactivateStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function MesureReactivate() {
  const history = useHistory();
  const mesure = useContext(MesureContext);
  const { type, service = {}, mandataire } = useUser();
  const userBasePath = getUserBasePath({ type });

  const redirectToMesure = (mesureId) =>
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [updateMesure, { loading: loading1, error: error1 }] = useMutation(
    REACTIVATE_MESURE,
    {
      refetchQueries: ["CURRENT_USER_QUERY"],
      variables: {
        mandataireId: mandataire ? mandataire.id : null,
        serviceId: service ? service.id : null,
      },
      onCompleted: () => {
        redirectToMesure(mesure.id);
      },
    }
  );
  useQueryReady(loading1, error1);

  const handleSubmit = async () => {
    await updateMesure({
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: MESURE_CONTEXT_QUERY,
          variables: {
            id: mesure.id,
          },
        },
        "MESURES_QUERY",
      ],
      variables: {
        id: mesure.id,
      },
    });
  };

  function handleCancel() {
    redirectToMesure(mesure.id);
  }

  return (
    <Box sx={MesureReactivateStyle}>
      <MesureReactivateForm
        mt="3"
        mesure={mesure}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Box>
  );
}

export { MesureReactivate };
