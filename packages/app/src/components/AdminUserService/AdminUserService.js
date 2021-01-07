import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { AdminUserServiceForm } from "./AdminUserServiceForm";
import { EDIT_USER } from "./mutations";
import { USER_SERVICE } from "./queries";

const AdminUserService = ({ userId, successLink, cancelLink }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const { data, error, loading } = useQuery(USER_SERVICE, {
    fetchPolicy: "network-only",
    variables: {
      userId: userId,
    },
  });

  const [editUser] = useMutation(EDIT_USER, {
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
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
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
};

export { AdminUserService };
