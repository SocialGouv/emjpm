import { useQuery } from "@apollo/client";
import { isDirection, isMagistrat, isMandataire, isService } from "@emjpm/biz";

import { Box, Card } from "rebass";
import { useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { AccessToken } from "~/containers/AccessToken";
import { AdminUserActivation } from "~/containers/AdminUserActivation";
import { AdminUserResetPassword } from "~/containers/AdminUserResetPassword";
import { AdminDirectionType } from "~/containers/AdminUserDirection";
import { AdminMandataireMesures } from "~/containers/AdminUserMandataire";
import { AdminUserService } from "~/containers/AdminUserService";
import { DirectionEditInformations } from "~/containers/DirectionEditInformations";
import { MagistratEditInformations } from "~/containers/MagistratEditInformations";
import { MandataireEditInformations } from "~/containers/MandataireEditInformations";
import { MesureImportPanel } from "~/containers/MesureImport";

import { USER } from "./queries";

function AdminUser() {
  const { user_id } = useParams();
  const userId = parseInt(user_id);

  const { data, loading, error } = useQuery(USER, {
    variables: {
      userId: userId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user } = data;
  const { type, active } = user;

  return (
    <Box>
      <Box my={1} width="100%">
        <AdminUserActivation userId={userId} />
        <AdminUserResetPassword userId={userId} />
      </Box>
      {isMandataire({ type }) && (
        <>
          <Box my={1} width="100%">
            <MandataireEditInformations
              userId={userId}
              cancelLink="/admin/users"
              isAdmin
              mt="3"
            />
            {active && (
              <>
                <Card my={1}>
                  <AdminMandataireMesures userId={userId} />
                </Card>
                <Card my={1}>
                  <MesureImportPanel mandataireUserId={userId} />
                </Card>
              </>
            )}
          </Box>
        </>
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
          <AdminUserService userId={userId} cancelLink="/admin/users" />
        </Box>
      )}

      <Box my={1} width="100%">
        <AccessToken isAdmin userId={userId} />
      </Box>
    </Box>
  );
}

export { AdminUser };
