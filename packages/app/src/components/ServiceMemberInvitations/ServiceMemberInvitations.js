import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Text } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";
import { Trash } from "styled-icons/boxicons-regular";

import { CREATE_SERVICE_MEMBER_INVITATION, DELETE_SERVICE_MEMBER_INVITATION } from "./mutations";
import { SERVICE_MEMBER_INVITATIONS, USER_EMAIL_EXISTS } from "./queries";
import { ServiceMemberInvitationForm } from "./ServiceMemberInvitationForm";
import {
  listActionsStyle,
  listActionStyle,
  listDateStyle,
  listEmailStyle,
  listIdStyle,
  listStyle
} from "./styles";

const ServiceMemberInvitations = props => {
  const { service, isAdmin } = props;

  const client = useApolloClient();
  const [createServiceMemberInvitation] = useMutation(CREATE_SERVICE_MEMBER_INVITATION);
  const [deleteServiceMemberInvitation] = useMutation(DELETE_SERVICE_MEMBER_INVITATION);
  const { loading, error, data } = useQuery(SERVICE_MEMBER_INVITATIONS, {
    variables: { serviceId: service.id }
  });

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

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const handleDelete = async id => {
    await deleteServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: { id }
    });
  };

  const serviceMemberInvitations = data.service_member_invitations;

  return (
    <Box mb={4}>
      <Heading2 width={[1]} mb="2">
        Invitations
      </Heading2>
      <Card width={[1]} p={4} mb={4}>
        {isAdmin && <ServiceMemberInvitationForm handleSubmit={handleSubmit} />}
        <Box mb={4}>
          <Heading4 mb="2">Invitations en attente ({serviceMemberInvitations.length})</Heading4>
          {!!serviceMemberInvitations.length || <Text>Aucune invitations en attente.</Text>}
          {serviceMemberInvitations.map((invitation, i) => (
            <Flex sx={() => listStyle(i)} index={i} key={invitation.email}>
              <Box sx={listIdStyle}>{invitation.id}.</Box>
              <Box sx={listEmailStyle}>{invitation.email}</Box>
              <Text sx={listDateStyle}>
                {`Invité le ${format(new Date(invitation.sent_at), "dd/MM/yyyy")}`}
              </Text>
              <Box sx={listActionsStyle}>
                {isAdmin && (
                  <Box sx={listActionStyle} onClick={() => handleDelete(invitation.id)}>
                    <Trash title="Supprimer" size="22" />
                  </Box>
                )}
              </Box>
            </Flex>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export { ServiceMemberInvitations };
