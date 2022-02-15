import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";

import { Box, Flex } from "rebass";

import { Heading, Text } from "~/components";

import { DELETE_SERVICE_MEMBER_INVITATION } from "./mutations";
import { SERVICE_MEMBER_INVITATIONS } from "./queries";
import {
  listActionsStyle,
  listActionStyle,
  listDateStyle,
  listEmailStyle,
  listStyle,
} from "./styles";

import useQueryReady from "~/hooks/useQueryReady";

function ServiceMemberInvitations(props) {
  const { service, isAdmin } = props;

  const { loading, error, data } = useQuery(SERVICE_MEMBER_INVITATIONS, {
    variables: { serviceId: service.id },
  });

  const [deleteServiceMemberInvitation, { loading: loading2, error: error2 }] =
    useMutation(DELETE_SERVICE_MEMBER_INVITATION);
  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const handleDelete = async (id) => {
    await deleteServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: { id },
    });
  };

  const serviceMemberInvitations = data.service_member_invitations;
  return (
    <>
      {serviceMemberInvitations.length ? (
        <Box mb={4}>
          <Heading size={2} width={[1]} mb="2">
            Invitations en attente ({serviceMemberInvitations.length})
          </Heading>
          <Box>
            {serviceMemberInvitations.map((invitation, i) => (
              <Flex sx={listStyle} index={i} key={invitation.id}>
                <Box sx={listEmailStyle}>{invitation.email}</Box>
                <Text sx={listDateStyle}>
                  {`Invité le ${format(
                    new Date(invitation.created_at),
                    "dd/MM/yyyy"
                  )}`}
                </Text>
                <Box sx={listActionsStyle}>
                  {isAdmin && (
                    <Box
                      sx={listActionStyle}
                      onClick={() => handleDelete(invitation.id)}
                      as="button"
                      title="Supprimer l'utilisateur du service"

                      aria-label="Supprimer l'utilisateur du service"

                    >
                      {"Supprimer l'invitation"}
                    </Box>
                  )}
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
}

export { ServiceMemberInvitations };
