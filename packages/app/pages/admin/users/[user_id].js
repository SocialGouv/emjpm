import { isDirection, isMagistrat, isMandataire, isService } from "@emjpm/core";
import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Box, Card, Flex, Link as StyledLink } from "rebass";

import { AccessToken } from "../../../src/components/AccessToken";
import { AdminUserActivation } from "../../../src/components/AdminUserActivation";
import { AdminDirectionType } from "../../../src/components/AdminUserDirection";
import {
  AdminMandataireMesures,
  AdminMandataireTribunaux,
} from "../../../src/components/AdminUserMandataire";
import { AdminUserInformations } from "../../../src/components/AdminUsers/AdminUserInformations";
import { DirectionEditInformations } from "../../../src/components/DirectionEditInformations/DirectionEditInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MagistratEditInformations } from "../../../src/components/MagistratEditInformations";
import { MandataireEditInformations } from "../../../src/components/MandataireEditInformations";
import { MesureImportPanel } from "../../../src/components/MesureImport";
import { withAuthSync } from "../../../src/util/auth";

const User = (props) => {
  const { userId, type, active } = props;

  console.log(type);

  return (
    <LayoutAdmin>
      <BoxWrapper py={1}>
        <Link href="/admin/users">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        {isMandataire({ type }) && (
          <Box my={1} width="100%">
            <Box p="5">
              <AdminMandataireTribunaux userId={userId} />
            </Box>

            <MandataireEditInformations
              userId={userId}
              cancelLink="/admin/users"
              isAdmin
              mt="3"
            />
          </Box>
        )}
        {isMagistrat({ type }) && (
          <Box my={1} width="100%">
            <MagistratEditInformations
              userId={userId}
              cancelLink="/admin/users"
              isAdmin
              mt="3"
            />
          </Box>
        )}
        {isDirection({ type }) && (
          <Box my={1} width="100%">
            <DirectionEditInformations
              userId={userId}
              cancelLink="/admin/users"
              isAdmin
              mt="3"
            />
            <AdminDirectionType userId={userId} />
          </Box>
        )}
        {isService({ type }) && (
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
          {active && isMandataire({ type }) && (
            <Card my={1}>
              <AdminMandataireMesures userId={userId} />
            </Card>
          )}
          {active && isMandataire({ type }) && (
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
