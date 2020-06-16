import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_REPONSE_STATUS } from "../queries";
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
    userId,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { activite_id },
  } = enqueteReponse;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_REVISION_MESURES,
        variables: {
          id: activite_id,
        },
      },
    ],
  });
  const { data, loading } = useQuery(ENQUETE_REVISION_MESURES, {
    variables: {
      id: activite_id,
    },
  });

  const {
    revisions_main_levee,
    revisions_masp,
    revisions_reconduction,
    revisions_changement,
    revisions_autre,
  } = data ? data.enquete_reponses_activite_by_pk || {} : {};

  return (
    <Box>
      <EnqueteActiviteRevisionMesuresForm
        loading={loading}
        data={{
          revisionsMainLevee: revisions_main_levee,
          revisionsMasp: revisions_masp,
          revisionsReconduction: revisions_reconduction,
          revisionsChangement: revisions_changement,
          revisionsAutre: revisions_autre,
        }}
        section={section}
        step={step}
        onSubmit={async (values) => {
          await updateEnquete({
            variables: {
              id: activite_id,
              revisionsMainLevee: values.revisionsMainLevee || null,
              revisionsMasp: values.revisionsMasp || null,
              revisionsReconduction: values.revisionsReconduction || null,
              revisionsChangement: values.revisionsChangement || null,
              revisionsAutre: values.revisionsAutre || null,
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
