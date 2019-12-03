import { useMutation } from "@apollo/react-hooks";
import { BoxWrapper, Button, Heading1 } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";

import { ACTIVATE_USER } from "../../../src/components-v2/AdminUsers/mutations";
import { activateButtonStyle } from "../../../src/components-v2/AdminUsers/style";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";

const User = props => {
  const { user_id } = props;
  const active = false;
  const [isActive, setActive] = useState(active);
  const [activateUser] = useMutation(ACTIVATE_USER, {
    onCompleted: data => {
      setActive(data.update_users.returning[0].active);
    }
  });

  const toogleActivation = () => {
    const newState = !isActive;

    activateUser({
      variables: {
        active: newState,
        id: user_id
      }
    });
  };

  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px="1">
        <Heading1>Utilisateur #{user_id}</Heading1>
        <Button
          sx={activateButtonStyle(isActive)}
          width="120px"
          onClick={toogleActivation}
          variant="outline"
        >
          {isActive ? "Bloquer" : "Activer"}
        </Button>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { user_id: query.user_id };
};

export default withAuthSync(User);
