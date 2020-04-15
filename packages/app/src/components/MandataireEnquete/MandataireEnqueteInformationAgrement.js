import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { MandataireEnqueteInformationAgrementForm } from "./MandataireEnqueteInformationAgrementForm";
import { UPDATE_INDIVIDUEL_AGREMENT } from "./mutations";
import { INDIVDUEL_AGREMENT } from "./queries";

export const MandataireEnqueteInformationAgrement = () => {
  const { mandataire } = useContext(UserContext);

  const { data, error, loading } = useQuery(INDIVDUEL_AGREMENT, {
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelAgrement] = useMutation(UPDATE_INDIVIDUEL_AGREMENT);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await updateIndividuelAgrement({
        variables: {
          mandataire_id: mandataire.id,
          debut_activite_avant_2009: values.debutActiviteAvant2009.value,
          annee_debut_activite: values.anneeDebutActivite,
          annee_agrement: values.anneeAgrement
        }
      });
    } catch (error) {
      Sentry.captureException(error);
      setStatus({ error: "Une erreur est survenue, veuillez réessayer plus tard." });
    }

    setSubmitting(false);
  };

  if (error) {
    return null;
  }

  if (loading) {
    return null;
  }

  const [agrement] = data.individuel_agrements;

  return (
    <Box p={5}>
      <MandataireEnqueteInformationAgrementForm agrement={agrement} handleSubmit={handleSubmit} />
    </Box>
  );
};

export default MandataireEnqueteInformationAgrement;
