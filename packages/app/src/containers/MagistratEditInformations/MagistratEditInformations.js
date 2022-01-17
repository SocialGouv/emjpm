import { useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { MagistratEditInformationsForm } from "./MagistratEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { MAGISTRAT } from "./queries";

function MagistratEditInformations({ userId, successLink, cancelLink }) {
  const history = useHistory();
  const { data, error, loading } = useQuery(MAGISTRAT, {
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
        <MagistratEditInformationsForm
          user={user}
          handleSubmit={handleSubmit}
          tribunaux={tribunaux}
          cancelLink={cancelLink}
        />
      </Box>
    </>
  );
}

export { MagistratEditInformations };
