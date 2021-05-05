import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteCausesSortiesDispositifForm } from "./EnqueteActiviteCausesSortiesDispositifForm";
import { UPDATE_ENQUETE_ACTIVITE_CAUSES_SORTIE_DISPOSITIF } from "./mutations";
import { ENQUETE_CAUSES_SORTIE_DISPOSITIF } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnqueteActiviteCausesSortiesDispositif(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const { id: userId } = useUser();
  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_ACTIVITE_CAUSES_SORTIE_DISPOSITIF,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_CAUSES_SORTIE_DISPOSITIF,
          variables: {
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const { data, loading } = useQuery(ENQUETE_CAUSES_SORTIE_DISPOSITIF, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const initialData = useMemo(() => {
    const { sorties_main_levee, sorties_deces, sorties_masp } = data
      ? data.enquete_reponses_activite[0] || {}
      : {};

    return {
      sortiesDeces: sorties_deces,
      sortiesMainLevee: sorties_main_levee,
      sortiesMasp: sorties_masp,
    };
  }, [data]);

  return (
    <EnqueteActiviteCausesSortiesDispositifForm
      loading={loading}
      data={initialData}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      enquete={props.enquete}
    />
  );
}

export default EnqueteActiviteCausesSortiesDispositif;
