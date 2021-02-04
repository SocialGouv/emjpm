import { Box, Flex } from "rebass";

import { DirectionInformations } from "~/components/DirectionInformations";
import { LayoutDirection } from "~/components/Layout";
import { Heading } from "~/ui";
import { BoxWrapper } from "~/ui/Grid";

function Informations() {
  return (
    <LayoutDirection>
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
            <DirectionInformations mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default Informations;
