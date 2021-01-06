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

import { MesureCloseForm } from "./MesureCloseForm";
import { CALCULATE_MESURES, CLOSE_MESURE } from "./mutations";
import { MesureCloseStyle } from "./style";

const MesureClose = (props) => {
  const history = useHistory();
  const mesure = useContext(MesureContext);

  const currentUser = useContext(UserContext);

  const { service, type, mandataire } = currentUser;

  const userBasePath = getUserBasePath({ type });

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) => {
    history.push(
      `${userBasePath}/mesures/[mesure_id]`,
      `${userBasePath}/mesures/${mesureId}`,
      {
        shallow: true,
      }
    );
  };

  const [updateMesure] = useMutation(CLOSE_MESURE, {
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
      variables: {
        cause_sortie: values.cause_sortie,
        date_fin_mesure: values.date_fin_mesure,
        id: mesure.id,
      },
    });
    setSubmitting(false);
  };

  const handleCancel = () => {
    redirectToMesure(mesure.id);
  };

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
};

export { MesureClose };
