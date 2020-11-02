import React, { useContext, useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";

import { UserContext } from "../../UserContext";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteCausesSortiesDispositifForm } from "./EnqueteActiviteCausesSortiesDispositifForm";
import { UPDATE_ENQUETE_ACTIVITE_CAUSES_SORTIE_DISPOSITIF } from "./mutations";
import { ENQUETE_CAUSES_SORTIE_DISPOSITIF } from "./queries";

export const EnqueteActiviteCausesSortiesDispositif = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { activite_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const [updateEnquete] = useMutation(
    UPDATE_ENQUETE_ACTIVITE_CAUSES_SORTIE_DISPOSITIF,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_CAUSES_SORTIE_DISPOSITIF,
          variables: {
            id: activite_id,
          },
        },
      ],
    }
  );
  const { data, loading } = useQuery(ENQUETE_CAUSES_SORTIE_DISPOSITIF, {
    variables: {
      id: activite_id,
    },
  });

  const initialData = useMemo(() => {
    const { sorties_main_levee, sorties_deces, sorties_masp } = data
      ? data.enquete_reponses_activite_by_pk || {}
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
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: activite_id,
            ...values,
          },
        });
      }}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
    />
  );
};

export default EnqueteActiviteCausesSortiesDispositif;
