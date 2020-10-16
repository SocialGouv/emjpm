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
import { MesureDeleteForm } from "./MesureDeleteForm";
import {
  DELETE_MESURE,
  RECALCULATE_MANDATAIRE_MESURES,
  RECALCULATE_SERVICE_MESURES,
} from "./mutations";
import { MesureDeleteStyle } from "./style";

const MesureDelete = (props) => {
  const mesure = useContext(MesureContext);
  const { type, service = {}, mandataire } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  const RECALCULATE_MESURES = isMandataire(type)
    ? RECALCULATE_MANDATAIRE_MESURES
    : RECALCULATE_SERVICE_MESURES;

  const [recalculateMesures] = useMutation(RECALCULATE_MESURES);

  const [deleteMesure] = useMutation(DELETE_MESURE, {
    onCompleted: async () => {
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          service_id: service ? service.id : null,
          mandataire_id: mandataire ? mandataire.id : null,
        },
      });
    },
  });

  const handleSubmit = async () => {
    await deleteMesure({
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
        id: mesure.id,
      },
    });

    Router.push(userBasePath);
  };

  return (
    <Box sx={MesureDeleteStyle} {...props}>
      <MesureDeleteForm mt="3" userBasePath={userBasePath} handleSubmit={handleSubmit} />
    </Box>
  );
};

export { MesureDelete };
