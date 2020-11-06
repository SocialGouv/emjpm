import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { findDepartementByCodeOrId } from "@emjpm/core";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { PATH } from "../../constants/basePath";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { useDepartements } from "../../util/departements/useDepartements.hook";
import { UserContext } from "../UserContext";
import { MandataireEditInformationsForm } from "./MandataireEditInformationsForm";
import { EDIT_USER } from "./mutations";
import { MANDATAIRE } from "./queries";

const MandataireEditInformations = () => {
  const { id, type } = useContext(UserContext);

  const { data, error, loading } = useQuery(MANDATAIRE, {
    fetchPolicy: "network-only",
    variables: {
      userId: id,
    },
  });

  const [editUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
        shallow: true,
      });
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

  const cancelLink = `${PATH[type]}/informations`;
  const user = data.users[0];
  const mandataire = user.mandataire;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (
      values.email != user.email &&
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
          nom: values.nom,
          prenom: values.prenom,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          ville: values.geocode.city,
        },
      });
    }

    setSubmitting(false);
  };

  return (
    <Box p="5">
      <MandataireEditInformationsForm
        mandataire={mandataire}
        client={client}
        handleSubmit={handleSubmit}
        user={user}
        cancelLink={cancelLink}
      />
    </Box>
  );
};

export { MandataireEditInformations };
