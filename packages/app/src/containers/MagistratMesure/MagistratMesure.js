import { MESURE_PROTECTION } from "@emjpm/biz";
import { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

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

function MagistratMesure(props) {
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
  } = useContext(MesureContext);
  return (
    <Fragment>
      <Heading size={3} mt="4" mb="3">
        Votre mesure
      </Heading>
      <Flex sx={MagistratMesureStyle} {...props}>
        <Box sx={MagistratMesureLinksStyle}>
          <Link to={`/magistrats/mesures/${id}/delete`}>
            Supprimer la mesure
          </Link>
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
          </Box>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export { MagistratMesure };
