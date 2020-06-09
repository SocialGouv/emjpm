import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsAgrementForm } from "./EnqueteIndividuelInformationsAgrementForm";
import { UPDATE_ENQUETE_INFORMATIONS_AGREMENTS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS } from "./queries";

export const EnqueteIndividuelInformationsAgrement = props => {
  const {
    submitWithContext,
    enqueteReponse,
    userId,
    section,
    step,
    enquete: { id: enqueteId }
  } = props;
  const {
    enquete_reponse_ids: { informations_mandataire_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS, {
    variables: {
      id: informations_mandataire_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_AGREMENTS, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId }
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
        variables: { id: informations_mandataire_id }
      }
    ]
  });

  const agrements = data ? data.enquete_reponses_agrements_formations_by_pk || {} : {};
  return loading ? null : (
    <EnqueteIndividuelInformationsAgrementForm
      data={agrements}
      section={section}
      step={step}
      submitWithContext={async submitProps => {
        const { values } = submitProps;
        await updateEnquete({
          variables: {
            id: informations_mandataire_id,
            debut_activite_avant_2009: values.debut_activite_avant_2009,
            annee_agrement: values.annee_agrement ? Number(values.annee_agrement) : null,
            nb_departements: values.nb_departements,
            nb_mesures_dep_finance: values.nb_mesures_dep_finance
              ? Number(values.nb_mesures_dep_finance)
              : null,
            nb_mesures_dep_autres: values.nb_mesures_dep_autres
              ? Number(values.nb_mesures_dep_autres)
              : null
          }
        });
        submitWithContext(submitProps);
      }}
    />
  );
};

export default EnqueteIndividuelInformationsAgrement;
