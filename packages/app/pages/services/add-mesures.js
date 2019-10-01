import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceAddMesure } from "../../src/components-v2/ServiceMesures";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  return (
    <LayoutServices hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{"Création d'une mesure"}</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              p: 3,
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          >
            <UserInformations
              Component={props => {
                return <ServiceAddMesure {...props} />;
              }}
            />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddMesures);
