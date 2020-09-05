import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminEtablissements } from "../../../src/components/AdminEtablissements";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminEtablissementsPage = () => {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px="1">
        <Heading1>Liste des établissements</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <AdminEtablissements />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AdminEtablissementsPage);
