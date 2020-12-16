import { MESURE_PROTECTION_STATUS, mesureFormatter } from "@emjpm/core";
import { Heading3 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import { getUserBasePath } from "~/constants";

import { content, statusBox, subtitle, title } from "./style";

const MesureDetailView = ({ mesure, ...props }) => {
  const {
    realAge,
    cabinet,
    civilite,
    dateNominationFormated,
    dateProtectionEnCoursFormatted,
    datePremierMesureFormatted,
    numeroDossier,
    numeroRg,
    lieuVie,
    status,
    tribunal,
    natureMesure,
    champMesure,
    ville,
    pays,
    codePostal,
    antenne,
    id,
  } = mesure;

  const { type } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  const {
    formatNatureMesure,
    formatChampMesure,
    formatStatus,
    formatMajeurProtege,
    formatLieuVie,
    formatPays,
  } = mesureFormatter;

  return (
    <Box {...props}>
      <Flex justifyContent="space-between" mb="3" flexWrap="wrap">
        <Flex>
          <Heading3 sx={title}>{`${formatNatureMesure(
            natureMesure
          )} ${formatChampMesure(champMesure)}`}</Heading3>
          <Heading3 ml={2} color="textSecondary">{`${numeroRg}`}</Heading3>
        </Flex>
        <Box>
          <Text mx="auto" sx={statusBox(status)}>
            {formatStatus(status)}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Box flex="1">
          {numeroDossier && (
            <Box mb={2}>
              <Text sx={subtitle}>Numéro de dossier</Text>
              <Text sx={content}>{numeroDossier}</Text>
            </Box>
          )}
          <Box mb={2}>
            <Text sx={subtitle}>Majeur protégé</Text>
            <Text sx={content}>{formatMajeurProtege(civilite, realAge)}</Text>
          </Box>
          <Box mb={2}>
            <Text sx={subtitle}>Lieu de vie du majeur</Text>
            <Text sx={content}>{formatLieuVie(lieuVie)}</Text>
          </Box>

          <Box mb={2}>
            <Text sx={subtitle}>Commune</Text>
            <Text sx={content}>
              {codePostal} {ville} ({formatPays(pays)})
            </Text>
          </Box>
          <Box mb={2}>
            <Text sx={subtitle}>Date de première mise sous protection</Text>
            <Text sx={content}>{datePremierMesureFormatted}</Text>
          </Box>
        </Box>

        <Box flex="1">
          <Box mb={2}>
            <Text sx={subtitle}>Tribunal</Text>
            <Text sx={content}>
              {tribunal} {cabinet ? `(${cabinet})` : ""}
            </Text>
          </Box>

          <Box mb={2}>
            <Text sx={subtitle}>Date de nomination</Text>
            <Text sx={content}>{dateNominationFormated}</Text>
          </Box>

          <Box mb={2}>
            <Text sx={subtitle}>Date de protection en cours</Text>
            <Text sx={content}>{dateProtectionEnCoursFormatted}</Text>
          </Box>

          {antenne && (
            <Box mb={2}>
              <Text sx={subtitle}>Antenne</Text>
              <Text sx={content}>{antenne}</Text>
            </Box>
          )}
        </Box>
      </Flex>
      <Box textAlign="center" py={1}>
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
    </Box>
  );
};

export { MesureDetailView };
