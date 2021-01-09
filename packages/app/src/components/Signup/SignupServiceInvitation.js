import { useApolloClient, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { HeadingTitle } from "~/components/HeadingTitle";
import { isEmailExists } from "~/query-service/EmailQueryService";

import { SERVICE_MEMBER_INVITATION } from "./queries";
import signup from "./signup";
import { SignupServiceInvitationForm } from "./SignupServiceInvitationForm";

export function SignupServiceInvitation(props) {
  const history = useHistory();
  const { token } = props;
  const client = useApolloClient();

  const { data, loading, error } = useQuery(SERVICE_MEMBER_INVITATION, {
    context: {
      headers: {
        "X-Hasura-Invitation-Token": token,
      },
    },
    variables: { token },
  });

  if (loading) {
    return "Loading...";
  }

  if (error || !data.service_member_invitations.length) {
    // history.push("/login");
    return null;
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
          history.push("/login");
        },
      });
    }
  };

  return (
    <Fragment>
      <HeadingTitle
        p="1"
        m={1}
      >{`Création de compte - ${invitation.service.etablissement}`}</HeadingTitle>
      <SignupServiceInvitationForm
        handleSubmit={handleSubmit}
        invitation={invitation}
      />
    </Fragment>
  );
}
