import { isDirection } from "@emjpm/core";
import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Box, Card, Flex, Link as StyledLink } from "rebass";

import { AccessToken } from "../../../src/components/AccessToken";
import AdminMandataireTribunaux from "../../../src/components/AdminUsers/AdminMandataireTribunaux";
import { AdminUserActivation } from "../../../src/components/AdminUsers/AdminUserActivation";
import { AdminUserInformations } from "../../../src/components/AdminUsers/AdminUserInformations";
import AdminUsersMesures from "../../../src/components/AdminUsers/AdminUsersMesures";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MandataireEditInformations } from "../../../src/components/MandataireEditInformations";
import { MesureImportPanel } from "../../../src/components/MesureImport";
import { isMagistrat, isMandataire, isService } from "../../../src/util";
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
        {isMandataire(type) && (
          <Box my={1} width="100%">
            <Box p="5">
              <AdminMandataireTribunaux userId={userId} />
            </Box>

            <MandataireEditInformations
              userId={userId}
              userType={type}
              cancelLink="/admin/users"
              mt="3"
              isAdmin
            />
          </Box>
        )}
        {isMagistrat(type) && (
          <Box my={1} width="100%">
            <AdminUserInformations userId={userId} />
          </Box>
        )}
        {isService(type) && (
          <Box my={1} width="100%">
            <AdminUserInformations userId={userId} />
          </Box>
        )}
        {isDirection(type) && (
          <Box my={1} width="100%">
            <AdminUserInformations userId={userId} />
          </Box>
        )}
        <Box p="5">
          <AdminUserActivation userId={userId} />
        </Box>

        <Box p="5">
          <AccessToken isAdmin userId={userId} />
        </Box>
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
