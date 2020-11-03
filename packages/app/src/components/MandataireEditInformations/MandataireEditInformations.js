import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext } from "react";
import { Box } from "rebass";

import { PATH } from "../../constants/basePath";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { getLocation } from "../../query-service/LocationQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
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
    const location = await getLocation(client, {
      address: values.address,
      city: values.city,
      zipcode: values.zipcode,
    });

    if (!location || !location.department) {
      setErrors({
        code_postal: "Merci de renseigner un code postal valide",
      });
    }

    const { department, geolocation } = location;

    if (
      values.siret != mandataire.siret &&
      (await isSiretExists(client, values.siret))
    ) {
      setErrors({
        siret: "Ce SIRET existe déjà",
      });
    } else if (
      values.email != user.email &&
      (await isEmailExists(client, values.email))
    ) {
      setErrors({
        email: "Cet email existe déjà",
      });
    } else {
      editUser({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          adresse: values.address,
          code_postal: values.zipcode,
          competences: values.competences,
          department_id: department.id,
          dispo_max: parseInt(values.dispo_max),
          email: values.email,
          genre: values.genre,
          id: user.id,
          latitude: geolocation ? geolocation.latitude : null,
          longitude: geolocation ? geolocation.longitude : null,
          nom: values.nom,
          prenom: values.prenom,
          siret: values.siret,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          ville: values.city.toUpperCase(),
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
