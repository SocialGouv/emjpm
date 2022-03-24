import { useApolloClient, useQuery } from "@apollo/client";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { HeadingTitle } from "~/containers/HeadingTitle";
import isEmailExists from "~/query-service/emjpm-hasura/isEmailExists";

import { ADMIN_INVITATION } from "./queries";
import signup from "./signup";
import { SignupAdminInvitationForm } from "./SignupAdminInvitationForm";
import useQueryReady from "~/hooks/useQueryReady";

export function SignupAdminInvitation(props) {
  const history = useHistory();
  const { token } = props;
  const client = useApolloClient();

  const { data, loading, error } = useQuery(ADMIN_INVITATION, {
    context: {
      headers: {
        "X-Hasura-Invitation-Token": token,
      },
    },
    variables: { token },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  if (error || !data.admin_invitations.length) {
    history.push("/login");
    return null;
  }

  const [invitation] = data.admin_invitations;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const exists = await isEmailExists(client, values.email);
    if (exists) {
      setErrors({ email: "Cet email existe déjà" });
    } else {
      signup({
        body: {
          invitation: {
            token,
            type: "admin",
          },
          user: {
            confirmPassword: values.confirmPassword,
            email: values.email,
            nom: values.nom,
            password: values.password,
            prenom: values.prenom,
            secret_2fa: values.secret_2fa,
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
          toast.success("Nouveau compte créé avec succès");
          history.push("/login");
        },
      });
    }
  };

  return (
    <>
      <HeadingTitle p="1" m={1}>{`Création de compte admin`}</HeadingTitle>
      <SignupAdminInvitationForm
        handleSubmit={handleSubmit}
        invitation={invitation}
      />
    </>
  );
}
