import { useMutation } from "@apollo/client";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/components/MesureContext";
import { MESURE_CONTEXT_QUERY } from "~/components/MesureContext/queries";
import { MESURES_QUERY } from "~/components/MesureList/queries";
import { UserContext } from "~/components/UserContext";
import { getUserBasePath } from "~/constants";

import { MesureReactivateForm } from "./MesureReactivateForm";
import { CALCULATE_MESURES, REACTIVATE_MESURE } from "./mutations";
import { MesureReactivateStyle } from "./style";

const MesureReactivate = () => {
  const history = useHistory();
  const mesure = useContext(MesureContext);
  const { type, service = {}, mandataire } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) =>
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [updateMesure] = useMutation(REACTIVATE_MESURE, {
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
  });

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
        {
          query: MESURES_QUERY,
          variables: {
            antenne: null,
            limit: 20,
            natureMesure: null,
            offset: 0,
            searchText: null,
            status: MESURE_PROTECTION_STATUS.eteinte,
          },
        },
      ],
      variables: {
        id: mesure.id,
      },
    });
  };

  const handleCancel = () => {
    redirectToMesure(mesure.id);
  };

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
};

export { MesureReactivate };
