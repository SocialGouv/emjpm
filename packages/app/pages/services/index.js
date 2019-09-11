import React from "react";

import { Flex } from "rebass";
import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";

import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { UserInformations } from "../../src/components-v2/UserInformations";

const Mesures = () => {
  return (
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
  );
};

export default Mesures;
