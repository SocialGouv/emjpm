import React from "react";

import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";

import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratEditInformations } from "../../src/components-v2/MagistratEditInformations";
import { UserInformations } from "../../src/components-v2/UserInformations";

const EditInformations = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Editer mes informations</Heading1>
        <UserInformations
          Component={props => {
            return <MagistratEditInformations {...props} mt="3" />;
          }}
        />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(EditInformations);
