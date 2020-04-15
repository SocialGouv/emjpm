import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { PATH } from "../../constants/basePath";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { getLocation } from "../../query-service/LocationQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { UserContext } from "../UserContext";
import { MandataireEnqueteInformationsForm } from "./MandataireEnqueteInformationsForm";
import { UPDATE_MANDATAIRE } from "./mutations";
import { MANDATAIRE } from "./queries";

export const MandataireEnqueteInformations = () => {
  const { id, type } = useContext(UserContext);

  const { data, error, loading } = useQuery(MANDATAIRE, {
    fetchPolicy: "network-only",
    variables: {
      userId: id
    }
  });

  const [updateMandataire] = useMutation(UPDATE_MANDATAIRE);

  const client = useApolloClient();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return null;
  }

  const cancelLink = `${PATH[type]}/informations`;
  const user = data.users[0];
  const mandataire = user.mandataire;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const location = await getLocation(client, {
      address: values.address,
      zipcode: values.zipcode,
      city: values.city
    });

    if (!location || !location.department) {
      setErrors({
        code_postal: "Merci de renseigner un code postal valide"
      });
    }
    const { department, geolocation } = location;

    if (values.siret != mandataire.siret && (await isSiretExists(client, values.siret))) {
      setErrors({
        siret: "Ce SIRET existe déjà"
      });
    } else if (values.email != user.email && (await isEmailExists(client, values.email))) {
      setErrors({
        email: "Cet email existe déjà"
      });
    } else {
      await updateMandataire({
        variables: {
          id: user.id,
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          adresse: values.address,
          code_postal: values.zipcode,
          department_id: department.id,
          dispo_max: parseInt(values.dispo_max),
          genre: values.genre.value,
          siret: values.siret,
          telephone: values.telephone,
          telephone_portable: values.telephone_portable,
          ville: values.city.toUpperCase(),
          latitude: geolocation ? geolocation.latitude : null,
          longitude: geolocation ? geolocation.longitude : null,
          competences: values.competences
        }
      });
    }

    setSubmitting(false);
  };

  return (
    <Box p={3}>
      <MandataireEnqueteInformationsForm
        mandataire={mandataire}
        client={client}
        handleSubmit={handleSubmit}
        user={user}
        cancelLink={cancelLink}
      />
    </Box>
  );
};

export default MandataireEnqueteInformations;
