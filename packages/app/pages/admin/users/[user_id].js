import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Box, Card, Flex, Link as StyledLink } from "rebass";

import { AdminUserInformations } from "../../../src/components/AdminUsers/AdminUserInformations";
import AdminUsersMesures from "../../../src/components/AdminUsers/AdminUsersMesures";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MesureImportPanel } from "../../../src/components/MesureImport";
import { isMandataire } from "../../../src/util";
import { withAuthSync } from "../../../src/util/auth";

const User = (props) => {
  const { userId, type, active } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link href="/admin/users">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Card my={1} width="100%">
          <AdminUserInformations userId={userId} />
        </Card>
      </BoxWrapper>
      <Box px={1}>
        <Flex flexDirection="column">
          {active && isMandataire(type) && (
            <Card my={1}>
              <AdminUsersMesures userId={userId} />
            </Card>
          )}
          {active && isMandataire(type) && (
            <Card my={1}>
              <MesureImportPanel mandataireUserId={userId} />
            </Card>
          )}
        </Flex>
      </Box>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { active: query.active, type: query.type, userId: query.user_id };
};

export default withAuthSync(User);
