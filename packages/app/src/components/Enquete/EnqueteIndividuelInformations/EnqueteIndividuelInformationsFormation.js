import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsFormationForm } from "./EnqueteIndividuelInformationsFormationForm";
import { UPDATE_ENQUETE_INFORMATIONS_FORMATION } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION } from "./queries";

export const EnqueteIndividuelInformationsFormation = props => {
  const {
    goToNextPage,
    goToPrevPage,
    enqueteReponse,
    userId,
    section,
    step,
    enquete: { id: enqueteId }
  } = props;
  const {
    enquete_reponse_ids: { agrements_formations_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION, {
    variables: {
      id: agrements_formations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_FORMATION, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId }
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
        variables: { id: agrements_formations_id }
      }
    ]
  });

  return loading ? null : (
    <EnqueteIndividuelInformationsFormationForm
      goToPrevPage={goToPrevPage}
      data={data ? data.enquete_reponses_agrements_formations_by_pk || {} : {}}
      section={section}
      step={step}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: agrements_formations_id,
            cnc_annee_obtention: values.cnc_annee_obtention
              ? Number(values.cnc_annee_obtention)
              : null,
            cnc_heures_formation: values.cnc_heures_formation
              ? Number(values.cnc_heures_formation)
              : null,
            niveau_qualification: values.niveau_qualification
              ? Number(values.niveau_qualification)
              : null,
            secretaire_specialise_etp_n1: values.secretaire_specialise_etp_n1
              ? Number(values.secretaire_specialise_etp_n1)
              : null,
            secretaire_specialise_etp_n2: values.secretaire_specialise_etp_n2
              ? Number(values.secretaire_specialise_etp_n2)
              : null,
            secretaire_specialise_etp_n3: values.secretaire_specialise_etp_n3
              ? Number(values.secretaire_specialise_etp_n3)
              : null,
            secretaire_specialise_etp_n4: values.secretaire_specialise_etp_n4
              ? Number(values.secretaire_specialise_etp_n4)
              : null,
            secretaire_specialise_etp_n5: values.secretaire_specialise_etp_n5
              ? Number(values.secretaire_specialise_etp_n5)
              : null,
            secretaire_specialise_etp_n6: values.secretaire_specialise_etp_n6
              ? Number(values.secretaire_specialise_etp_n6)
              : null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformationsFormation;
