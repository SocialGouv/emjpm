import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "~/components/Commons";
import { DirectionEnquetesList } from "~/components/EnqueteDirection";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper, Heading2 } from "~/ui";
import { withAuthSync } from "~/util/auth";

const DirectionEnquetesPage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Flex mb={3} flexDirection="row" justifyContent="space-between">
          <Heading2>Enquêtes</Heading2>
          <Box>
            <LinkButton href="/direction/enquetes/create">
              Ajouter une enquête
            </LinkButton>
          </Box>
        </Flex>
        <DirectionEnquetesList />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(DirectionEnquetesPage);
