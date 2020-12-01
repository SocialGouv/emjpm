import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceEditInformations } from "../../src/components/ServiceEditInformations";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  const {
    service: { id: serviceId },
  } = useContext(UserContext);
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Editer les informations de votre service</Heading1>
        <ServiceEditInformations
          mt="3"
          serviceId={serviceId}
          cancelLink="/services/informations"
          successLink="/services/informations"
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(EditInformations);
