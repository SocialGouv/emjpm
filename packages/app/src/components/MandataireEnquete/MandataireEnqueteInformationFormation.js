import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { MandataireEnqueteInformationFormationForm } from "./MandataireEnqueteInformationFormationForm";
import { UPDATE_INDIVIDUEL_FORMATION } from "./mutations";
import { INDIVIDUEL_FORMATION } from "./queries";

export const MandataireEnqueteInformationFormation = () => {
  const { mandataire } = useContext(UserContext);

  const { data, error, loading } = useQuery(INDIVIDUEL_FORMATION, {
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelFormation] = useMutation(UPDATE_INDIVIDUEL_FORMATION);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const valueOf = value => {
      return value ? value : null;
    };
    try {
      await updateIndividuelFormation({
        variables: {
          mandataire_id: mandataire.id,
          cnc_mjpm_annee_obtention: valueOf(values.cncMjpmAnneeObtention),
          cnc_mjpm_heure_formation: valueOf(values.cncMjpmHeureFormation),
          cnc_maj_annee_obtention: valueOf(values.cncMajAnneeObtention),
          cnc_maj_heure_formation: valueOf(values.cncMajHeureFormation),
          cnc_dpf_annee_obtention: valueOf(values.cncDpfAnneeObtention),
          cnc_dpf_heure_formation: valueOf(values.cncDpfHeureFormation),
          niveau_qualification: valueOf(values.niveauQualification),
          niveau_qualification_secretaire_spe: valueOf(values.niveauQualificationSecretaireSpe)
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
    <Box p={5}>
      <MandataireEnqueteInformationFormationForm
        formation={formation}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default MandataireEnqueteInformationFormation;
