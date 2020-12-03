import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import { Card, Heading4, Text } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { MESURE_CONTEXT_QUERY } from "../MesureContext/queries";
import { MESURES_QUERY } from "../MesureList/queries";
import { MesureEtatCreateOrEditForm } from "./MesureEtatCreateOrEditForm";
import { ADD_MESURE_ETAT, EDIT_MESURE_ETAT } from "./mutations";

export const MesureEtatCreateOrEdit = ({
  mesure,
  mesureEtat,
  onSuccess,
  ...props
}) => {
  const editMode = mesureEtat && mesureEtat.id ? true : false;
  if (!editMode) {
    mesureEtat = null;
  }

  const client = useApolloClient();

  const ADD_OR_UPDATE_MESURE_ETAT = editMode
    ? EDIT_MESURE_ETAT
    : ADD_MESURE_ETAT;

  const [addOrUpdateMesureEtat] = useMutation(ADD_OR_UPDATE_MESURE_ETAT, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {
      mesure_id: mesure.id,
    };

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
      variables.id = mesureEtat.id;
    }

    addOrUpdateMesureEtat({
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
        {
          query: MESURE_CONTEXT_QUERY,
          variables: {
            id: mesure.id,
          },
        },
      ],
      variables: {
        ...variables,
        champ_mesure: values.champ_mesure ? values.champ_mesure : null,
        date_changement_etat: values.date_changement_etat,
        lieu_vie: values.lieu_vie,
        nature_mesure: values.nature_mesure,
        pays: values.pays,
        type_etablissement: values.type_etablissement
          ? values.type_etablissement
          : null,
      },
    });

    setSubmitting(false);
  };

  const handleCancel = async () => {};

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
          <MesureEtatCreateOrEditForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            mesureEtatToEdit={mesureEtat}
          />
        </Box>
      </Flex>
    </Card>
  );
};
