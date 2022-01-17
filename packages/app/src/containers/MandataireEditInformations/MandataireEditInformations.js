import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import isEmailExists from "~/query-service/emjpm-hasura/isEmailExists";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { MandataireEditInformationsForm } from "./MandataireEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { MANDATAIRE } from "./queries";

const MandataireEditInformations = ({
  userId,
  cancelLink,
  successLink,
  isAdmin = false,
}) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const { data, error, loading } = useQuery(MANDATAIRE, {
    fetchPolicy: "network-only",
    variables: {
      userId,
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
          history.push(`${successLink}`, `${successLink}`, {
            shallow: true,
          });
        }
      },
    }
  );
  useQueryReady(loading2, error2);

  const { departements } = useDepartements();

  const client = useApolloClient();

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const user = data.users[0];
  const mandataire = user.mandataire;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (
      values.email !== user.email &&
      (await isEmailExists(client, values.email))
    ) {
      setErrors({
        email: "Cet email existe déjà",
      });
    } else {
      const codeDepartement = values.geocode.depcode;
      const departement = findDepartementByCodeOrId(departements, {
        code: codeDepartement,
      });

      const { liste_blanche } = mandataire;
      const { mandataire_individuel_departements = [] } = liste_blanche || {};

      editUser({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          adresse: values.adresse,
          use_location_adresse: values.useLocationAdresse,
          location_adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          competences: values.competences,
          departement_code: departement.id,
          dispo_max: parseInt(values.dispo_max),
          suspend_activity: values.suspendActivity,
          suspend_activity_reason: values.suspendActivityReason,
          email: values.email,
          genre: values.genre,
          id: user.id,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          mandataire_id: mandataire.id,
          mandataire_tis: values.tis.map((ti) => ({
            mandataire_id: mandataire.id,
            ti_id: ti,
          })),
          departement_codes: mandataire_individuel_departements.map(
            ({ departement_code }) => departement_code
          ),
          nom: values.nom,
          prenom: values.prenom,
          siret: values.siret ? values.siret : null,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          ville: values.geocode.city,
        },
      });
    }

    setSubmitting(false);
  };

  return (
    <MandataireEditInformationsForm
      mandataire={mandataire}
      handleSubmit={handleSubmit}
      user={user}
      cancelLink={cancelLink}
      errorMessage={errorMessage}
      isAdmin={isAdmin}
    />
  );
};

export { MandataireEditInformations };
