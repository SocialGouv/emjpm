import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React, { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import { getUserBasePath } from "../../constants";
import { getLocation } from "../../query-service/LocationQueryService";
import { formatTribunauxOptions, isMandataire } from "../../util";
import { UserContext } from "../UserContext";
import { MesureCreateForm } from "./MesureCreateForm";
import {
  ADD_MESURE,
  RECALCULATE_MANDATAIRE_MESURES,
  RECALCULATE_SERVICE_MESURES,
} from "./mutations";
import { SERVICE_TRIBUNAL, USER_TRIBUNAL } from "./queries";

export const MesureCreate = (props) => {
  const client = useApolloClient();
  const currentUser = useContext(UserContext);

  const { service = {}, type } = currentUser;
  const { service_antennes = [] } = service;

  const GET_TRIBUNAL = isMandataire(type) ? USER_TRIBUNAL : SERVICE_TRIBUNAL;
  const RECALCULATE_MESURES = isMandataire(type)
    ? RECALCULATE_MANDATAIRE_MESURES
    : RECALCULATE_SERVICE_MESURES;

  const { loading, error, data } = useQuery(GET_TRIBUNAL);

  const tribunaux = useMemo(() => (data ? formatTribunauxOptions(data.tribunaux) : []), [data]);

  const [recalculateMesures] = useMutation(RECALCULATE_MESURES);

  const [addMesure] = useMutation(ADD_MESURE, {
    onCompleted: async ({ insert_mesures }) => {
      const [mesure] = insert_mesures.returning;
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: { service_id: mesure.service_id, mandataire_id: mesure.mandataire_id },
      });
      await Router.push(
        `${getUserBasePath({ type })}/mesures/[mesure_id]`,
        `${getUserBasePath({ type })}/mesures/${mesure.id}`,
        {
          shallow: true,
        }
      );
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
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

    addMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["MESURES_QUERY"],
      variables: {
        ...variables,
        annee_naissance: values.annee_naissance.toString(),
        antenne_id: values.antenne ? Number.parseInt(values.antenne.value) : null,
        civilite: values.civilite.value,
        date_nomination: values.date_nomination,
        numero_dossier: values.numero_dossier,
        numero_rg: values.numero_rg,
        lieu_vie: values.lieu_vie.value,
        ti_id: values.tribunal.value,
        nature_mesure: values.nature_mesure.value,
        champ_mesure: values.champ_mesure ? values.champ_mesure.value : null,
        pays: values.country.value,
        cabinet: values.cabinet,
      },
    });

    setSubmitting(false);
  };

  if (loading) {
    return <Box p={1}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={1}>Erreur...</Box>;
  }

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap" {...props}>
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="280px">
            <Heading4>{`Informations générales`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre mesure`}
            </Text>
          </Box>
          <Box height="280px">
            <Heading4>{`Caractéristique de la mesure`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations nous permettent de vous présenter les mesures de mandataires les plus
              adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <MesureCreateForm
            handleSubmit={handleSubmit}
            tribunaux={tribunaux}
            antenneOptions={antenneOptions}
          />
        </Box>
      </Flex>
    </Card>
  );
};
