import React from "react";
import { useMutation, useQuery } from "react-apollo";

import { EnquetePreposePrestationsSocialesRevenusForm } from "./EnquetePreposePrestationsSocialesRevenusForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_RENFORCEE } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export const EnquetePreposePrestationsSocialesCuratelleRenforcee = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse, step } = props;
  const {
    enquete_reponse_ids: { prestations_sociales_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id
    }
  });

  const [updatePrestationsSociales] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_CURATELLE_RENFORCEE
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
    : {};

  const curatelleRenforcee = prestationsSociales.curatelle_renforcee
    ? JSON.parse(prestationsSociales.curatelle_renforcee)
    : {};

  return (
    <EnquetePreposePrestationsSocialesRevenusForm
      data={curatelleRenforcee}
      step={step}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      loading={loading}
      handleSubmit={async values => {
        await updatePrestationsSociales({
          variables: {
            id: prestations_sociales_id,
            curatelle_renforcee: JSON.stringify(values)
          }
        });
        await goToNextPage();
      }}
      title="Curatelle renforcée"
    />
  );
};

export default EnquetePreposePrestationsSocialesCuratelleRenforcee;
