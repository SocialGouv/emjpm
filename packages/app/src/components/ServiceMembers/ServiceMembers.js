import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  BoxWrapper,
  Button,
  Card,
  Field,
  Heading2,
  Heading4,
  Input
} from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { CREATE_SERVICE_MEMBER_INVITATION } from "./mutations";
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

const ServiceMembers = props => {
  const { service, members } = props;

  const [createServiceMemberInvitation] = useMutation(CREATE_SERVICE_MEMBER_INVITATION);

  const { loading, error, data } = useQuery(SERVICE_MEMBER_INVITATIONS, {
    variables: { serviceId: service.id }
  });

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit
    // validationSchema: adminEditorSchema,
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const serviceMemberInvitations = data.service_member_invitations;

  const handleSubmit = async (values, { setSubmitting }) => {
    await createServiceMemberInvitation({
      variables: {
        email: values.email,
        created_at: new Date(),
        service_id: service.id,
        token: generateToken(8)
      }
    });

    setSubmitting(false);
  };

  // console.log(members);

  return (
    <BoxWrapper mt={6} px="0">
      <Heading2 width={[1]} mb="2">
        Gestion des comptes
      </Heading2>
      <Card width={[1]}>
        <form onSubmit={formik.handleSubmit}>
          <Flex>
            <Field width={[3 / 4]}>
              <Input
                value={formik.values.email}
                id="email"
                name="email"
                hasError={formik.errors.email && formik.touched.email}
                onChange={formik.handleChange}
                placeholder="Email"
              />
            </Field>
            <Box width={[1 / 4]}>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Inviter
              </Button>
            </Box>
          </Flex>
        </form>
        <Box>
          <Heading4>Membres</Heading4>
          {members.map(({ user }) => (
            <Flex mb={2} key={user.email}>
              <Box>{user.email}</Box>
            </Flex>
          ))}
        </Box>
        <Box>
          <Heading4>Invitations</Heading4>
          {serviceMemberInvitations.map(invitation => (
            <Flex mb={2} key={invitation.email}>
              <Box>{invitation.email}</Box>
              <Box>{invitation.created_at}</Box>
            </Flex>
          ))}
        </Box>
      </Card>
    </BoxWrapper>
  );
};

export { ServiceMembers };
