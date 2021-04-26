import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";
import { parseFormFloat, parseFormInt } from "~/utils/form";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposePersonnelFormationMjpmForm } from "./EnquetePreposePersonnelFormationMjpmForm";
import { UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_MJPM } from "./mutations";
import { ENQUETE_PREPOSE_PERSONNEL_FORMATION } from "./queries";

export function EnquetePreposePersonnelFormationMjpm(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props; /* mandataireId, enquete */

  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_PREPOSE_PERSONNEL_FORMATION, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [sendEnqueteReponseInformations] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_MJPM,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_PREPOSE_PERSONNEL_FORMATION,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );

  const initialData = data
    ? data.enquete_reponses_prepose_personel_formation[0] || {}
    : {};

  return (
    <EnquetePreposePersonnelFormationMjpmForm
      data={initialData}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      enquete={props.enquete}
      onSubmit={async (values) => {
        const formation_preposes_mjpm = values.formation_preposes_mjpm
          ? {
              en_poste_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.en_poste_cnc
              ),
              formation_non_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.formation_non_cnc
              ),
              non_formation_non_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.non_formation_non_cnc
              ),
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            formation_preposes_mjpm,
            id: enqueteReponse.id,
            nb_preposes_mjpm: parseFormInt(values.nb_preposes_mjpm),
            nb_preposes_mjpm_etp: parseFormFloat(values.nb_preposes_mjpm_etp),
          },
        });
      }}
      currentStep={props.currentStep}
      sections={props.sections}
    />
  );
}

export default EnquetePreposePersonnelFormationMjpm;
function parseNbPreposeHeuresFormationFromForm(val) {
  return {
    heures_formation: val ? parseFormFloat(val.heures_formation) : null,
    nb_preposes: val ? parseFormInt(val.nb_preposes, 10) : null,
  };
}
