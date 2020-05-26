import { BoxWrapper, Card, Heading2 } from "@emjpm/ui";
import React from "react";

import { EnqueteCreate } from "../../../src/components/EnqueteCreate";
import { LayoutDirection } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const CreateEnquete = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Card p={5}>
          <Heading2 mb={3}>Créer une enquête</Heading2>
          <EnqueteCreate />
        </Card>
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(CreateEnquete);
