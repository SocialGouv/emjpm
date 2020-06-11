import React from "react";
import { useMutation, useQuery } from "react-apollo";

import { EnquetePreposePrestationsSocialesRevenusForm } from "./EnquetePreposePrestationsSocialesRevenusForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_MAJ } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export const EnquetePreposePrestationsSocialesMAJ = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse, step } = props;
  const {
    enquete_reponse_ids: { prestations_sociales_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id
    }
  });

  const [updatePrestationsSociales] = useMutation(UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_MAJ);

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
    : {};

  return (
    <EnquetePreposePrestationsSocialesRevenusForm
      data={prestationsSociales.maj || {}}
      step={step}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      loading={loading}
      handleSubmit={async values => {
        await updatePrestationsSociales({
          variables: {
            id: prestations_sociales_id,
            maj: JSON.stringify(values)
          }
        });
        await goToNextPage();
      }}
      title="MAJ"
    />
  );
};

export default EnquetePreposePrestationsSocialesMAJ;
