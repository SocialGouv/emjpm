import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "../../src/components-v2/Layout";
import { ServiceAntennes } from "../../src/components-v2/ServiceAntennes";
import { PreferencesPanel } from "../../src/components-v2/ServiceSidebar";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="0">
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              maxWidth: "50%",
              p: 1
            }}
          >
            <Heading2>Mesures souhaitées par votre service</Heading2>
            <UserInformations
              Component={props => <PreferencesPanel isDescriptionHidden={true} {...props} mt="3" />}
            />
          </Box>
        </Flex>
        <Box
          sx={{
            p: 1
          }}
        >
          <ServiceAntennes isAntenneCreationHidden="true" mt="1" />
        </Box>
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(Informations);
