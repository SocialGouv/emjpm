import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Field, Heading4, InlineError, Input, Text } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";
import { Trash } from "styled-icons/boxicons-regular";
import { v4 as uuid } from "uuid";

import { serviceMemberInvitationSchema } from "../../lib/validationSchemas";
import { CREATE_SERVICE_MEMBER_INVITATION, DELETE_SERVICE_MEMBER_INVITATION } from "./mutations";
import { SERVICE_MEMBER_INVITATIONS, USER_EMAIL_EXISTS } from "./queries";
import {
  listActionsStyle,
  listActionStyle,
  listDateStyle,
  listEmailStyle,
  listIdStyle,
  listStyle
} from "./styles";

const ServiceMemberInvitations = props => {
  const { service } = props;

  const client = useApolloClient();
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
        service_id: service.id,
        token: uuid()
      }
    });

    resetForm();
  }

  const handleDelete = async id => {
    await deleteServiceMemberInvitation({
      refetchQueries: ["ServiceMemberInvitations"],
      variables: { id }
    });
  };

  return (
    <Box>
      <Box as="form" onSubmit={formik.handleSubmit} mb={4}>
        <Heading4 mb="2">
          Invitez un nouveau membre au service
          <Text display="inline" color="primary">{` ${service.etablissement}`}</Text>
        </Heading4>
        <Text mb="1" color="textSecondary">
          {`Un email contenant les instructions d'inscription sera envoyé.`}
        </Text>
        <Field width={300} mb="1">
          <Input
            value={formik.values.email}
            id="email"
            name="email"
            hasError={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            placeholder="Email"
          />
          {formik.touched.email && <InlineError message={formik.errors.email} fieldId="email" />}
        </Field>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Inviter
        </Button>
      </Box>
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
              <Box sx={listActionStyle} onClick={() => handleDelete(invitation.id)}>
                <Trash title="Supprimer" size="22" />
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export { ServiceMemberInvitations };
