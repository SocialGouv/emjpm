import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";

const User = props => {
  const { user_id } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px="1">
        <Heading1>Liste des utilisateurs / #{user_id}</Heading1>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { user_id: query.user_id };
};

export default withAuthSync(User);
