import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { AdminUserServiceForm } from "./AdminUserServiceForm";
import { EDIT_USER } from "./mutations";
import { USER_SERVICE } from "./queries";

function AdminUserService({ userId, successLink, cancelLink }) {
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const { data, error, loading } = useQuery(USER_SERVICE, {
    fetchPolicy: "network-only",
    variables: {
      userId: userId,
    },
  });

  const [editUser, { loading: loading2, error: error2 }] = useMutation(
    EDIT_USER,
    {
      onError(error) {
        setErrorMessage(error);
      },
      update() {
        if (successLink) {
          history.push(successLink, successLink, {
            shallow: true,
          });
        }
      },
    }
  );

  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user } = data;

  const handleSubmit = async (values, { setSubmitting }) => {
    await editUser({
      variables: {
        email: values.email.toLowerCase(),
        id: userId,
        nom: values.nom,
        prenom: values.prenom,
      },
    });

    setSubmitting(false);
  };

  return (
    <AdminUserServiceForm
      user={user}
      handleSubmit={handleSubmit}
      cancelLink={cancelLink}
      errorMessage={errorMessage}
    />
  );
}

export { AdminUserService };
