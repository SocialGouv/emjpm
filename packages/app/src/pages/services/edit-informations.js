import React, { useContext } from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { ServiceEditInformations } from "~/components/ServiceEditInformations";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const EditInformations = () => {
  const {
    service: { id: serviceId },
  } = useContext(UserContext);
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <HeadingTitle mx="1">
          Editer les informations de votre service
        </HeadingTitle>
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
