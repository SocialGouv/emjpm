import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { IndividuelInformationFormationForm } from "./IndividuelInformationFormationForm";
import { UPDATE_INDIVIDUEL_FORMATION } from "./mutations";
import { INDIVIDUEL_FORMATION } from "./queries";

const IndividuelInformationFormation = () => {
  const { mandataire } = useContext(UserContext);

  const { data, error, loading } = useQuery(INDIVIDUEL_FORMATION, {
    fetchPolicy: "network-only",
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelFormation] = useMutation(UPDATE_INDIVIDUEL_FORMATION);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await updateIndividuelFormation({
        variables: {
          mandataire_id: mandataire.id,
          cnc_mjpm_annee_obtention: values.cncMjpmAnneeObtention,
          cnc_mjpm_heure_formation: values.cncMjpmHeureFormation,
          cnc_maj_annee_obtention: values.cncMajAnneeObtention,
          cnc_maj_heure_formation: values.cncMajHeureFormation,
          cnc_dpf_annee_obtention: values.cncDpfAnneeObtention,
          cnc_dpf_heure_formation: values.cncDpfHeureFormation,
          niveau_qualification: values.niveauQualification,
          niveau_qualification_secretaire_spe: values.niveauQualificationSecretaireSpe
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

  if (loading || !data || !data.individuel_formations) {
    return null;
  }

  const [formation] = data.individuel_formations;

  return (
    <Box>
      {formation ? (
        <IndividuelInformationFormationForm formation={formation} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>${`Formation et niveau de qualification`}</Text>
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { IndividuelInformationFormation };
