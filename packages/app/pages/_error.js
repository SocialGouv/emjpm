import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutPublic } from "../src/components-v2/Layout";
import { withAuthSync } from "../src/util/auth";

const LoginPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Heading1 mt={"80px"} textAlign="center">
          {`Il semble qu'une erreur se soit produite.`}
        </Heading1>
      </BoxWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(LoginPage);
