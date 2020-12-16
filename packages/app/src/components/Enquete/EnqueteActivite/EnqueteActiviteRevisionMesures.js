import React, { useContext, useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { UserContext } from "~/components/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteRevisionMesuresForm } from "./EnqueteActiviteRevisionMesuresForm";
import { UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES } from "./mutations";
import { ENQUETE_REVISION_MESURES } from "./queries";

export const EnqueteActiviteRevisionMesures = (props) => {
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
    UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_REVISION_MESURES,
          variables: {
            id: activite_id,
          },
        },
      ],
    }
  );
  const { data, loading } = useQuery(ENQUETE_REVISION_MESURES, {
    variables: {
      id: activite_id,
    },
  });

  const initialData = useMemo(() => {
    const {
      revisions_main_levee: revisionsMainLevee,
      revisions_masp: revisionsMasp,
      revisions_reconduction: revisionsReconduction,
      revisions_changement: revisionsChangement,
      revisions_autre: revisionsAutre,
    } = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      revisionsAutre,
      revisionsChangement,
      revisionsMainLevee,
      revisionsMasp,
      revisionsReconduction,
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteRevisionMesuresForm
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
    </Box>
  );
};
export default EnqueteActiviteRevisionMesures;
