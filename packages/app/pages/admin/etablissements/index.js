import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { AdminEtablissements } from "../../../src/components/AdminEtablissements";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminEtablissementsPage = () => {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Heading1>Liste des établissements</Heading1>
        <Box mt={4} mb={4}>
          <AdminEtablissements />
        </Box>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AdminEtablissementsPage);
