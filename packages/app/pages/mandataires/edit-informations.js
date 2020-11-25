import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireEditInformations } from "../../src/components/MandataireEditInformations";
import { UserContext } from "../../src/components/UserContext";
import { PATH } from "../../src/constants/basePath";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  const { id, type } = useContext(UserContext);

  const redirectLink = `${PATH[type]}/informations`;

  return (
    <LayoutMandataire>
      <BoxWrapper px="1">
        <MandataireEditInformations
          userId={id}
          userType={type}
          cancelLink={redirectLink}
          successLink={redirectLink}
          mt="3"
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(EditInformations);
