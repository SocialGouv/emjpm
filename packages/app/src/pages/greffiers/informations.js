import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierInformations } from "~/containers/GreffierInformations";
import { GreffierTribunalInformations } from "~/containers/GreffierTribunalInformations";
import { Heading, SkipToContent } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function Informations() {
  return (
    <>
      <Helmet>
        <title>Vos informations | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="greffier_informations" />
      <LayoutGreffier>
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
              <GreffierInformations mt="3" />
            </Box>
            <Box
              sx={{
                flexBasis: 420,
                flexGrow: 1,
                p: 1,
              }}
            >
              <Heading size={2}>Votre tribunal</Heading>
              <GreffierTribunalInformations mt="3" />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default Informations;
