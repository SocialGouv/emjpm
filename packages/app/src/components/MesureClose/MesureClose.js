import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getUserBasePath } from "../../constants";
import { isMandataire } from "../../util";
import { MesureContext } from "../MesureContext";
import { MESURES_QUERY } from "../MesureList/queries";
import { UserContext } from "../UserContext";
import { MesureCloseForm } from "./MesureCloseForm";
import {
  CLOSE_MESURE,
  RECALCULATE_MANDATAIRE_MESURES,
  RECALCULATE_SERVICE_MESURES,
} from "./mutations";
import { MesureCloseStyle } from "./style";

const MesureClose = (props) => {
  const mesure = useContext(MesureContext);

  const currentUser = useContext(UserContext);

  const { service, type, mandataire } = currentUser;

  const userBasePath = getUserBasePath({ type });

  const RECALCULATE_MESURES = isMandataire(type)
    ? RECALCULATE_MANDATAIRE_MESURES
    : RECALCULATE_SERVICE_MESURES;

  const [recalculateMesures] = useMutation(RECALCULATE_MESURES);

  const [updateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted: async () => {
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          service_id: service ? service.id : null,
          mandataire_id: mandataire ? mandataire.id : null,
        },
      });
      Router.push(`${userBasePath}/mesures/[mesure_id]`, `${userBasePath}/mesures/${mesure.id}`, {
        shallow: true,
      });
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await updateMesure({
      awaitRefetchQueries: true,
      refetchQueries: [
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
            status: MESURE_PROTECTION_STATUS.en_attente,
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

  return (
    <Box sx={MesureCloseStyle} {...props}>
      <MesureCloseForm
        mt="3"
        mesure={mesure}
        handleSubmit={handleSubmit}
        userBasePath={userBasePath}
      />
    </Box>
  );
};

export { MesureClose };
