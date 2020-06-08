import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { EnquetePreposeFinancementForm } from "./EnquetePreposeFinancementForm";
import { UPDATE_ENQUETE_REPONSES_FINANCEMENT } from "./mutations";
import { ENQUETE_REPONSES_FINANCEMENT } from "./queries";

function convertToFloat(str) {
  const value = parseFloat(`${str}`.replace(",", "."));
  return isNaN(value) ? null : value;
}

export const EnquetePreposeFinancement = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse } = props;
  const {
    enquete_reponse_ids: { financement_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSES_FINANCEMENT, {
    variables: {
      id: financement_id
    }
  });
  const [updateFinancement] = useMutation(UPDATE_ENQUETE_REPONSES_FINANCEMENT);
  const financement = data ? data.enquete_reponses_financement_by_pk || {} : {};

  return (
    <EnquetePreposeFinancementForm
      data={financement}
      goToNextPage={goToNextPage}
      goToPrevPage={goToPrevPage}
      handleSubmit={async values => {
        await updateFinancement({
          variables: {
            id: financement_id,
            aide_sociale_conseil_departemental: convertToFloat(
              values.aide_sociale_conseil_departemental
            ),
            autre_produits: convertToFloat(values.autre_produits),
            charges_fonctionnement: convertToFloat(values.charges_fonctionnement),
            charges_personnel: convertToFloat(values.charges_personnel),
            charges_preposes: convertToFloat(values.charges_preposes),
            financement_public: convertToFloat(values.financement_public),
            produits_bareme_prelevements: convertToFloat(values.produits_bareme_prelevements)
          }
        });
        await goToNextPage();
      }}
      loading={loading}
    />
  );
};

export default EnquetePreposeFinancement;
