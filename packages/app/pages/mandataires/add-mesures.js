import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireAddMesure } from "../../src/components/MandataireMesures";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  return (
    <LayoutMandataire hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1 mx="1">{"Création d'une mesure"}</Heading1>
        <UserInformations
          Component={props => {
            return <MandataireAddMesure {...props} />;
          }}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(AddMesures);
