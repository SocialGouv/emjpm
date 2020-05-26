import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnqueteIndividuelInformationsAgrementsForm } from "./EnqueteIndividuelInformationsAgrementsForm";
import { UPDATE_ENQUETE_INFORMATIONS_AGREMENTS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS } from "./queries";

export const EnqueteIndividuelInformationsAgrements = props => {
  const {
    goToNextPage,
    goToPrevPage,
    enqueteReponse,
    mandataireId,
    enquete: { id: enqueteId }
  } = props;
  const { enquete_reponses_informations_mandataire_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS, {
    variables: {
      id: enquete_reponses_informations_mandataire_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_AGREMENTS, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
        variables: { id: enquete_reponses_informations_mandataire_id }
      }
    ]
  });

  const agrements = data ? data.enquete_reponses_agrements_formations_by_pk || {} : {};
  return (
    <EnqueteIndividuelInformationsAgrementsForm
      data={agrements}
      goToPrevPage={goToPrevPage}
      loading={loading}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: enquete_reponses_informations_mandataire_id,
            annee_agrement: values.annee_agrement ? Number(values.annee_agrement) : null,
            nb_departements: values.nb_departements ? Number(values.nb_departements) : null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformationsAgrements;
