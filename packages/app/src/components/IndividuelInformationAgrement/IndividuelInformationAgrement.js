import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { Box } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { IndividuelInformationAgrementForm } from "./IndividuelInformationAgrementForm";
import { IndividuelInformationAgrementView } from "./IndividuelInformationAgrementView";
import { UPDATE_INDIVIDUEL_AGREMENT } from "./mutations";
import { INDIVDUEL_AGREMENT } from "./queries";

const IndividuelInformationAgrement = () => {
  const { mandataire } = useContext(UserContext);

  const [edit, setEdit] = useState(false);

  const { data, error, loading } = useQuery(INDIVDUEL_AGREMENT, {
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelAgrement] = useMutation(UPDATE_INDIVIDUEL_AGREMENT);

  const handleEdit = () => {
    setEdit(!edit);
  };

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
      setEdit(false);
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
      {edit ? (
        <IndividuelInformationAgrementForm
          agrement={agrement}
          handleSubmit={handleSubmit}
          handleCancel={() => setEdit(false)}
        />
      ) : (
        <IndividuelInformationAgrementView agrement={agrement} handleEdit={handleEdit} />
      )}
    </Box>
  );
};

export { IndividuelInformationAgrement };
