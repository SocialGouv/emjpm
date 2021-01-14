import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { UserContext } from "~/components/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposePrestationsSocialesRevenusForm } from "./EnquetePreposePrestationsSocialesRevenusForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_TUTELLE } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export function EnquetePreposePrestationsSocialesTutelle(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { prestations_sociales_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id,
    },
  });

  const [updatePrestationsSociales] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_TUTELLE,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_PREPOSE_PRESTATIONS_SOCIALES,
          variables: {
            id: prestations_sociales_id,
          },
        },
      ],
    }
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
    : {};

  return (
    <EnquetePreposePrestationsSocialesRevenusForm
      data={prestationsSociales.tutelle}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      onSubmit={async (values) => {
        await updatePrestationsSociales({
          variables: {
            id: prestations_sociales_id,
            tutelle: values,
          },
        });
      }}
      title="Tutelle"
    />
  );
}

export default EnquetePreposePrestationsSocialesTutelle;
