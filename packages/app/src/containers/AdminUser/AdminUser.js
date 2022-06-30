import { useQuery } from "@apollo/client";
import {
  isDirection,
  isMagistrat,
  isMandataire,
  isService,
  isGreffier,
  isAdmin,
  isDpfi,
} from "@emjpm/biz";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { AccessToken } from "~/containers/AccessToken";
import { AdminUserActivation } from "~/containers/AdminUserActivation";
import { AdminUserResetPassword } from "~/containers/AdminUserResetPassword";
import { AdminDirectionType } from "~/containers/AdminUserDirection";
import { AdminUserService } from "~/containers/AdminUserService";
import { DirectionEditInformations } from "~/containers/DirectionEditInformations";
import { MagistratEditInformations } from "~/containers/MagistratEditInformations";
import { GreffierEditInformations } from "~/containers/GreffierEditInformations";
import { MandataireEditInformations } from "~/containers/MandataireEditInformations";
import { AdminEditInformations } from "~/containers/AdminEditInformations";
import { DpfiEditInformations } from "~/containers/DpfiEditInformations";

import { USER } from "./queries";
import useUser from "~/hooks/useUser";

function AdminUser({ userId }) {
  const { data, loading, error } = useQuery(USER, {
    variables: {
      userId,
    },
  });

  const { id: adminUserId } = useUser();

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user } = data;
  const { type } = user;

  return (
    <Box id="informations_personelles" tabIndex="-1">
      <Box my={1} width="100%">
        {adminUserId !== userId && <AdminUserActivation userId={userId} />}
        {type !== "admin" && <AdminUserResetPassword userId={userId} />}
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
          </Box>
        </>
      )}

      {isDpfi({ type }) && (
        <Box my={1} width="100%">
          <DpfiEditInformations
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
      {isGreffier({ type }) && (
        <Box my={1} width="100%">
          <GreffierEditInformations
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
      {isAdmin({ type }) && (
        <Box my={1} width="100%">
          <AdminEditInformations
            userId={userId}
            cancelLink="/admin/users"
            isAdmin
          />
        </Box>
      )}

      <Box my={1} width="100%">
        <AccessToken isAdmin userId={userId} />
      </Box>
    </Box>
  );
}

export { AdminUser };
