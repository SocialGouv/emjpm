import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { MagistratEditInformationsForm } from "./MagistratEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { MAGISTRAT } from "./queries";

function MagistratEditInformations({ userId, successLink, cancelLink }) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const { data, error, loading } = useQuery(MAGISTRAT, {
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

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user, tis: tribunaux } = data;

  const handleSubmit = async (values, { setSubmitting }) => {
    await editUser({
      refetchQueries: ["CURRENT_USER_QUERY"],
      variables: {
        cabinet: values.cabinet,
        email: values.email.toLowerCase(),
        id: userId,
        nom: values.nom,
        prenom: values.prenom,
        tiId: values.ti,
      },
    });

    setSubmitting(false);
  };

  return (
    <Box p="5">
      <MagistratEditInformationsForm
        user={user}
        handleSubmit={handleSubmit}
        tribunaux={tribunaux}
        cancelLink={cancelLink}
        errorMessage={errorMessage}
      />
    </Box>
  );
}

export { MagistratEditInformations };
