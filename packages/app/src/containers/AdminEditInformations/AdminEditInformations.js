import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { AdminEditInformationsForm } from "./AdminEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { ADMIN } from "./queries";

function AdminEditInformations({ userId, successLink, cancelLink }) {
  const history = useHistory();
  const { data, error, loading } = useQuery(ADMIN, {
    fetchPolicy: "network-only",
    variables: {
      userId: userId,
    },
  });

  const [editUser, { loading: loading2, error: error2 }] = useMutation(
    EDIT_USER,
    {
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
    <AdminEditInformationsForm
      user={user}
      handleSubmit={handleSubmit}
      cancelLink={cancelLink}
    />
  );
}

export { AdminEditInformations };
