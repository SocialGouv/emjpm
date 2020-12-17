import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { ServiceCreateAntenne } from "~/components/ServiceAntenneCreate";
import { withAuthSync } from "~/util/auth";

const AddAntennes = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <HeadingTitle mx="1">Créer une antenne pour votre service</HeadingTitle>
        <ServiceCreateAntenne />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
