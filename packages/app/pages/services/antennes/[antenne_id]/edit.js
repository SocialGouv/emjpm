import React from "react";
import { useRouter } from "next/router";
import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";

import { withAuthSync } from "../../../../src/util/auth";
import { LayoutServices } from "../../../../src/components-v2/Layout";
import { ServiceEditAntenne } from "../../../../src/components-v2/ServiceEditAntenne";
import { UserInformations } from "../../../../src/components-v2/UserInformations";

const AddAntennes = () => {
  const router = useRouter();
  const { antenne_id } = router.query;
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Créer une antenne pour votre service</Heading1>
        <UserInformations
          Component={props => <ServiceEditAntenne {...props} currentAntenne={antenne_id} mt="3" />}
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
