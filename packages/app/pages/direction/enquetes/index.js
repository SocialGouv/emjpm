import { BoxWrapper, Heading2 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../../src/components/Commons";
import { Enquetes } from "../../../src/components/Enquetes";
import { LayoutDirection } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const EnquetesPage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Flex mb={3} flexDirection="row" justifyContent="space-between">
          <Heading2>Enquêtes</Heading2>
          <Box>
            <LinkButton href="/direction/enquetes/create">Ajouter une enquête</LinkButton>
          </Box>
        </Flex>
        <Enquetes />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EnquetesPage);
