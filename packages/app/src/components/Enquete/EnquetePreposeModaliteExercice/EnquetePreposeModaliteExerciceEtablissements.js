import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";

import { UserContext } from "~/components/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposeModaliteExerciceEtablissementsForm } from "./EnquetePreposeModaliteExerciceEtablissementsForm";
import { UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";

export const EnquetePreposeModaliteExerciceEtablissements = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;

  const {
    enquete_reponse_ids: { modalites_exercice_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: modalites_exercice_id,
    },
  });

  const [updateEtablissements] = useMutation(
    UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_PREPOSE_INFORMATIONS,
          variables: { id: modalites_exercice_id },
        },
      ],
    }
  );

  return loading ? null : (
    <EnquetePreposeModaliteExerciceEtablissementsForm
      data={data ? data.enquete_reponses_modalites_exercice_by_pk || {} : {}}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      onSubmit={async (values) => {
        await updateEtablissements({
          variables: {
            actions_information_tuteurs_familiaux:
              values.actions_information_tuteurs_familiaux,
            data: values.etablissements,
            id: modalites_exercice_id,
          },
        });
      }}
    />
  );
};

export default EnquetePreposeModaliteExerciceEtablissements;
