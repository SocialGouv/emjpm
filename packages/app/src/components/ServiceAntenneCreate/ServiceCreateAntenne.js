import { useMutation } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { ServiceAntenneForm } from "../ServiceAntenneForms";
import { CREATE_ANTENNE } from "./mutations";

const ServiceCreateAntenne = props => {
  const { service_admins, id } = props;
  const [currentUserService] = service_admins;
  const { service_id } = currentUserService;

  const [createAntenne] = useMutation(CREATE_ANTENNE, {
    update() {
      Router.push("/services/informations");
    }
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createAntenne({
        refetchQueries: ["service_antenne"],
        variables: {
          address_city: values.geocode.city,
          address: values.geocode.label,
          address_zip_code: values.geocode.postcode,
          latitude: values.geocode.latitude,
          longitude: values.geocode.latitude,
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
            <Heading4>{`Information de cette antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information de cette  antenne`}
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
              {` Ces informations permettent de renseigner les coordonnées de cette antenne.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <ServiceAntenneForm handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { ServiceCreateAntenne };
