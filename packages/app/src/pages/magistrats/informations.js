import { Box, Flex } from "rebass";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratInformations } from "~/containers/MagistratInformations";
import { MagistratTribunalInformations } from "~/containers/MagistratTribunalInformations";
import { Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

function Informations() {
  return (
    <>
      <Helmet>
        <title>Informations générales | e-MJPM</title>
      </Helmet>
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="0">
          <Flex
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                flexBasis: 0,
                flexGrow: 99999,
                minWidth: 320,
                p: 1,
              }}
            >
              <Heading size={2}>Informations générales</Heading>
              <MagistratInformations mt="3" />
            </Box>
            <Box
              sx={{
                flexBasis: 420,
                flexGrow: 1,
                p: 1,
              }}
            >
              <Heading size={2}>Votre tribunal</Heading>
              <MagistratTribunalInformations mt="3" />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default Informations;
