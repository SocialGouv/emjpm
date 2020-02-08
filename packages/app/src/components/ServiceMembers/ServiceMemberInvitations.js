import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Field, Heading4, InlineError, Input, Text } from "@socialgouv/emjpm-ui-core";
import { formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { serviceMemberInvitationSchema } from "../../lib/validationSchemas";
import { CREATE_SERVICE_MEMBER_INVITATION, DELETE_SERVICE_MEMBER_INVITATION } from "./mutations";
import { SERVICE_MEMBER_INVITATIONS } from "./queries";

// TODO(paullaunay): use generateToken from Christophe
function generateToken(n) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var token = "";
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return token;
}

const ServiceMemberInvitations = props => {
  const { service } = props;

  const [createServiceMemberInvitation] = useMutation(CREATE_SERVICE_MEMBER_INVITATION);
  const [deleteServiceMemberInvitation] = useMutation(DELETE_SERVICE_MEMBER_INVITATION);
  const { loading, error, data } = useQuery(SERVICE_MEMBER_INVITATIONS, {
    variables: { serviceId: service.id }
  });

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: serviceMemberInvitationSchema
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const serviceMemberInvitations = data.service_member_invitations;

  async function handleSubmit(values, { resetForm, setSubmitting }) {
    await createServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: {
        email: values.email,
        service_id: service.id,
        token: generateToken(8)
      }
    });

    resetForm();
    setSubmitting(false);
  }

  const handleDelete = async id => {
    await deleteServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: { id }
    });
  };

  return (
    <Box mb={6}>
      <Box as="form" onSubmit={formik.handleSubmit} mb={4}>
        <Text mb="1" fontWeight="bold">
          Invitez un nouveau membre au service
          <Text display="inline" color="primary">
            {` ${service.etablissement}`}
          </Text>
          .
        </Text>
        <Text mb="1" color="textSecondary">
          {`Un email contenant les instructions d'inscription sera envoyé.`}
        </Text>
        <Field width={300} mb="1">
          <Input
            value={formik.values.email}
            id="email"
            name="email"
            hasError={formik.errors.email}
            onChange={formik.handleChange}
            placeholder="Email"
          />
          <InlineError message={formik.errors.email} fieldId="email" />
        </Field>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Inviter
        </Button>
      </Box>
      <Box>
        <Heading4 mb={2}>Invitations en attente</Heading4>
        {!!serviceMemberInvitations.length || <Text>Aucune invitations en cours.</Text>}
        {serviceMemberInvitations.map(invitation => (
          <Flex mb={1} key={invitation.email}>
            <Text width={250}>{invitation.email}</Text>
            <Text color="textSecondary" width={300}>
              Invité il y a {formatDistanceToNow(new Date(invitation.sent_at), { locale: fr })}
            </Text>
            <Box
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => handleDelete(invitation.id)}
            >
              Supprimer
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export { ServiceMemberInvitations };
