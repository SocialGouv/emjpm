import { useApolloClient, useMutation } from "@apollo/client";

import { Box } from "rebass";

import { Heading } from "~/components";

import {
  CREATE_ADMIN_INVITATION,
  SEND_EMAIL_ADMIN_INVITATION,
} from "./mutations";
import { USER_EMAIL_EXISTS } from "./queries";
import { AdminInvitationForm } from "./AdminInvitationForm";
import useQueryReady from "~/hooks/useQueryReady";

function AdminInvitationCreate() {
  const client = useApolloClient();

  const [createAdminInvitation, { loading: loading1, error: error1 }] =
    useMutation(CREATE_ADMIN_INVITATION);
  useQueryReady(loading1, error1);

  const [sendEmailAdminInvitation, { loading: loading2, error: error2 }] =
    useMutation(SEND_EMAIL_ADMIN_INVITATION);
  useQueryReady(loading2, error2);

  async function handleSubmit(values, { resetForm, setErrors }) {
    const { data } = await client.query({
      query: USER_EMAIL_EXISTS,
      variables: { email: values.email },
    });

    if (data.users.length) {
      setErrors({ email: "Cet email existe déjà" });
      return;
    }

    const result = await createAdminInvitation({
      refetchQueries: ["AdminInvitations"],
      variables: {
        email: values.email,
      },
    });

    const { id: invitationId } =
      result?.data?.insert_admin_invitations?.returning?.[0];

    if (invitationId) {
      sendEmailAdminInvitation({
        variables: {
          invitation_id: invitationId,
        },
      });
    }

    resetForm();
  }

  return (
    <Box mb={4}>
      <Heading size={2} width={[1]} mb="2">
        Inviter une personne
      </Heading>
      <Box bg="white">
        <AdminInvitationForm handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}

export { AdminInvitationCreate };
