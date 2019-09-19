import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { withAuthSync } from "../../src/util/auth";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { FiltersContextProvider } from "../../src/components-v2/ServicesFilters/context";
import { UserInformations } from "../../src/components-v2/UserInformations";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures</Heading1>
          <ServicesFilters />
          <Flex
            sx={{
              mt: "2",
              flexWrap: "wrap"
            }}
          >
            {/* <Box
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          > */}
            <UserInformations Component={props => <ServiceMesures {...props} />} />
            {/* </Box>
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: 256
            }}
          >
            map and other stuff
          </Box> */}
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
