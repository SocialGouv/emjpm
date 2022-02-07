import { MESURE_PROTECTION, mesureFormatter } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex, Text, Button, Link as RebassLink } from "rebass";
import { Helmet } from "react-helmet";

import capitalize from "~/utils/std/capitalize";
import { Link } from "~/containers/Commons";
import { MesureContext } from "~/containers/MesureContext";
import { Heading } from "~/components";

import {
  GreffierMesureContentStyle,
  GreffierMesureLinksStyle,
  GreffierMesureMainStyle,
  GreffierMesureSideStyle,
  GreffierMesureStyle,
  GreffierMesureTitleStyle,
} from "./style";

import { MESURE_EMAIL_MANDATAIRE, MESURE_EMAIL_SERVICE } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";
import { useQuery } from "@apollo/client";

function GreffierMesure(props) {
  const mesure = useContext(MesureContext);

  const {
    realAge,
    cabinet,
    civilite,
    judgmentDateFormatted,
    numeroRg,
    status,
    tribunal,
    isUrgent,
    natureMesure,
    champMesure,
    id,
  } = mesure;

  const mesureEmailQuery = mesure.service_id
    ? MESURE_EMAIL_SERVICE
    : MESURE_EMAIL_MANDATAIRE;
  const { data, loading, error } = useQuery(mesureEmailQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: mesure.id,
    },
  });
  if (!useQueryReady(loading, error)) {
    return null;
  }
  const emailGestionnaire =
    data?.mesures_by_pk[
      "email_" + (mesure.service_id ? "service" : "mandataire")
    ] ?? "";

  const { formatNatureMesure, formatChampMesure } = mesureFormatter;

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
      <Heading size={3} mt="4" mb="3">
        Votre mesure
      </Heading>
      <Flex sx={GreffierMesureStyle} {...props}>
        <Box sx={GreffierMesureLinksStyle}>
          {status === "en_attente" && (
            <Link to={`/greffiers/mesures/${id}/delete`}>
              Supprimer la mesure
            </Link>
          )}
        </Box>
        <Box sx={GreffierMesureSideStyle} />
        <Flex sx={GreffierMesureMainStyle} id="votre_mesure_infos">
          <Box width="50%">
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Numero RG</Text>
              <Text sx={GreffierMesureContentStyle}>{numeroRg}</Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Nature de la mesure</Text>
              <Text sx={GreffierMesureContentStyle}>
                {MESURE_PROTECTION.NATURE_MESURE.byKey[natureMesure]}
              </Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Champ de la mesure</Text>
              <Text sx={GreffierMesureContentStyle}>
                {MESURE_PROTECTION.CHAMP_MESURE.byKey[champMesure]}
              </Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Tribunal</Text>
              <Text sx={GreffierMesureContentStyle}>{tribunal}</Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Cabinet</Text>
              <Text sx={GreffierMesureContentStyle}>{cabinet}</Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>
                Date prévisionnelle de jugement
              </Text>
              <Text sx={GreffierMesureContentStyle}>
                {judgmentDateFormatted}
              </Text>
            </Box>
          </Box>
          <Box width="50%">
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Civilité</Text>
              <Text sx={GreffierMesureContentStyle}>
                {MESURE_PROTECTION.CIVILITE.byKey[civilite]}
              </Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>
                Age de la personne a protéger
              </Text>
              <Text sx={GreffierMesureContentStyle}>{realAge}</Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>
                Mesure à caractère urgent
              </Text>
              <Text sx={GreffierMesureContentStyle}>
                {isUrgent ? "oui" : "non"}
              </Text>
            </Box>
            <Box>
              <Text sx={GreffierMesureTitleStyle}>Status de la mesure</Text>
              <Text sx={GreffierMesureContentStyle}>
                {MESURE_PROTECTION.STATUS.byKey[status]}
              </Text>
            </Box>
            <Box textAlign="left">
              <RebassLink
                href={
                  `mailto:` +
                  emailGestionnaire +
                  `?subject=` +
                  encodeURIComponent(
                    "eMJPM - Concernant la mesure RG-" + numeroRg
                  )
                }
              >
                <Button variant="outline">
                  <Text fontSize={1} fontWeight="normal">
                    Envoyer un email au mandataire à propos de cette mesure
                  </Text>
                </Button>
              </RebassLink>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export { GreffierMesure };
