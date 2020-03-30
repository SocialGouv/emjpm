import { Card, Heading2, Heading3 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { COUNTRIES } from "../../constants/mesures";
import { MesureContext } from "../MesureContext";
import { boxStyle, content, flexStyle, statusStyle, subtitle } from "./style";

const ServiceMesure = props => {
  const {
    realAge,
    cabinet,
    civilite,
    dateOuvertureFormated,
    numeroDossier,
    numeroRg,
    residence,
    status,
    tribunal,
    type,
    ville,
    pays,
    antenne
  } = useContext(MesureContext);

  return (
    <Box {...props}>
      <Card p="5">
        <Heading2 mb="3">Informations de votre mesure</Heading2>
        <Heading3>{numeroRg}</Heading3>
        <Text sx={statusStyle(status)}>{status}</Text>
        <Text sx={content}>{tribunal}</Text>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            {civilite && (
              <Fragment>
                <Text sx={subtitle}>Civilité</Text>
                {civilite === "F" ? (
                  <Text sx={content}>Femme</Text>
                ) : (
                  <Text sx={content}>Homme</Text>
                )}
              </Fragment>
            )}
            <Text sx={subtitle}>Type de mesure</Text>
            <Text sx={content}>{type}</Text>
            <Text sx={subtitle}>Commune</Text>
            <Text sx={content}>{ville}</Text>
            <Text sx={subtitle}>Pays</Text>
            <Text sx={content}>{COUNTRIES[pays]}</Text>
            <Text sx={subtitle}>Age</Text>
            <Text sx={content}>{`${realAge} ans`}</Text>
          </Box>
          <Box sx={boxStyle}>
            <Text sx={subtitle}>Type de résidence</Text>
            <Text sx={content}>{residence}</Text>
            <Text sx={subtitle}>Decision du</Text>
            <Text sx={content}>{dateOuvertureFormated}</Text>
            <Text sx={subtitle}>Numéro de dossier</Text>
            <Text sx={content}>{numeroDossier}</Text>
            {cabinet && (
              <Fragment>
                <Text sx={subtitle}>Cabinet</Text>
                <Text sx={content}>{cabinet}</Text>
              </Fragment>
            )}
            {antenne && (
              <Fragment>
                <Text sx={subtitle}>Antenne</Text>
                <Text sx={content}>{antenne}</Text>
              </Fragment>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export { ServiceMesure };
