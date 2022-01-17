import { MESURE_PROTECTION } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex, Text, Button, Link as RebassLink } from "rebass";
import { mesureFormatter } from "@emjpm/biz";

import { Link } from "~/containers/Commons";
import { MesureContext } from "~/containers/MesureContext";
import { Heading } from "~/components";

import {
  MagistratMesureContentStyle,
  MagistratMesureLinksStyle,
  MagistratMesureMainStyle,
  MagistratMesureSideStyle,
  MagistratMesureStyle,
  MagistratMesureTitleStyle,
} from "./style";

import { MESURE_EMAIL_MANDATAIRE, MESURE_EMAIL_SERVICE } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";

function MagistratMesure(props) {
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

  const { formatNatureMesure } = mesureFormatter;

  return (
    <>
      <Helmet>
        <title>{`${formatNatureMesure(
          mesure.natureMesure
        )} ${numeroRg} | e-MJPM`}</title>
      </Helmet>
      <Heading size={3} mt="4" mb="3">
        Votre mesure
      </Heading>
      <Flex sx={MagistratMesureStyle} {...props}>
        <Box sx={MagistratMesureLinksStyle}>
          {status === "en_attente" && (
            <Link to={`/magistrats/mesures/${id}/delete`}>
              Supprimer la mesure
            </Link>
          )}
        </Box>
        <Box sx={MagistratMesureSideStyle} />
        <Flex sx={MagistratMesureMainStyle}>
          <Box width="50%">
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Numero RG</Text>
              <Text sx={MagistratMesureContentStyle}>{numeroRg}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Nature de la mesure</Text>
              <Text sx={MagistratMesureContentStyle}>
                {MESURE_PROTECTION.NATURE_MESURE.byKey[natureMesure]}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Champ de la mesure</Text>
              <Text sx={MagistratMesureContentStyle}>
                {MESURE_PROTECTION.CHAMP_MESURE.byKey[champMesure]}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Tribunal</Text>
              <Text sx={MagistratMesureContentStyle}>{tribunal}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Cabinet</Text>
              <Text sx={MagistratMesureContentStyle}>{cabinet}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>
                Date prévisionnelle de jugement
              </Text>
              <Text sx={MagistratMesureContentStyle}>
                {judgmentDateFormatted}
              </Text>
            </Box>
          </Box>
          <Box width="50%">
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Civilité</Text>
              <Text sx={MagistratMesureContentStyle}>
                {MESURE_PROTECTION.CIVILITE.byKey[civilite]}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>
                Age de la personne a protéger
              </Text>
              <Text sx={MagistratMesureContentStyle}>{realAge}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>
                Mesure à caractère urgent
              </Text>
              <Text sx={MagistratMesureContentStyle}>
                {isUrgent ? "oui" : "non"}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Status de la mesure</Text>
              <Text sx={MagistratMesureContentStyle}>
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

export { MagistratMesure };
