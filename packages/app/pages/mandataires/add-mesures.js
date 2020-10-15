import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MesureCreateOrEdit } from "../../src/components/MesureCreateOrEdit";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  return (
    <LayoutMandataire hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1 mx="1">{"Création d'une mesure"}</Heading1>
        <MesureCreateOrEdit />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(AddMesures);
