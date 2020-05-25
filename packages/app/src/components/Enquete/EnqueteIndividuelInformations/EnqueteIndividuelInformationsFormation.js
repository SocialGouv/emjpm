import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnqueteIndividuelInformationsFormationForm } from "./EnqueteIndividuelInformationsFormationForm";
import { UPDATE_ENQUETE_INFORMATIONS_FORMATION } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION } from "./queries";

export const EnqueteIndividuelInformationsFormation = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse, mandataireId, enqueteId } = props;
  const { enquete_reponses_agrements_formations_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION, {
    variables: {
      id: enquete_reponses_agrements_formations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_FORMATION, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
        variables: { id: enquete_reponses_agrements_formations_id }
      }
    ]
  });

  return (
    <EnqueteIndividuelInformationsFormationForm
      goToPrevPage={goToPrevPage}
      loading={loading}
      data={data ? data.agrementsFormations || {} : {}}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: enquete_reponses_agrements_formations_id,
            cnc_dpf_annee_obtention: values.cnc_dpf_annee_obtention
              ? Number(values.cnc_dpf_annee_obtention)
              : null,
            cnc_dpf_heure_formation: values.cnc_dpf_heure_formation
              ? Number(values.cnc_dpf_heure_formation)
              : null,
            cnc_maj_annee_obtention: values.cnc_maj_annee_obtention
              ? Number(values.cnc_maj_annee_obtention)
              : null,
            cnc_maj_heure_formation: values.cnc_maj_heure_formation
              ? Number(values.cnc_maj_heure_formation)
              : null,
            cnc_mjpm_annee_obtention: values.cnc_mjpm_annee_obtention
              ? Number(values.cnc_mjpm_annee_obtention)
              : null,
            cnc_mjpm_heure_formation: values.cnc_mjpm_heure_formation
              ? Number(values.cnc_mjpm_heure_formation)
              : null,
            cumul_delegue_service: values.cumul_delegue_service || null,
            cumul_delegue_service_etp: values.cumul_delegue_service_etp || null,
            cumul_prepose: values.cumul_prepose || null,
            cumul_prepose_etp: values.cumul_prepose_etp || null,
            debut_activite_avant_2009: values.debut_activite_avant_2009 || null,
            niveau_qualification: values.niveau_qualification
              ? Number(values.niveau_qualification)
              : null,
            niveau_qualification_secretaire_spe: values.niveau_qualification_secretaire_spe
              ? Number(values.niveau_qualification_secretaire_spe)
              : null,
            secretaire_specialise: values.secretaire_specialise || null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformationsFormation;
