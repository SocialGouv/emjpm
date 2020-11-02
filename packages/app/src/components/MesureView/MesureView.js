import { MESURE_PROTECTION_STATUS, mesureFormatter } from "@emjpm/core";
import { Card, Heading2 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { getUserBasePath } from "../../constants";
import { LinkButton } from "../Commons";
import { MesureContext } from "../MesureContext";
import { UserContext } from "../UserContext";
import { content, statusBox, subtitle } from "./style";

export const MesureView = (props) => {
  const {
    realAge,
    cabinet,
    civilite,
    dateNominationFormated,
    numeroDossier,
    numeroRg,
    lieuVie,
    status,
    tribunal,
    natureMesure,
    champMesure,
    ville,
    pays,
    antenne,
    id,
  } = useContext(MesureContext);

  const { type } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  return (
    <Box {...props}>
      <Box textAlign="center">
        <Heading2 mb="3">{`Mesure ${numeroRg}`}</Heading2>
      </Box>

      <Card p={4}>
        <Box textAlign="center">
          <Text mx="auto" sx={statusBox}>
            {mesureFormatter.formatStatus(status)}
          </Text>
        </Box>
        <Flex p="5">
          <Box flex="1">
            <Box mb={4}>
              <Text sx={subtitle}>Nature de la mesure</Text>
              <Text sx={content}>
                {mesureFormatter.formatNatureMesure(natureMesure)}
              </Text>
            </Box>
            <Box mb={4}>
              <Text sx={subtitle}>Champ de la mesure</Text>
              <Text sx={content}>
                {mesureFormatter.formatChampMesure(champMesure)}
              </Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Lieu de vie du majeur</Text>
              <Text sx={content}>{mesureFormatter.formatLieuVie(lieuVie)}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Majeur protégé</Text>
              <Text sx={content}>
                {mesureFormatter.formatMajeurProtege(civilite, realAge)}
              </Text>
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
              <Text sx={content}>{dateNominationFormated}</Text>
            </Box>

            {antenne && (
              <Box mb={4}>
                <Text sx={subtitle}>Antenne</Text>
                <Text sx={content}>{antenne}</Text>
              </Box>
            )}

            <Box mb={4}>
              <Text sx={subtitle}>Numéro de dossier</Text>
              <Text sx={content}>{numeroDossier}</Text>
            </Box>
          </Box>
        </Flex>

        <Box textAlign="center">
          <LinkButton
            outline={true}
            mr={3}
            bg="red"
            color="white"
            href={`${userBasePath}/mesures/[mesure_id]/delete`}
            asLink={`${userBasePath}/mesures/${id}/delete`}
          >
            Supprimer la mesure
          </LinkButton>

          {status === MESURE_PROTECTION_STATUS.en_attente && (
            <LinkButton
              outline={true}
              href={`${userBasePath}/mesures/[mesure_id]/accept`}
              asLink={`${userBasePath}/mesures/${id}/accept`}
            >
              Accepter la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.eteinte && (
            <LinkButton
              ml={3}
              outline={true}
              href={`${userBasePath}/mesures/[mesure_id]/reactivate`}
              asLink={`${userBasePath}/mesures/${id}/reactivate`}
            >
              Réouvrir la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.en_cours && (
            <Fragment>
              <LinkButton
                bg="red"
                color="white"
                outline={true}
                href={`${userBasePath}/mesures/[mesure_id]/close`}
                asLink={`${userBasePath}/mesures/${id}/close`}
              >
                Cloturer la mesure
              </LinkButton>

              <LinkButton
                ml={3}
                outline={true}
                href={`${userBasePath}/mesures/[mesure_id]/edit`}
                asLink={`${userBasePath}/mesures/${id}/edit`}
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

export default MesureView;
