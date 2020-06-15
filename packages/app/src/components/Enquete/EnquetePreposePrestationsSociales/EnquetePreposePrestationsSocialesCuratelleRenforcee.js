import React from "react";
import { useMutation, useQuery } from "react-apollo";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePreposePrestationsSocialesRevenusForm } from "./EnquetePreposePrestationsSocialesRevenusForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_RENFORCEE } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export const EnquetePreposePrestationsSocialesCuratelleRenforcee = props => {
  const {
    goToNextPage,
    goToPrevPage,
    enqueteReponse,
    step,
    userId,
    enquete: { id: enqueteId }
  } = props;
  const {
    enquete_reponse_ids: { prestations_sociales_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id
    }
  });

  const [updatePrestationsSociales] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_RENFORCEE,
    {
      refetchQueries: [
        {
          query: ENQUETE_REPONSE_STATUS,
          variables: { enqueteId, userId }
        },
        {
          query: ENQUETE_PREPOSE_PRESTATIONS_SOCIALES,
          variables: {
            id: prestations_sociales_id
          }
        }
      ]
    }
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
    : {};

  return (
    <EnquetePreposePrestationsSocialesRevenusForm
      data={prestationsSociales.curatelle_renforcee || {}}
      step={step}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      loading={loading}
      handleSubmit={async values => {
        await updatePrestationsSociales({
          variables: {
            id: prestations_sociales_id,
            curatelle_renforcee: values
          }
        });
        await goToNextPage();
      }}
      title="Curatelle renforcée"
    />
  );
};

export default EnquetePreposePrestationsSocialesCuratelleRenforcee;
