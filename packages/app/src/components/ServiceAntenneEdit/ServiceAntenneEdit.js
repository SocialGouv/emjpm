import { useMutation } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import Sentry from "../../util/sentry";
import { ServiceAntenneForm } from "../ServiceAntenneForms";
import { EDIT_ANTENNE } from "./mutations";

const ServiceAntenneEdit = props => {
  const { user, antenneId } = props;
  const { service_members } = user;
  const [{ service }] = service_members;
  const { service_antennes } = service;
  const [antenne] = service_antennes.filter(s => s.id === antenneId);

  const [editAntenne] = useMutation(EDIT_ANTENNE);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await editAntenne({
        refetchQueries: ["service_antenne"],
        variables: {
          antenne_id: antenneId,
          address_city: values.geocode.city,
          address: values.geocode.label,
          address_zip_code: values.geocode.postcode,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          contact_email: values.contact_email,
          contact_firstname: values.contact_firstname,
          contact_lastname: values.contact_lastname,
          contact_phone: values.contact_phone,
          mesures_max: values.mesures_max,
          name: values.name,
          service_id: service.id,
          user_id: user.id
        }
      });
    } catch (error) {
      Sentry.captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
    Router.push("/services/antennes/[antenne_id]", `/services/antennes/${antenneId}`, {
      shallow: true
    });
  };

  return (
    <Card m="1" mt="5" p="5">
      <Flex flexWrap="wrap">
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="80px">
            <Heading4>{`Information de cette  antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information de cette antenne`}
            </Text>
          </Box>
          <Box height="220px">
            <Heading4>{`Information du responsable`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent d'identifier la personne en charge de cette antenne.`}
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Contact de l'antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent de renseigner les coordonnées de cette antenne.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" mb="2" width={[1, 3 / 5]}>
          <ServiceAntenneForm antenne={antenne} handleSubmit={handleSubmit} />
        </Box>
      </Flex>
    </Card>
  );
};

export { ServiceAntenneEdit };
