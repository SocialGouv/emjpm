import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import { getOptionValue } from "../../util/option/OptionUtil";
import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { IndividuelInformationExerciceForm } from "./IndividuelInformationExerciceForm";
import { UPDATE_INDIVIDUEL_EXERCICE } from "./mutations";
import { INDIVIDUEL_EXERCICE } from "./queries";

const IndividuelInformationExercice = () => {
  const { mandataire } = useContext(UserContext);

  const { data, error, loading } = useQuery(INDIVIDUEL_EXERCICE, {
    fetchPolicy: "network-only",
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelExercice] = useMutation(UPDATE_INDIVIDUEL_EXERCICE);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await updateIndividuelExercice({
        variables: {
          mandataire_id: mandataire.id,
          estimation_etp: values.estimationEtp.value,
          secretaire_specialise: values.secretaireSpecialise.value,
          secretaire_specialise_etp: getOptionValue(values.secretaireSpecialiseEtp),
          cumul_prepose: values.cumulPrepose.value,
          cumul_prepose_etp: getOptionValue(values.cumulPreposeEtp),
          cumul_delegue_service: values.cumulDelegueService.value,
          cumul_delegue_service_etp: getOptionValue(values.cumulDelegueServiceEtp)
        }
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      setStatus({ error: "Une erreur est survenue, veuillez réessayer plus tard." });
    }

    setSubmitting(false);
  };

  if (error) {
    return null;
  }

  if (loading || !data || !data.individuel_exercices) {
    return null;
  }

  const [exercice] = data.individuel_exercices;

  return (
    <Box>
      {exercice ? (
        <IndividuelInformationExerciceForm exercice={exercice} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>values.{`Modalité d'exercice non disponible`}</Text>,
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { IndividuelInformationExercice };
