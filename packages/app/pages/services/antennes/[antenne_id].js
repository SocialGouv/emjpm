import { BoxWrapper, Heading2 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../../src/components/Layout";
import { ServiceInformations } from "../../../src/components/ServiceAntenneInformations";
import { PreferencesPanel } from "../../../src/components/ServiceAntenneSidebar";
import { withAuthSync } from "../../../src/util/auth";

const Antennes = props => {
  const { antenneId } = props;

  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 1
            }}
          >
            <Heading2>Informations de votre antenne</Heading2>
            <ServiceInformations antenne_id={antenneId} mt="3" />
          </Box>
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 1
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            <PreferencesPanel antenneId={antenneId} mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

Antennes.getInitialProps = async ({ query }) => {
  return { antenneId: query.antenne_id };
};

export default withAuthSync(Antennes);
