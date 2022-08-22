import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import isEmailExists from "~/query-service/emjpm-hasura/isEmailExists";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { DpfiEditInformationsForm } from "./DpfiEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { DPFI } from "./queries";

const DpfiEditInformations = ({
  userId,
  cancelLink,
  successLink,
  isAdmin = false,
}) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const { data, error, loading } = useQuery(DPFI, {
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
  const mandataire = user.dpfi;

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
      const { dpfi_departements = [] } = liste_blanche || {};

      editUser({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          adresse_complement: values.adresse_complement,
          location_adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          departement_code: departement.id,
          suspend_activity: values.suspendActivity,
          suspend_activity_reason: values.suspendActivityReason,
          email: values.email,
          genre: values.genre,
          id: user.id,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          departement_codes: dpfi_departements.map(
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
    <>
      <Helmet>
        <title>{`${user.nom} ${user.prenom} - DPF individuel | e-MJPM`}</title>
      </Helmet>
      <DpfiEditInformationsForm
        mandataire={mandataire}
        handleSubmit={handleSubmit}
        user={user}
        cancelLink={cancelLink}
        errorMessage={errorMessage}
        isAdmin={isAdmin}
      />
    </>
  );
};

export { DpfiEditInformations };
