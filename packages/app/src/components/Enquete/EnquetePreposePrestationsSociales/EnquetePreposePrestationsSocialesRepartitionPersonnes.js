import React from "react";
import { useMutation, useQuery } from "react-apollo";

import { EnquetePreposePrestationsSocialesRepartitionPersonnesForm } from "./EnquetePreposePrestationsSocialesRepartitionPersonnesForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_REPARTITION } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export const EnquetePreposePrestationsSocialesRepartitionPersonnes = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse, step } = props;
  const {
    enquete_reponse_ids: { prestations_sociales_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_REPARTITION);

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
    : {};

  return (
    <EnquetePreposePrestationsSocialesRepartitionPersonnesForm
      data={prestationsSociales}
      step={step}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      loading={loading}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: prestations_sociales_id,
            aah: values.aah || "",
            pch: values.pch || "",
            asi: values.asi || "",
            rsa: values.rsa || "",
            als_apl: values.als_apl || "",
            aspa: values.aspa || "",
            apa: values.apa || ""
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnquetePreposePrestationsSocialesRepartitionPersonnes;
