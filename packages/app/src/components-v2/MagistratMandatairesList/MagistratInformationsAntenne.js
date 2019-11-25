import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading3, Heading4, Heading5, Spinner } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";

import { SERVICE_ANTENNES } from "./queries";
import { boxStyle, iconTextStyle, topTextStyle } from "./style";

const MagistratInformationsAntenne = props => {
  const { serviceId } = props;
  const { data, error, loading } = useQuery(SERVICE_ANTENNES, {
    variables: {
      serviceId: serviceId
    }
  });

  const [isOpen, toggleAntennes] = useState(false);

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { service_antenne } = data;
  if (service_antenne.length < 1) {
    return null;
  }
  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Heading3>Liste des antennes du service</Heading3>
      <Button
        variant="outline"
        my="2"
        onClick={() => {
          toggleAntennes(!isOpen);
        }}
      >
        {isOpen ? (
          <Fragment>Fermer les informations des antennes</Fragment>
        ) : (
          <Fragment>Afficher les informations des antennes</Fragment>
        )}
      </Button>
      {isOpen && (
        <Box
          css={{
            display: "grid",
            gridGap: "1%",
            gridTemplateColumns: "repeat(auto-fit, minmax(24%, 49%))"
          }}
        >
          {service_antenne.map(antenne => {
            return (
              <Card sx={boxStyle} bg="white" key={antenne.id}>
                <Heading4>{antenne.name}</Heading4>
                <Text sx={topTextStyle}>
                  {antenne.contact_lastname} {antenne.contact_firstname}
                </Text>
                <Heading5 mt="1">Adresse d’activité</Heading5>
                <Text sx={topTextStyle}>
                  {antenne.address_street} {antenne.address_zip_code} {antenne.address_city}
                </Text>
                <Flex mt="2">
                  <MailOutline size="16" />
                  <Text sx={iconTextStyle}>{antenne.contact_email}</Text>
                </Flex>
                <Flex mt="1">
                  <Smartphone size="16" />
                  <Text sx={iconTextStyle}>{antenne.contact_phone}</Text>
                </Flex>
                <Heading5 mt="1">Mesures en attente</Heading5>
                <Text sx={topTextStyle}>{antenne.mesures_awaiting}</Text>
                <Heading5 mt="1">Disponibilité maximum</Heading5>
                <Text sx={topTextStyle}>{antenne.mesures_max}</Text>
                <Heading5 mt="1">Disponibilité actuelle</Heading5>
                <Text sx={topTextStyle}>{antenne.mesures_in_progress}</Text>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

MagistratInformationsAntenne.propTypes = {
  serviceId: PropTypes.number
};
export { MagistratInformationsAntenne };
