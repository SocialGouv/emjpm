import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAddMesure } from "../../src/components/ServiceMesures";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  return (
    <LayoutServices hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1 mx="1">{"Création d'une mesure"}</Heading1>
        <UserInformations
          Component={props => {
            return <ServiceAddMesure {...props} />;
          }}
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddMesures);
