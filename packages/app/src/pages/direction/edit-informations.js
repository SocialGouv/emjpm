import React, { useContext } from "react";

import { DirectionEditInformations } from "~/components/DirectionEditInformations";
import { LayoutDirection } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

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
