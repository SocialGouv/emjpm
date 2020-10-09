import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { MesureCreate } from "../../src/components/MesureCreate";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  return (
    <LayoutServices hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1 mx="1">{"Création d'une mesure"}</Heading1>
        <MesureCreate />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddMesures);
