import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";

import { Box, Flex } from "rebass";

import { Heading, Text } from "~/components";

import { DELETE_ADMIN_INVITATION } from "./mutations";
import { ADMIN_INVITATIONS } from "./queries";
import {
  listActionsStyle,
  listActionStyle,
  listDateStyle,
  listEmailStyle,
  listStyle,
} from "./styles";

import useQueryReady from "~/hooks/useQueryReady";

function AdminInvitations() {
  const { loading, error, data } = useQuery(ADMIN_INVITATIONS, {
    variables: {},
  });

  const [deleteServiceMemberInvitation, { loading: loading2, error: error2 }] =
    useMutation(DELETE_ADMIN_INVITATION);
  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const handleDelete = async (id) => {
    await deleteServiceMemberInvitation({
      refetchQueries: ["AdminInvitations"],
      variables: { id },
    });
  };

  const adminInvitations = data.admin_invitations;
  return (
    <>
      {adminInvitations.length ? (
        <Box mb={4}>
          <Heading size={2} width={[1]} mb="2">
            Invitations en attente ({adminInvitations.length})
          </Heading>
          <Box>
            {adminInvitations.map((invitation, i) => (
              <Flex sx={listStyle} index={i} key={invitation.id}>
                <Box sx={listEmailStyle}>{invitation.email}</Box>
                <Text sx={listDateStyle}>
                  {`Invité le ${format(
                    new Date(invitation.created_at),
                    "dd/MM/yyyy"
                  )}`}
                </Text>
                <Box sx={listActionsStyle}>
                  <Box
                    sx={listActionStyle}
                    onClick={() => handleDelete(invitation.id)}
                    as="button"
                    title="Supprimer l'invitation"
                    aria-label="Supprimer l'invitation"
                  >
                    {"Supprimer l'invitation"}
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
}

export { AdminInvitations };
