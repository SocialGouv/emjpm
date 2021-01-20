import { Box, Flex } from "rebass";

import { AdminInformations } from "~/components/AdminInformations";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper, Heading2 } from "~/ui";

function Informations() {
  return (
    <LayoutAdmin>
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
            <Heading2>Informations générales</Heading2>
            <AdminInformations mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default Informations;
