import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { CREATE_SERVICE_MEMBER_INVITATION } from "./mutations";
import { USER_EMAIL_EXISTS } from "./queries";
import { ServiceMemberInvitationForm } from "./ServiceMemberInvitationForm";

const ServiceMemberInvitationCreate = props => {
  const { service, isAdmin } = props;

  const client = useApolloClient();
  const [createServiceMemberInvitation] = useMutation(CREATE_SERVICE_MEMBER_INVITATION);

  async function handleSubmit(values, { resetForm, setErrors }) {
    const { data } = await client.query({
      query: USER_EMAIL_EXISTS,
      variables: { email: values.email }
    });

    if (data.users.length) {
      setErrors({ email: "Cet email existe déjà" });
      return;
    }

    await createServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: {
        email: values.email,
        service_id: service.id
      }
    });

    resetForm();
  }

  return (
    <Box mb={4}>
      <Heading2 width={[1]} mb="2">
        Inviter une personne
      </Heading2>
      <Box bg="white">{isAdmin && <ServiceMemberInvitationForm handleSubmit={handleSubmit} />}</Box>
    </Box>
  );
};

export { ServiceMemberInvitationCreate };
