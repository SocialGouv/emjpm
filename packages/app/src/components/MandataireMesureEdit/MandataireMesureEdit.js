import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext, useMemo } from "react";
import { Box } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { formatTribunauxOptions } from "../../util";
import { MesureContext } from "../MesureContext";
import { UserContext } from "../UserContext";
import { MandataireMesureEditForm } from "./MandataireMesureEditForm";
import { EDIT_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";
import { MANDATAIRE, USER_TRIBUNAL } from "./queries";
import { ServiceMesureEditStyle } from "./style";

const MandataireMesureEdit = (props) => {
  const client = useApolloClient();

  const user = useContext(UserContext);
  const mesure = useContext(MesureContext);

  const { id, mandataireId } = mesure;

  const { loading, error, data } = useQuery(USER_TRIBUNAL, {
    variables: {
      id: user.id,
    },
  });

  const tribunaux = useMemo(() => (data ? formatTribunauxOptions(data.user_tis) : []), [data]);
  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES);
  const [editMesure] = useMutation(EDIT_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({
        variables: {
          mandataire_id: mandataireId,
        },
      });
    },
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mesure.mandataireId },
      },
    ],
  });

  if (loading) {
    return <Box p={1}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={1}>Erreur...</Box>;
  }

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <MandataireMesureEditForm
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
            refetchQueries: ["mesures", "mesures_aggregate", "user_tis", "ti"],
            variables: {
              ...variables,
              annee: values.annee,
              civilite: values.civilite.value,
              date_ouverture: values.date_ouverture,
              id,
              numero_dossier: values.numero_dossier,
              numero_rg: values.numero_rg,
              lieu_vie: values.lieu_vie.value,
              ti_id: values.tribunal.value,
              type: values.type.value,
              pays: values.country.value,
              cabinet: values.cabinet,
            },
          });

          setSubmitting(false);
          await Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${id}`, {
            shallow: true,
          });
        }}
        mt="3"
        tribunaux={tribunaux}
        mesure={mesure}
      />
    </Box>
  );
};

export { MandataireMesureEdit };
