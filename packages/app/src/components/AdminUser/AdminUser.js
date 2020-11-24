import { isDirection, isMagistrat, isMandataire, isService } from "@emjpm/core";
import React from "react";
import { Box, Card, Flex } from "rebass";

import { AccessToken } from "../AccessToken";
import { AdminUserActivation } from "../AdminUserActivation";
import { AdminDirectionType } from "../AdminUserDirection";
import {
  AdminMandataireMesures,
  AdminMandataireTribunaux,
} from "../AdminUserMandataire";
import { DirectionEditInformations } from "../DirectionEditInformations";
import { MagistratEditInformations } from "../MagistratEditInformations";
import { MandataireEditInformations } from "../MandataireEditInformations";
import { MesureImportPanel } from "../MesureImport";

const AdminUser = (props) => {
  const { userId, type, active } = props;

  return (
    <Box>
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
          {/* <AdminUserInformations userId={userId} /> */}
        </Box>
      )}
      <Box my={1} width="100%">
        <AdminUserActivation userId={userId} />
      </Box>

      <Box my={1} width="100%">
        <AccessToken isAdmin userId={userId} />
      </Box>
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
    </Box>
  );
};

export { AdminUser };
