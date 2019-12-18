import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { EDIT_ANTENNE } from "./mutations";
import { GET_SERVICES } from "./queries";
import { ServiceEditForm } from "./ServiceEditForm";

const ServiceEdit = () => {
  const { data, error, loading } = useQuery(GET_SERVICES);

  const [createAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/informations", `/services/informations`, {
        shallow: true
      });
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const [service] = data.services;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createAntenne({
        refetchQueries: ["Service"],
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.code_postal,
          dispo_max: values.dispo_max,
          email: values.email,
          etablissement: values.etablissement,
          information: values.information,
          nom: values.nom,
          prenom: values.prenom,
          service_id: service.id,
          telephone: values.telephone,
          ville: values.geocode.ville,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude
        }
      });
    } catch (error) {
      // TODO(paullaunay): log in sentry and handle in form
    }

    setSubmitting(false);
  };

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap">
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="80px">
            <Heading4>{`Information de votre service`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information du service`}
            </Text>
          </Box>
          <Box height="220px">
            <Heading4>{`Information du responsable`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent d'identifier la personne en charge de ce service.`}
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Contact du service`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent de renseigner les coordonnées de ce service.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <ServiceEditForm handleSubmit={handleSubmit} service={service} />
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { ServiceEdit };
