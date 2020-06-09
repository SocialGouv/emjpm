import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { EnquetePreposeModaliteExerciceEtablissementsForm } from "./EnquetePreposeModaliteExerciceEtablissementsForm";
import { UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";

export const EnquetePreposeModaliteExerciceEtablissements = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse, step } = props;
  const {
    enquete_reponse_ids: { modalites_exercice_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: modalites_exercice_id
    }
  });

  const [updateEtablissements] = useMutation(
    UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS
  );

  return (
    <EnquetePreposeModaliteExerciceEtablissementsForm
      data={data ? data.enquete_reponses_modalites_exercice_by_pk || {} : {}}
      goToPrevPage={goToPrevPage}
      loading={loading}
      step={step}
      handleSubmit={async values => {
        await updateEtablissements({
          variables: {
            data: JSON.stringify(values.etablissements)
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnquetePreposeModaliteExerciceEtablissements;
