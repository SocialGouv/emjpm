import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/containers/MesureContext";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";

import { MesureDeleteForm } from "./MesureDeleteForm";
import { CALCULATE_MESURES, DELETE_MESURE } from "./mutations";
import { MesureDeleteStyle } from "./style";

function MesureDelete(props) {
  const history = useHistory();
  const mesure = useContext(MesureContext);
  const { type, service = {}, mandataire } = useUser();
  const userBasePath = getUserBasePath({ type });

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) =>
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [deleteMesure] = useMutation(DELETE_MESURE, {
    onCompleted: async () => {
      history.push(`${userBasePath}/mesures`);
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          mandataireId: mandataire ? mandataire.id : null,
          serviceId: service ? service.id : null,
        },
      });
    },
  });

  const handleSubmit = async () => {
    await deleteMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["MESURES_QUERY"],
      variables: {
        id: mesure.id,
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
