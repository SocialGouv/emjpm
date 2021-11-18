import { Box, Flex } from "rebass";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierInformations } from "~/containers/GreffierInformations";
import { GreffierTribunalInformations } from "~/containers/GreffierTribunalInformations";
import { Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function Informations() {
  return (
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
  );
}

export default Informations;
