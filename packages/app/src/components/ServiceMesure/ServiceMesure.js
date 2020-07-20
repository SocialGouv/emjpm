import { MESURE_PROTECTION_STATUS, mesureFormatter } from "@emjpm/core";
import { Card, Heading2 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "../../components/Commons";
import { MesureContext } from "../MesureContext";
import { content, statusBox, subtitle } from "./style";

const ServiceMesure = (props) => {
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
              <Text sx={content}>{mesureFormatter.formatNatureMesure(natureMesure)}</Text>
            </Box>
            <Box mb={4}>
              <Text sx={subtitle}>Champ de la mesure</Text>
              <Text sx={content}>{mesureFormatter.formatChampMesure(champMesure)}</Text>
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
              <Text sx={subtitle}>Date de jugement ou ordonnance de nomination</Text>
              <Text sx={content}>{dateNominationFormated}</Text>
            </Box>

            <Box mb={4}>
              <Text sx={subtitle}>Numéro de dossier</Text>
              <Text sx={content}>{numeroDossier}</Text>
            </Box>
          </Box>
        </Flex>
        <Box textAlign="center">
          {status === MESURE_PROTECTION_STATUS.en_attente && (
            <LinkButton
              outline={true}
              href="/services/mesures/[mesure_id]/accept"
              asLink={`/services/mesures/${id}/accept`}
            >
              Accepter la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.eteinte && (
            <Fragment>
              <LinkButton
                outline={true}
                bg="red"
                color="white"
                href="/services/mesures/[mesure_id]/delete"
                asLink={`/services/mesures/${id}/delete`}
              >
                Supprimer la mesure
              </LinkButton>
              <LinkButton
                ml={3}
                outline={true}
                href="/services/mesures/[mesure_id]/reactivate"
                asLink={`/services/mesures/${id}/reactivate`}
              >
                Réouvrir la mesure
              </LinkButton>
            </Fragment>
          )}

          {status === MESURE_PROTECTION_STATUS.en_cours && (
            <Fragment>
              <LinkButton
                bg="red"
                color="white"
                outline={true}
                href="/services/mesures/[mesure_id]/close"
                asLink={`/services/mesures/${id}/close`}
              >
                Cloturer la mesure
              </LinkButton>

              <LinkButton
                ml={3}
                outline={true}
                href="/services/mesures/[mesure_id]/edit"
                asLink={`/services/mesures/${id}/edit`}
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

export { ServiceMesure };
