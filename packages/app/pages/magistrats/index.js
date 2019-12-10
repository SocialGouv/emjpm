import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components/Layout";
import { MagistratMandatairesList } from "../../src/components/MagistratMandatairesList";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Tous les mandataires</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2"
          }}
        >
          <UserInformations
            Component={props => {
              return <MagistratMandatairesList {...props} />;
            }}
          />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(Mandataires);
