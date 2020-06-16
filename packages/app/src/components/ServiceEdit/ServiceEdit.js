import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import Sentry from "../../util/sentry";
import { EDIT_ANTENNE } from "./mutations";
import { GET_SERVICES } from "./queries";
import { ServiceEditForm } from "./ServiceEditForm";

const ServiceEdit = () => {
  const { data, error, loading } = useQuery(GET_SERVICES);

  const [editAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/informations", `/services/informations`, {
        shallow: true,
      });
    },
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
      await editAntenne({
        refetchQueries: ["Service", "users"],
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          competences: values.competences,
          dispo_max: values.dispo_max,
          email: values.email,
          etablissement: values.etablissement,
          nom: values.nom,
          prenom: values.prenom,
          service_id: service.id,
          telephone: values.telephone,
          ville: values.geocode.city,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
        },
      });
    } catch (error) {
      Sentry.captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
  };

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap">
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
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
