import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { isMandataire, MESURE_PROTECTION_STATUS } from "@emjpm/core";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React, { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import { getUserBasePath } from "../../constants";
import { getLocation } from "../../query-service/LocationQueryService";
import { formatTribunauxOptions } from "../../util";
import { MesureContext } from "../MesureContext";
import { MESURES_QUERY } from "../MesureList/queries";
import { UserContext } from "../UserContext";
import { MesureCreateOrEditForm } from "./MesureCreateOrEditForm";
import { ADD_MESURE, CALCULATE_MESURES, EDIT_MESURE } from "./mutations";
import { MANDATAIRE_TRIBUNAL, SERVICE_TRIBUNAL } from "./queries";

export const MesureCreateOrEdit = (props) => {
  let mesureToEdit = useContext(MesureContext);
  const editMode = mesureToEdit && mesureToEdit.id ? true : false;
  if (!editMode) {
    mesureToEdit = null;
  }

  const client = useApolloClient();
  const currentUser = useContext(UserContext);

  const { service = {}, type, mandataire } = currentUser;
  const { service_antennes = [] } = service;

  const userBasePath = getUserBasePath({ type });

  const GET_TRIBUNAL = isMandataire({ type })
    ? MANDATAIRE_TRIBUNAL
    : SERVICE_TRIBUNAL;

  const ADD_OR_UPDATE_MESURE = editMode ? EDIT_MESURE : ADD_MESURE;

  const { loading, error, data } = useQuery(GET_TRIBUNAL);

  const tribunaux = useMemo(
    () => (data ? formatTribunauxOptions(data.tribunaux) : []),
    [data]
  );

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) =>
    Router.push(
      `${userBasePath}/mesures/[mesure_id]`,
      `${userBasePath}/mesures/${mesureId}`,
      {
        shallow: true,
      }
    );

  const [addOrUpdateMesure] = useMutation(ADD_OR_UPDATE_MESURE, {
    onCompleted: async ({ add_or_update }) => {
      const mesure = add_or_update.returning[0];
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

  if (loading) {
    return <Box p={1}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={1}>Erreur...</Box>;
  }

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

    if (editMode) {
      variables.id = mesureToEdit.id;
    }

    addOrUpdateMesure({
      awaitRefetchQueries: true,
      refetchQueries: [
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
        ...variables,
        annee_naissance: values.annee_naissance.toString(),
        antenne_id: values.antenne ? Number.parseInt(values.antenne) : null,
        cabinet: values.cabinet,
        champ_mesure: values.champ_mesure ? values.champ_mesure : null,
        civilite: values.civilite,
        date_nomination: values.date_nomination,
        lieu_vie: values.lieu_vie,
        nature_mesure: values.nature_mesure,
        numero_dossier: values.numero_dossier,
        numero_rg: values.numero_rg,
        pays: values.pays,
        ti_id: values.tribunal.value,
      },
    });

    setSubmitting(false);
  };

  const handleCancel = async () => {
    if (editMode) {
      redirectToMesure(mesureToEdit.id);
    } else {
      Router.push(userBasePath);
    }
  };

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  return (
    <Card m="1" mt="2" p="0">
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
              Ces informations nous permettent de vous présenter les mesures de
              mandataires les plus adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <MesureCreateOrEditForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            tribunaux={tribunaux}
            antenneOptions={antenneOptions}
            mesureToEdit={mesureToEdit}
            userBasePath={userBasePath}
          />
        </Box>
      </Flex>
    </Card>
  );
};
