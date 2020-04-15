import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";

import { getOptionValue } from "../../util/option/OptionUtil";
import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { MandataireEnqueteInformationExerciceForm } from "./MandataireEnqueteInformationExerciceForm";
import { UPDATE_INDIVIDUEL_EXERCICE } from "./mutations";
import { INDIVIDUEL_EXERCICE } from "./queries";

export const MandataireEnqueteInformationExercice = () => {
  const { mandataire } = useContext(UserContext);

  const { data, error, loading } = useQuery(INDIVIDUEL_EXERCICE, {
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelExercice] = useMutation(UPDATE_INDIVIDUEL_EXERCICE);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await updateIndividuelExercice({
        variables: {
          mandataire_id: mandataire.id,
          estimation_etp: values.estimationEtp.value,
          secretariat_specialise: values.secretariatSpecialise.value,
          secretariat_specialise_etp: values.secretariatSpecialiseEtp || null,
          cumul_prepose: values.cumulPrepose.value,
          cumul_prepose_etp: getOptionValue(values.cumulPreposeEtp),
          cumul_delegue_service: values.cumulDelegueService.value,
          cumul_delegue_service_etp: getOptionValue(values.cumulDelegueServiceEtp)
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

  if (loading || !data || !data.individuel_exercices) {
    return null;
  }

  const [exercice] = data.individuel_exercices;
  return (
    <MandataireEnqueteInformationExerciceForm exercice={exercice} handleSubmit={handleSubmit} />
  );
};

export default MandataireEnqueteInformationExercice;
