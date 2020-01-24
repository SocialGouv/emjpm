import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAddMesure } from "../../src/components/ServiceMesures";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const AddMesures = () => {
  const {
    service_members: [{ service }]
  } = useContext(UserContext);

  return (
    <LayoutServices hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1 mx="1">{"Création d'une mesure"}</Heading1>
        <ServiceAddMesure service={service} />;
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddMesures);
