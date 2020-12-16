import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireEditInformations } from "~/components/MandataireEditInformations";
import { UserContext } from "~/components/UserContext";
import { PATH } from "~/constants/basePath";
import { withAuthSync } from "~/util/auth";

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
