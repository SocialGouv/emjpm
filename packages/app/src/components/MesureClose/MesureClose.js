import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getUserBasePath } from "../../constants";
import { MesureContext } from "../MesureContext";
import { MESURE_CONTEXT_QUERY } from "../MesureContext/queries";
import { MESURES_QUERY } from "../MesureList/queries";
import { UserContext } from "../UserContext";
import { MesureCloseForm } from "./MesureCloseForm";
import { CALCULATE_MESURES, CLOSE_MESURE } from "./mutations";
import { MesureCloseStyle } from "./style";

const MesureClose = (props) => {
  const mesure = useContext(MesureContext);

  const currentUser = useContext(UserContext);

  const { service, type, mandataire } = currentUser;

  const userBasePath = getUserBasePath({ type });

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) => {
    Router.push(`${userBasePath}/mesures/[mesure_id]`, `${userBasePath}/mesures/${mesureId}`, {
      shallow: true,
    });
  };

  const [updateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted: async () => {
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          serviceId: service ? service.id : null,
          mandataireId: mandataire ? mandataire.id : null,
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
            limit: 20,
            offset: 0,
            searchText: null,
            status: MESURE_PROTECTION_STATUS.en_cours,
            natureMesure: null,
            antenne: null,
          },
        },
        {
          query: MESURES_QUERY,
          variables: {
            limit: 20,
            offset: 0,
            searchText: null,
            status: MESURE_PROTECTION_STATUS.eteinte,
            natureMesure: null,
            antenne: null,
          },
        },
      ],
      variables: {
        date_fin_mesure: values.date_fin_mesure,
        id: mesure.id,
        cause_sortie: values.cause_sortie,
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
