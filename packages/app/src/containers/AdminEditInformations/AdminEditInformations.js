import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { AdminEditInformationsForm } from "./AdminEditInformationsForm";
import { EDIT_USER, EDIT_USER_AND_QRCODE } from "./mutations";
import { ADMIN } from "./queries";

function AdminEditInformations({ userId, successLink, cancelLink, isAdmin }) {
  const history = useHistory();
  const { data, error, loading } = useQuery(ADMIN, {
    fetchPolicy: "network-only",
    variables: {
      userId: userId,
    },
  });

  const onUpdate = () => {
    if (successLink) {
      history.push(successLink, successLink, {
        shallow: true,
      });
    }
  };

  const [editUser, { loading: loading2, error: error2 }] = useMutation(
    EDIT_USER,
    {
      update: onUpdate,
    }
  );
  const [editUserAndQrCode, { loading: loading3, error: error3 }] = useMutation(
    EDIT_USER_AND_QRCODE,
    {
      update: onUpdate,
    }
  );

  useQueryReady(loading2, error2);
  useQueryReady(loading3, error3);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { users_by_pk: user } = data;

  const handleSubmit = async (values, { setSubmitting }) => {
    const editFunc = values.secret_2fa ? editUserAndQrCode : editUser;
    const variables = {
      email: values.email.toLowerCase(),
      id: userId,
      nom: values.nom,
      prenom: values.prenom,
    };
    if (values.secret_2fa) {
      variables.secret_2fa = values.secret_2fa;
    }
    await editFunc({
      refetchQueries: ["CURRENT_USER_QUERY"],
      variables,
    });

    setSubmitting(false);
  };

  return (
    <AdminEditInformationsForm
      user={user}
      handleSubmit={handleSubmit}
      cancelLink={cancelLink}
      isAdmin={isAdmin}
    />
  );
}

export { AdminEditInformations };
