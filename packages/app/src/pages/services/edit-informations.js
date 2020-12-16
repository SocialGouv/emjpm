import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceEditInformations } from "~/components/ServiceEditInformations";
import { UserContext } from "~/components/UserContext";
import { withAuthSync } from "~/util/auth";

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
