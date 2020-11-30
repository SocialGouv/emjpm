import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceEditInformations } from "../../src/components/ServiceEditInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Editer les informations de votre service</Heading1>
        <ServiceEditInformations
          mt="3"
          cancelLink="/services/informations"
          successLink="/services/informations"
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(EditInformations);
