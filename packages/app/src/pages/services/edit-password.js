import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { EditPassword } from "~/components/EditPassword";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const EditInformations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(EditInformations);
