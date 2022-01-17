import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";
import { Helmet } from "react-helmet";
import { mesureFormatter } from "@emjpm/biz";

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

  const [updateMesure, { loading, error }] = useMutation(REACTIVATE_MESURE, {
    onCompleted: () => {
      redirectToMesure(mesure.id);
    },
  });
  useQueryReady(loading, error);

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
        "CURRENT_USER_QUERY",
      ],
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

  const { formatNatureMesure, formatChampMesure } = mesureFormatter;

  return (
    <>
      <Helmet>
        <title>
          Réactiver la mesure {formatNatureMesure(mesure.natureMesure)}{" "}
          {formatChampMesure(mesure.champMesure)} | e-MJPM | e-MJPM
        </title>
      </Helmet>
      <Box sx={MesureReactivateStyle}>
        <MesureReactivateForm
          mt="3"
          mesure={mesure}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Box>
    </>
  );
}

export { MesureReactivate };
