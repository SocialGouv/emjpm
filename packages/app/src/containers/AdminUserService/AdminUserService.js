import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { AdminUserServiceForm } from "./AdminUserServiceForm";
import { EDIT_USER } from "./mutations";
import { USER_SERVICE } from "./queries";

function AdminUserService({ userId, successLink, cancelLink }) {
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
    service_members: [{ service }],
  } = user;

  const handleSubmit = async (values, { setSubmitting }) => {
    await editUser({
      variables: {
        user_id: userId,
        user_email: values.user_email.toLowerCase(),
        user_nom: values.user_nom,
        user_prenom: values.user_prenom,
        adresse: values.adresse,
        adresse_complement: values.adresse_complement,
        location_adresse: values.geocode.label,
        code_postal: values.geocode.postcode,
        ville: values.geocode.city,
        competences: values.competences,
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
        service_id: service.id,
        service_tis: values.tis.map((ti) => ({
          service_id: service.id,
          ti_id: ti,
        })),
        telephone: values.telephone,
      },
    });

    setSubmitting(false);
  };

  return (
    <AdminUserServiceForm
      user={user}
      handleSubmit={handleSubmit}
      cancelLink={cancelLink}
    />
  );
}

export { AdminUserService };
