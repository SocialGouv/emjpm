import { useMutation } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { ServiceAntenneForm } from "../ServiceAntenneForms";
import { EDIT_ANTENNE } from "./mutations";

const ServiceEditAntenne = props => {
  const { service_admins, id, antenneId, user_antennes } = props;
  const [{ service_id }] = service_admins;

  const [{ service_antenne: antenne }] = user_antennes.filter(
    ({ antenne_id }) => antenneId === antenne_id
  );

  const [editAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/antennes/[antenne_id]", `/services/antennes/${antenneId}`, {
        shallow: true
      });
    }
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await editAntenne({
        refetchQueries: ["service_antenne"],
        variables: {
          address_city: values.geocode.city,
          address: values.geocode.label,
          address_zip_code: values.geocode.postcode,
          latitude: values.geocode.lat,
          longitude: values.geocode.lng,
          contact_email: values.contact_email,
          contact_firstname: values.contact_firstname,
          contact_lastname: values.contact_lastname,
          contact_phone: values.contact_phone,
          mesures_max: values.mesures_max,
          name: values.name,
          service_id: service_id,
          user_id: id
        }
      });
    } catch (error) {
      // TODO(paullaunay): log in sentry and handle in form
    }

    setSubmitting(false);
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
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <ServiceAntenneForm antenne={antenne} handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { ServiceEditAntenne };
