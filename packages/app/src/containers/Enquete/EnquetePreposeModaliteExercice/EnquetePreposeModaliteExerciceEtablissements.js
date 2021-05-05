import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposeModaliteExerciceEtablissementsForm } from "./EnquetePreposeModaliteExerciceEtablissementsForm";
import { UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnquetePreposeModaliteExerciceEtablissements(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [
    updateEtablissements,
    { loading: loading2, error: error2 },
  ] = useMutation(UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_PREPOSE_INFORMATIONS,
        variables: { id: enqueteReponse.id },
      },
    ],
  });
  useQueryReady(loading2, error2);

  return loading ? null : (
    <EnquetePreposeModaliteExerciceEtablissementsForm
      data={data ? data.enquete_reponses_modalites_exercice[0] || {} : {}}
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
            id: enqueteReponse.id,
          },
        });
      }}
      enquete={props.enquete}
      currentStep={props.currentStep}
      sections={props.sections}
    />
  );
}

export default EnquetePreposeModaliteExerciceEtablissements;
