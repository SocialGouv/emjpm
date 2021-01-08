import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { isEmailExists } from "~/query-service/EmailQueryService";
import { useDepartements } from "~/util/departements/useDepartements.hook";

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

  const [editUser] = useMutation(EDIT_USER, {
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
  });

  const { departements } = useDepartements();

  const client = useApolloClient();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
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

      editUser({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          competences: values.competences,
          department_id: departement.id,
          dispo_max: parseInt(values.dispo_max),
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
