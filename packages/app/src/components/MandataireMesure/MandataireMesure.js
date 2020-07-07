import { Card, Heading2 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "../../components/Commons";
import { MesureContext, mesureFormatter } from "../MesureContext";
import { MESURE_TYPE } from "./constants";
import { content, statusBox, subtitle } from "./style";

export const MandataireMesure = (props) => {
  const {
    realAge,
    cabinet,
    civilite,
    dateOuvertureFormated,
    numeroDossier,
    numeroRg,
    lieuVie,
    status,
    tribunal,
    type,
    ville,
    pays,
    antenne,
    id,
  } = useContext(MesureContext);

  return (
    <Box {...props}>
      <Box textAlign="center">
        <Heading2 mb="3">{`Mesure ${numeroRg}`}</Heading2>
      </Box>

      <Card p={4}>
        <Box textAlign="center">
          <Text mx="auto" sx={statusBox}>
            {status}
          </Text>
        </Box>
        <Flex p="5">
          <Box flex="1">
            <Box mb={4}>
              <Text sx={subtitle}>Type de mesure</Text>
              <Text sx={content}>{type}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Lieu de vie du majeur</Text>
              <Text sx={content}>{mesureFormatter.formatLieuVie(lieuVie)}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Majeur protégé</Text>
              <Text sx={content}>{mesureFormatter.formatMajeurProtege(civilite, realAge)}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Commune</Text>
              <Text sx={content}>{ville}</Text>
            </Box>
            <Box mb={4}>
              <Text sx={subtitle}>Pays</Text>
              <Text sx={content}>{mesureFormatter.formatPays(pays)}</Text>
            </Box>
          </Box>

          <Box flex="1">
            <Box mb={4}>
              <Text sx={subtitle}>Tribunal</Text>
              <Text sx={content}>{tribunal}</Text>
            </Box>

            {antenne && (
              <Box mb={4}>
                <Text sx={subtitle}>Antenne</Text>
                <Text sx={content}>{antenne}</Text>
              </Box>
            )}

            {cabinet && (
              <Box mb={4}>
                <Text sx={subtitle}>Cabinet</Text>
                <Text sx={content}>{cabinet}</Text>
              </Box>
            )}

            <Box mb={4}>
              <Text sx={subtitle}>Decision du</Text>
              <Text sx={content}>{dateOuvertureFormated}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Numéro de dossier</Text>
              <Text sx={content}>{numeroDossier}</Text>
            </Box>
          </Box>
        </Flex>

        <Box textAlign="center">
          {status === MESURE_TYPE.WAITING && (
            <LinkButton
              outline={true}
              href="/mandataires/mesures/[mesure_id]/accept"
              asLink={`/mandataires/mesures/${id}/accept`}
            >
              Accepter la mesure
            </LinkButton>
          )}

          {status === MESURE_TYPE.CLOSED && (
            <Fragment>
              <LinkButton
                outline={true}
                bg="red"
                color="white"
                href="/mandataires/mesures/[mesure_id]/delete"
                asLink={`/mandataires/mesures/${id}/delete`}
              >
                Supprimer la mesure
              </LinkButton>
              <LinkButton
                ml={3}
                outline={true}
                href="/mandataires/mesures/[mesure_id]/reactivate"
                asLink={`/mandataires/mesures/${id}/reactivate`}
              >
                Réouvrir la mesure
              </LinkButton>
            </Fragment>
          )}

          {status === MESURE_TYPE.IN_PROGRESS && (
            <Fragment>
              <LinkButton
                bg="red"
                color="white"
                outline={true}
                href="/mandataires/mesures/[mesure_id]/close"
                asLink={`/mandataires/mesures/${id}/close`}
              >
                Cloturer la mesure
              </LinkButton>

              <LinkButton
                ml={3}
                outline={true}
                href="/mandataires/mesures/[mesure_id]/edit"
                asLink={`/mandataires/mesures/${id}/edit`}
              >
                Modifier la mesure
              </LinkButton>
            </Fragment>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default MandataireMesure;
