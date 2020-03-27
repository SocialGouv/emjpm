import { Heading3 } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { Link } from "../Commons";
import { MesureContext } from "../MesureContext";
import {
  MagistratMesureContentStyle,
  MagistratMesureLinksStyle,
  MagistratMesureMainStyle,
  MagistratMesureSideStyle,
  MagistratMesureStyle,
  MagistratMesureTitleStyle
} from "./style";

const MagistratMesure = props => {
  const {
    realAge,
    cabinet,
    civilite,
    judgmentDate,
    numeroRg,
    status,
    tribunal,
    isUrgent,
    type,
    id
  } = useContext(MesureContext);
  return (
    <Fragment>
      <Heading3 mt="4" mb="3">
        Votre mesure
      </Heading3>
      <Flex sx={MagistratMesureStyle} {...props}>
        <Box sx={MagistratMesureLinksStyle}>
          <Link
            mr="1"
            href={`/magistrats/mesures/[mesure_id]/edit`}
            asLink={`/magistrats/mesures/${id}/edit`}
          >
            Éditer la mesure
          </Link>
          <Link
            href={`/magistrats/mesures/[mesure_id]/delete`}
            asLink={`/magistrats/mesures/${id}/delete`}
          >
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
              <Text sx={MagistratMesureTitleStyle}>Type de mesure</Text>
              <Text sx={MagistratMesureContentStyle}>{type}</Text>
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
              <Text sx={MagistratMesureTitleStyle}>Date prévisionnelle de jugement</Text>
              <Text sx={MagistratMesureContentStyle}>{judgmentDate}</Text>
            </Box>
          </Box>
          <Box width="50%">
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Civilité</Text>
              <Text sx={MagistratMesureContentStyle}>{civilite === "F" ? "Femme" : "Homme"}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Age de la personne a protéger</Text>
              <Text sx={MagistratMesureContentStyle}>{realAge}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Mesure à caractère urgent</Text>
              <Text sx={MagistratMesureContentStyle}>{isUrgent ? "oui" : "non"}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleStyle}>Status de la mesure</Text>
              <Text sx={MagistratMesureContentStyle}>{status}</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export { MagistratMesure };
