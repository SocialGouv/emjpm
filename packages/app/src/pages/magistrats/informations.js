import { Box, Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratInformations } from "~/components/MagistratInformations";
import { MagistratTribunalInformations } from "~/components/MagistratTribunalInformations";
import { Heading } from "~/ui";
import { BoxWrapper } from "~/ui/Grid";

function Informations() {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
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
  );
}

export default Informations;
