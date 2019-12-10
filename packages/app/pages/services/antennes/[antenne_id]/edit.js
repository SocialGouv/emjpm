import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import { useRouter } from "next/router";
import React from "react";

import { LayoutServices } from "../../../../src/components/Layout";
import { ServiceEditAntenne } from "../../../../src/components/ServiceAntenneEdit";
import { UserInformations } from "../../../../src/components/UserInformations";
import { withAuthSync } from "../../../../src/util/auth";

const AddAntennes = () => {
  const router = useRouter();
  const { antenne_id } = router.query;
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">{`Modification de l'antenne`}</Heading1>
        <UserInformations
          Component={props => <ServiceEditAntenne {...props} currentAntenne={antenne_id} mt="3" />}
        />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
