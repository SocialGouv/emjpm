import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";
import { Helmet } from "react-helmet";

import useQueryReady from "~/hooks/useQueryReady";
import { GreffierEditInformationsForm } from "./GreffierEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { GREFFIER } from "./queries";

function GreffierEditInformations({ userId, successLink, cancelLink }) {
  const history = useHistory();
  const { data, error, loading } = useQuery(GREFFIER, {
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
        shareEmail: values.share_email,
        genre: values.genre,
      },
    });

    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{`${user.nom} ${user.prenom} | e-MJPM`}</title>
      </Helmet>
      <Box p="5">
        <GreffierEditInformationsForm
          user={user}
          handleSubmit={handleSubmit}
          tribunaux={tribunaux}
          cancelLink={cancelLink}
        />
      </Box>
    </>
  );
}

export { GreffierEditInformations };
