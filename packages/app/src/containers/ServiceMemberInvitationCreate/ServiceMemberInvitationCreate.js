import { useApolloClient, useMutation } from "@apollo/client";

import { Box } from "rebass";

import useUser from "~/hooks/useUser";
import { Heading } from "~/components";

import {
  CREATE_SERVICE_MEMBER_INVITATION,
  SEND_EMAIL_SERVICE_MEMBER_INVITATION,
} from "./mutations";
import { USER_EMAIL_EXISTS } from "./queries";
import { ServiceMemberInvitationForm } from "./ServiceMemberInvitationForm";
import useQueryReady from "~/hooks/useQueryReady";

function ServiceMemberInvitationCreate(props) {
  const { service, isAdmin } = props;

  const user = useUser();
  console.log(user.type === "sdpf");

  const client = useApolloClient();

  const [createServiceMemberInvitation, { loading: loading1, error: error1 }] =
    useMutation(CREATE_SERVICE_MEMBER_INVITATION);
  useQueryReady(loading1, error1);

  const [
    sendEmailServiceMemberInvitation,
    { loading: loading2, error: error2 },
  ] = useMutation(SEND_EMAIL_SERVICE_MEMBER_INVITATION);
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

    const result = await createServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: {
        email: values.email,
        service_id: service.id,
        type: user.type === "sdpf" ? "dpfs" : "service",
      },
    });

    const { id: invitationId } =
      result?.data?.insert_service_member_invitations?.returning?.[0];

    if (invitationId) {
      sendEmailServiceMemberInvitation({
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
        {isAdmin && <ServiceMemberInvitationForm handleSubmit={handleSubmit} />}
      </Box>
    </Box>
  );
}

export { ServiceMemberInvitationCreate };
