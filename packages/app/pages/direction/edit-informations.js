import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { DirectionEditInformations } from "../../src/components/DirectionEditInformations";
import { LayoutDirection } from "../../src/components/Layout";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  const redirectLink = "/direction/informations";
  const { id: userId } = useContext(UserContext);
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <DirectionEditInformations
          successLink={redirectLink}
          cancelLink={redirectLink}
          userId={userId}
          mt="3"
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EditInformations);
