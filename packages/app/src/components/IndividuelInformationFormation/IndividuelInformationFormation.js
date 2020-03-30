import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { Box } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { IndividuelInformationFormationForm } from "./IndividuelInformationFormationForm";
import { IndividuelInformationFormationView } from "./IndividuelInformationFormationView";
import { UPDATE_INDIVIDUEL_FORMATION } from "./mutations";
import { INDIVIDUEL_FORMATION } from "./queries";

const IndividuelInformationFormation = () => {
  const { mandataire } = useContext(UserContext);

  const [edit, setEdit] = useState(false);

  const { data, error, loading } = useQuery(INDIVIDUEL_FORMATION, {
    variable: { mandataire_id: mandataire.id }
  });

  const [updateIndividuelFormation] = useMutation(UPDATE_INDIVIDUEL_FORMATION);

  const handleEdit = () => {
    setEdit(!edit);
  };

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

  if (loading || !data || !data.individuel_formations) {
    return null;
  }

  const [formation] = data.individuel_formations;

  return (
    <Box>
      {edit ? (
        <IndividuelInformationFormationForm
          formation={formation}
          handleSubmit={handleSubmit}
          handleCancel={() => setEdit(false)}
        />
      ) : (
        <IndividuelInformationFormationView formation={formation} handleEdit={handleEdit} />
      )}
    </Box>
  );
};

export { IndividuelInformationFormation };
