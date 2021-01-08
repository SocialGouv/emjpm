import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { DirectionEditInformationsForm } from "./DirectionEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { DIRECTION } from "./queries";

const DirectionEditInformations = ({ userId, successLink, cancelLink }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const { data, error, loading } = useQuery(DIRECTION, {
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
      refetchQueries: ["CURRENT_USER_QUERY"],
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
    <DirectionEditInformationsForm
      user={user}
      handleSubmit={handleSubmit}
      cancelLink={cancelLink}
      errorMessage={errorMessage}
    />
  );
};

export { DirectionEditInformations };
