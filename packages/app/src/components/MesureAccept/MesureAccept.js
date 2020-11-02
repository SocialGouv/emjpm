import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getUserBasePath } from "../../constants";
import { getLocation } from "../../query-service/LocationQueryService";
import { MesureContext } from "../MesureContext";
import { MESURE_CONTEXT_QUERY } from "../MesureContext/queries";
import { MESURES_QUERY } from "../MesureList/queries";
import { UserContext } from "../UserContext";
import { MesureAcceptForm } from "./MesureAcceptForm";
import { ACCEPT_MESURE, CALCULATE_MESURES } from "./mutations";
import { MesureAcceptStyle } from "./style";

export const MesureAccept = (props) => {
  const client = useApolloClient();

  const mesure = useContext(MesureContext);
  const currentUser = useContext(UserContext);

  const { service = {}, type } = currentUser;
  const { service_antennes = [] } = service;
  const { mandataireId, serviceId, id } = mesure;

  const userBasePath = getUserBasePath({ type });

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) => {
    Router.push(
      `${userBasePath}/mesures/[mesure_id]`,
      `${userBasePath}/mesures/${mesureId}`,
      {
        shallow: true,
      }
    );
  };

  const [updateMesure] = useMutation(ACCEPT_MESURE, {
    onCompleted: async () => {
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: { mandataireId, serviceId },
      });
      redirectToMesure(mesure.id);
    },
  });

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {};

    if (values.pays === "FR") {
      const location = await getLocation(client, {
        city: values.ville,
        zipcode: values.code_postal,
      });

      if (!location || !location.department) {
        setErrors({
          zipcode: `Le code postal semble invalide.`,
        });
        return setSubmitting(false);
      } else {
        const { department, geolocation } = location;
        variables.code_postal = values.code_postal;
        variables.ville = values.ville.toUpperCase();
        variables.latitude = geolocation ? geolocation.latitude : null;
        variables.longitude = geolocation ? geolocation.longitude : null;
        variables.department_id = department.id;
      }
    }

    await updateMesure({
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
            status: MESURE_PROTECTION_STATUS.en_attente,
          },
        },
      ],
      variables: {
        ...variables,
        antenne_id: values.antenne ? Number.parseInt(values.antenne) : null,
        date_nomination: values.date_nomination,
        id,
        lieu_vie: values.lieu_vie,
        pays: values.pays,
      },
    });
    setSubmitting(false);
  };

  const handleCancel = () => {
    redirectToMesure(mesure.id);
  };

  return (
    <Box sx={MesureAcceptStyle} {...props}>
      <MesureAcceptForm
        antenneOptions={antenneOptions}
        userBasePath={userBasePath}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mt="3"
        mesure={mesure}
      />
    </Box>
  );
};

export default MesureAccept;
