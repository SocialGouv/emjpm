import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminEditorCreate } from "../../../src/components/AdminEditors/AdminEditorCreate";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminEditorsCreatePage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un éditeur`}</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <AdminEditorCreate />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AdminEditorsCreatePage);
