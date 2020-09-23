import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { MANDATAIRE_MESURES } from "../MandataireMesures/queries";
import { MesureContext } from "../MesureContext";
import { MandataireMesureAcceptForm } from "./MandataireMesureAcceptForm";
import { ACCEPT_MESURE, MANDATAIRE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";
import { ServiceMesureAcceptStyle } from "./style";

export const MandataireMesureAccept = (props) => {
  const client = useApolloClient();
  const mesure = useContext(MesureContext);
  const { mandataireId, id } = mesure;

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES, {
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mandataireId },
      },
    ],
  });

  const [updateMesure] = useMutation(ACCEPT_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({ variables: { mandataire_id: mandataireId } });
    },
  });

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <MandataireMesureAcceptForm
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
            refetchQueries: [
              {
                query: MANDATAIRE_MESURES,
                variables: {
                  limit: 20,
                  offset: 0,
                  searchText: null,
                  status: MESURE_PROTECTION_STATUS.en_cours,
                  natureMesure: null,
                },
              },
              {
                query: MANDATAIRE_MESURES,
                variables: {
                  limit: 20,
                  offset: 0,
                  searchText: null,
                  status: MESURE_PROTECTION_STATUS.en_attente,
                  natureMesure: null,
                },
              },
            ],
            variables: {
              ...variables,
              date_nomination: values.date_nomination,
              id,
              lieu_vie: values.lieu_vie.value,
              pays: values.country.value,
            },
          });

          setSubmitting(false);
          await Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${id}`, {
            shallow: true,
          });
        }}
        mt="3"
        mesure={mesure}
      />
    </Box>
  );
};

export default MandataireMesureAccept;
