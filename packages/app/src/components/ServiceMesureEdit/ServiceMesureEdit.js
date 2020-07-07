import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext, useMemo } from "react";
import { Box } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { formatTribunauxOptions } from "../../util";
import { MesureContext } from "../MesureContext";
import { EDIT_MESURE, RECALCULATE_SERVICE_MESURES } from "../ServiceMesures/mutations";
import { SERVICE, SERVICE_TRIBUNAL } from "../ServiceMesures/queries";
import { UserContext } from "../UserContext";
import { GET_SERVICE_USERS } from "../UserContext/queries";
import { ServiceMesureEditForm } from "./ServiceMesureEditForm";
import { ServiceMesureEditStyle } from "./style";

const ServiceMesureEdit = (props) => {
  const client = useApolloClient();
  const mesure = useContext(MesureContext);
  const { serviceId, id } = mesure;
  const { service_members, id: userId } = useContext(UserContext);
  const [
    {
      service: { service_antennes },
    },
  ] = service_members;

  const { loading, error, data } = useQuery(SERVICE_TRIBUNAL, {
    variables: { serviceId },
  });
  const tribunaux = useMemo(() => (data ? formatTribunauxOptions(data.service_tis) : []), [data]);
  const [recalculateServiceMesures] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: SERVICE,
        variables: { id: serviceId },
      },
      {
        query: GET_SERVICE_USERS,
        variables: {
          userId,
        },
      },
    ],
  });
  const [editMesure] = useMutation(EDIT_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesures({ variables: { service_id: serviceId } });
    },
  });

  if (loading) {
    return <Box p={1}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={1}>Erreur...</Box>;
  }

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <ServiceMesureEditForm
        mt="3"
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

          await editMesure({
            awaitRefetchQueries: true,
            variables: {
              ...variables,
              annee: values.annee,
              antenne_id: values.antenne_id ? values.antenne_id.value : null,
              civilite: values.civilite.value,
              date_ouverture: values.date_ouverture,
              id: id,
              numero_dossier: values.numero_dossier,
              numero_rg: values.numero_rg,
              lieu_vie: values.lieu_vie.value,
              ti_id: values.tribunal.value,
              type: values.type.value,
              pays: values.country.value,
              cabinet: values.cabinet,
            },
          });
          await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
            shallow: true,
          });
          setSubmitting(false);
        }}
        tribunaux={tribunaux}
        service_antennes={service_antennes}
        mesure={mesure}
      />
    </Box>
  );
};

export { ServiceMesureEdit };
