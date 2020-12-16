import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutServices } from "~/components/Layout";
import { MesureCreate } from "~/components/MesureCreate";
import { withAuthSync } from "~/util/auth";

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
