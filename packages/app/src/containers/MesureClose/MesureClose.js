import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/containers/MesureContext";
import { MESURE_CONTEXT_QUERY } from "~/containers/MesureContext/queries";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";

import { MesureCloseForm } from "./MesureCloseForm";
import { CALCULATE_MESURES, CLOSE_MESURE } from "./mutations";
import { MesureCloseStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function MesureClose(props) {
  const history = useHistory();
  const mesure = useContext(MesureContext);

  const currentUser = useUser();

  const { service, type, mandataire } = currentUser;

  const userBasePath = getUserBasePath({ type });

  const [
    recalculateMesures,
    { loading: loading1, error: error1 },
  ] = useMutation(CALCULATE_MESURES);
  useQueryReady(loading1, error1);
  function redirectToMesure(mesureId) {
    history.push(`${userBasePath}/mesures/${mesureId}`);
  }

  const [updateMesure, { loading: loading2, error: error2 }] = useMutation(
    CLOSE_MESURE,
    {
      onCompleted: async () => {
        await recalculateMesures({
          refetchQueries: ["CURRENT_USER_QUERY"],
          variables: {
            mandataireId: mandataire ? mandataire.id : null,
            serviceId: service ? service.id : null,
          },
        });
        redirectToMesure(mesure.id);
      },
    }
  );
  useQueryReady(loading2, error2);

  const handleSubmit = async (values, { setSubmitting }) => {
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
        cause_sortie: values.cause_sortie,
        date_fin_mesure: values.date_fin_mesure,
        id: mesure.id,
      },
    });
    setSubmitting(false);
  };

  function handleCancel() {
    redirectToMesure(mesure.id);
  }

  return (
    <Box sx={MesureCloseStyle} {...props}>
      <MesureCloseForm
        mt="3"
        mesure={mesure}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        userBasePath={userBasePath}
      />
    </Box>
  );
}

export { MesureClose };
