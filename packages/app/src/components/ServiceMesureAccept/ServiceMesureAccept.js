import { useApolloClient, useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { MesureContext } from "../MesureContext";
import { UserContext } from "../UserContext";
import { GET_SERVICE_USERS } from "../UserContext/queries";
import { ACCEPT_MESURE, RECALCULATE_SERVICE_MESURES } from "./mutations";
import { SERVICE } from "./queries";
import { ServiceMesureAcceptForm } from "./ServiceMesureAcceptForm";
import { ServiceMesureAcceptStyle } from "./style";

export const ServiceMesureAccept = (props) => {
  const { service_members, id } = useContext(UserContext);
  const [
    {
      service: { service_antennes },
    },
  ] = service_members;
  const mesure = useContext(MesureContext);
  const client = useApolloClient();

  const [recalculateServiceMesures] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: SERVICE,
        variables: { id: mesure.serviceId },
      },
      {
        query: GET_SERVICE_USERS,
        variables: { userId: id },
      },
    ],
  });
  const [updateMesure] = useMutation(ACCEPT_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesures({ variables: { service_id: mesure.serviceId } });
    },
  });

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <ServiceMesureAcceptForm
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const variables = {};

          if (values.country.value === "FR") {
            const location = await getLocation(client, {
              zipcode: values.zipcode,
              city: values.city,
            });

            if (!location || !location.department) {
              setErrors({
                zipcode: `Le code postal semble invalide.`,
              });
              return setSubmitting(false);
            } else {
              const { department, geolocation } = location;
              variables.code_postal = values.zipcode;
              variables.ville = values.city.toUpperCase();
              variables.latitude = geolocation ? geolocation.latitude : null;
              variables.longitude = geolocation ? geolocation.longitude : null;
              variables.department_id = department.id;
            }
          }

          await updateMesure({
            refetchQueries: ["mesures", "mesures_aggregate"],
            variables: {
              ...variables,
              antenne_id: values.antenne_id ? values.antenne_id.value : null,
              date_nomination: values.date_nomination,
              id: mesure.id,
              lieu_vie: values.lieu_vie.value,
              pays: values.country.value,
            },
          });

          await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${mesure.id}`);
          setSubmitting(false);
        }}
        mt="3"
        service_antennes={service_antennes}
        mesure={mesure}
      />
    </Box>
  );
};

export default ServiceMesureAccept;
