import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import useQueryReady from "~/hooks/useQueryReady";
import { AdminUserSdpfForm } from "./AdminUserSdpfForm";
import { EDIT_USER } from "./mutations";
import { USER_SDPF } from "./queries";

function AdminUserSdpf({ userId, successLink, cancelLink }) {
  const history = useHistory();
  const { data, error, loading } = useQuery(USER_SDPF, {
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

  const {
    sdpf_members: [{ sdpf: service }],
  } = user;

  const handleSubmit = async (values, { setSubmitting }) => {
    await editUser({
      variables: {
        user_id: userId,
        user_email: values.user_email.toLowerCase(),
        user_nom: values.user_nom,
        user_prenom: values.user_prenom,
        user_genre: values.user_genre,
        adresse: values.adresse,
        adresse_complement: values.adresse_complement,
        location_adresse: values.geocode.label,
        code_postal: values.geocode.postcode,
        ville: values.geocode.city,
        dispo_max: values.dispo_max,
        suspend_activity: values.suspendActivity,
        suspend_activity_reason: values.suspendActivityReason,
        use_location_adresse: values.useLocationAdresse,
        email: values.email,
        etablissement: values.etablissement,
        latitude: values.geocode.latitude,
        longitude: values.geocode.longitude,
        nom: values.nom,
        prenom: values.prenom,
        genre: values.genre,
        etablissement: values.etablissement,
        service_id: service.id,

        telephone: values.telephone,
      },
    });

    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{`${user.nom} ${user.prenom} | e-MJPM`}</title>
      </Helmet>
      <AdminUserSdpfForm
        user={user}
        handleSubmit={handleSubmit}
        cancelLink={cancelLink}
      />
    </>
  );
}

export { AdminUserSdpf };
