import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteRevisionMesuresForm } from "./EnqueteActiviteRevisionMesuresForm";
import { UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES } from "./mutations";
import { ENQUETE_REVISION_MESURES } from "./queries";

export function EnqueteActiviteRevisionMesures(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
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
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );
  const { data, loading } = useQuery(ENQUETE_REVISION_MESURES, {
    variables: {
      id: enqueteReponse.id,
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
      />
    </Box>
  );
}
export default EnqueteActiviteRevisionMesures;
