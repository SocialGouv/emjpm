import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";

import { AntenneEditLinkButton } from "../Commons";
import { GET_SERVICES_ANTENNE } from "./queries";
import {
  boxStyle,
  flexStyle,
  iconTextStyle,
  innerTextStyle,
  titleStyle,
  topTextStyle
} from "./style";

const ServicesInformations = props => {
  const { antenne_id } = props;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    fetchPolicy: "cache-and-network",
    variables: {
      antenneId: antenne_id
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { service_antenne } = data;
  const [antenne] = service_antenne;
  return (
    <Box {...props}>
      <Card p="5">
        <Text sx={titleStyle}>Antenne</Text>
        <Heading3>{antenne.name}</Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5 mb="3">Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{antenne.contact_email || "Email non renseigné"}</Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>
                {antenne.contact_phone || "Numero de téléphone non renseigné"}
              </Text>
            </Flex>
            <Heading5 mt="5" mb="3">
              Informations
            </Heading5>
            <Text sx={topTextStyle}>{antenne.address_street}</Text>
            <Text sx={innerTextStyle}>{antenne.address_zip_code}</Text>
            <Text sx={innerTextStyle}>{antenne.address_city}</Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <AntenneEditLinkButton href={antenne_id}>
            {`Modifier les informations de l'antenne`}
          </AntenneEditLinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

ServicesInformations.defaultProps = {
  currentAntenne: null,
  user_antennes: []
};

ServicesInformations.propTypes = {
  currentAntenne: PropTypes.string,
  user_antennes: PropTypes.array
};

export { ServicesInformations };
