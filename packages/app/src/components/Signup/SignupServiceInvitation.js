import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { Card, Heading1, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { isEmailExists } from "../../query-service/EmailQueryService";
import { SERVICE_MEMBER_INVITATION } from "./queries";
import signup from "./signup";
import { SignupServiceInvitationForm } from "./SignupServiceInvitationForm";
import { cardStyle, grayBox } from "./style";

export const SignupServiceInvitation = (props) => {
  const { token } = props;
  const client = useApolloClient();
  const { data, loading, error } = useQuery(SERVICE_MEMBER_INVITATION, {
    variables: { token },
  });

  if (loading) {
    return "Loading...";
  }

  if (error || !data.service_member_invitations.length) {
    return Router.push("/login");
  }

  const [invitation] = data.service_member_invitations;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const exists = await isEmailExists(client, values.email);

    if (exists) {
      setErrors({ email: "Cet email existe déjà" });
    } else {
      signup({
        body: {
          invitation,
          service: {
            service_id: invitation.service_id,
          },
          user: {
            confirmPassword: values.confirmPassword,
            email: values.email,
            nom: values.nom,
            password: values.password,
            prenom: values.prenom,
            type: "service",
            username: values.email,
          },
        },
        onComplete: () => {
          setSubmitting(false);
        },
        onError: (errors) => {
          console.error(errors);
          setErrors(errors);
        },
        onSuccess: () => {
          Router.push("/login");
        },
      });
    }
  };

  return (
    <Fragment>
      <Heading1 px="1">{`Création de compte - ${invitation.service.etablissement}`}</Heading1>
      <Card sx={cardStyle}>
        <Flex mt="3">
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="140px">
              <Heading4>{`Information personnelle`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                Ces informations permettent de vous identifier.
              </Text>
            </Box>
            <Box height="160px">
              <Heading4>{`Identifiants de connexion`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} mb="4" width={[1, 3 / 5]}>
            <SignupServiceInvitationForm
              handleSubmit={handleSubmit}
              invitation={invitation}
            />
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};
