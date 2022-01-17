import { MESURE_PROTECTION_STATUS, mesureFormatter } from "@emjpm/biz";
import { Box, Flex, Text, Link, Button } from "rebass";
import { Helmet } from "react-helmet";

import capitalize from "~/utils/std/capitalize";
import { LinkButton } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";
import { Heading } from "~/components";

import { content, statusBox, subtitle, title } from "./style";

import { MESURE_EMAIL_MAGISTRAT } from "./queries";
import useMesuresLocked from "~/hooks/useMesuresLocked";
import useQueryReady from "~/hooks/useQueryReady";
import { useQuery } from "@apollo/client";

function MesureDetailView({ mesure, ...props }) {
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
    en_attente_reouverture,
  } = mesure;

  const user = useUser();

  const { type } = user;

  const userBasePath = getUserBasePath({ type });

  const {
    formatNatureMesure,
    formatChampMesure,
    formatStatus,
    formatMajeurProtege,
    formatLieuVie,
    formatPays,
  } = mesureFormatter;

  const { locked, message } = useMesuresLocked();

  const mesureModificationButtonProps =
    locked && status !== "en_attente"
      ? {
          disabled: true,
          title: message,
        }
      : {};

  const mesureEmailQuery = MESURE_EMAIL_MAGISTRAT;
  const { data, loading, error } = useQuery(mesureEmailQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: mesure.id,
    },
  });
  if (!useQueryReady(loading, error)) {
    return null;
  }
  const emailMagistrat = data?.mesures_by_pk.email_magistrat ?? "";
  const emailGreffier = data?.mesures_by_pk.email_greffier ?? "";

  return (
    <>
      <Helmet>
        <title>
          {`${capitalize(formatNatureMesure(natureMesure))} ${formatChampMesure(
            champMesure
          )} ${numeroRg}`}{" "}
          | e-MJPM
        </title>
      </Helmet>
      <Box {...props}>
        <Flex justifyContent="space-between" mb="3" flexWrap="wrap">
          <Flex>
            <Heading size={3} sx={title}>{`${formatNatureMesure(
              natureMesure
            )} ${formatChampMesure(champMesure)}`}</Heading>
            <Heading
              size={3}
              ml={2}
              color="textSecondary"
            >{`${numeroRg}`}</Heading>
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
            to={`${userBasePath}/mesures/${id}/delete`}
            {...mesureModificationButtonProps}
          >
            {en_attente_reouverture
              ? "Supprimer la demande de réouverture"
              : "Supprimer la mesure"}
          </LinkButton>

          {status === MESURE_PROTECTION_STATUS.en_attente && (
            <LinkButton
              outline={true}
              to={`${userBasePath}/mesures/${id}/accept`}
              {...mesureModificationButtonProps}
            >
              {en_attente_reouverture
                ? "Accepter la réouverture"
                : "Accepter la mesure"}
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.eteinte && (
            <LinkButton
              ml={3}
              outline={true}
              to={`${userBasePath}/mesures/${id}/reactivate`}
              {...mesureModificationButtonProps}
            >
              Rouvrir la mesure
            </LinkButton>
          )}

          {status === MESURE_PROTECTION_STATUS.en_cours && (
            <>
              <LinkButton
                bg="red"
                color="white"
                outline={true}
                to={`${userBasePath}/mesures/${id}/close`}
                {...mesureModificationButtonProps}
              >
                Cloturer la mesure
              </LinkButton>

              <LinkButton
                ml={3}
                outline={true}
                to={`${userBasePath}/mesures/${id}/edit`}
                {...mesureModificationButtonProps}
              >
                Modifier la mesure
              </LinkButton>
            </>
          )}
        </Box>
        {emailMagistrat && (
          <Box textAlign="center" py={1}>
            <Link
              href={
                `mailto:` +
                emailMagistrat +
                `?subject=` +
                encodeURIComponent(
                  "eMJPM - Concernant la mesure RG-" + numeroRg
                )
              }
            >
              <Button ml={3} variant="outline">
                <Text fontSize={1} fontWeight="normal">
                  Envoyer un email au magistrat à propos de cette mesure
                </Text>
              </Button>
            </Link>
          </Box>
        )}
        {emailGreffier && (
          <Box textAlign="center" py={1}>
            <Link
              href={
                `mailto:` +
                emailGreffier +
                `?subject=` +
                encodeURIComponent(
                  "eMJPM - Concernant la mesure RG-" + numeroRg
                )
              }
            >
              <Button ml={3} variant="outline">
                <Text fontSize={1} fontWeight="normal">
                  Envoyer un email au greffier à propos de cette mesure
                </Text>
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
}

export { MesureDetailView };
