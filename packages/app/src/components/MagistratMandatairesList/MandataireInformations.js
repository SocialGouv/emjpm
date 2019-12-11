import { Heading3, Heading4, Heading5 } from "@socialgouv/emjpm-ui-core";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";

import { MagistratInformationsAntenne } from "./MagistratInformationsAntenne";
import { MandataireInformationsComment } from "./MandataireInformationsComment";
import { boxStyle, flexStyle, iconTextStyle, topTextStyle } from "./style";
const MandataireInformations = props => {
  const {
    serviceId,
    mandataireId,
    nom,
    prenom,
    telephone,
    email,
    ville,
    tis,
    adresse,
    codePostal,
    tiId,
    etablissement,
    lastLogin,
    lastLoginIsCritical
  } = props;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";

  return (
    <Fragment>
      {etablissement ? (
        <Fragment>
          <Heading3>{etablissement}</Heading3>
          <Heading4>{`${nom} ${prenom}`}</Heading4>
        </Fragment>
      ) : (
        <Heading3>{`${nom} ${prenom}`}</Heading3>
      )}
      <Flex sx={flexStyle}>
        <Box sx={boxStyle}>
          <Heading5>Contact</Heading5>
          <Flex mt="2">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>{email}</Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>{telephone}</Text>
          </Flex>
          <Heading5 mt="5">Adresse d’activité</Heading5>
          <Text sx={topTextStyle}>
            {adresse} {codePostal} {ville}
          </Text>
          <Heading5 mt="5">Dernière connexion</Heading5>
          <Text color={lastLoginColor} sx={topTextStyle}>
            {lastLogin}
          </Text>
        </Box>
        <Box sx={boxStyle}>
          <Heading5 mt="5">Tribunaux d’instance</Heading5>
          {tis.map(ti => {
            return (
              <Text key={ti.tis.id} sx={topTextStyle}>
                - {ti.tis.etablissement}
              </Text>
            );
          })}
        </Box>
        <MandataireInformationsComment
          tiId={tiId}
          serviceId={serviceId}
          mandataireId={mandataireId}
        />
        {serviceId && <MagistratInformationsAntenne {...props} />}
      </Flex>
    </Fragment>
  );
};

export { MandataireInformations };
