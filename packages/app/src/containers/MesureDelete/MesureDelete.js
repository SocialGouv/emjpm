import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/containers/MesureContext";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";

import { MesureDeleteForm } from "./MesureDeleteForm";
import { DELETE_MESURE } from "./mutations";
import { MesureDeleteStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function MesureDelete(props) {
  const history = useHistory();
  const mesure = useContext(MesureContext);
  const { type, service = {}, mandataire } = useUser();
  const userBasePath = getUserBasePath({ type });

  const redirectToMesure = (mesureId) =>
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [deleteMesure, { loading, error }] = useMutation(DELETE_MESURE, {
    onCompleted: async () => {
      history.push(`${userBasePath}/mesures`);
    },
  });
  useQueryReady(loading, error);

  const handleSubmit = async () => {
    await deleteMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["CURRENT_USER_QUERY", "MESURES_QUERY"],
      variables: {
        id: mesure.id,
        mandataireId: mandataire ? mandataire.id : null,
        serviceId: service ? service.id : null,
      },
    });
  };

  function handleCancel() {
    redirectToMesure(mesure.id);
  }

  return (
    <Box sx={MesureDeleteStyle} {...props}>
      <MesureDeleteForm
        mt="3"
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export { MesureDelete };
