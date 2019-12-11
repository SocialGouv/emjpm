import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { DirectionEditInformations } from "../../src/components/DirectionEditInformations";
import { LayoutDirection } from "../../src/components/Layout";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Heading1>Editer mes informations</Heading1>
        <UserInformations
          Component={props => {
            return <DirectionEditInformations {...props} mt="3" />;
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EditInformations);
