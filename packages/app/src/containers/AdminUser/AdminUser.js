import { useQuery } from "@apollo/client";
import {
  isDirection,
  isMagistrat,
  isMandataire,
  isService,
  isGreffier,
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

import { USER } from "./queries";

function AdminUser({ userId }) {
  const { data, loading, error } = useQuery(USER, {
    variables: {
      userId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user } = data;
  const { type } = user;

  return (
    <Box id="informations_personelles" tabIndex="-1">
      {type !== "admin" && (
        <Box my={1} width="100%">
          <AdminUserActivation userId={userId} />
          <AdminUserResetPassword userId={userId} />
        </Box>
      )}
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

      <Box my={1} width="100%">
        <AccessToken isAdmin userId={userId} />
      </Box>
    </Box>
  );
}

export { AdminUser };
