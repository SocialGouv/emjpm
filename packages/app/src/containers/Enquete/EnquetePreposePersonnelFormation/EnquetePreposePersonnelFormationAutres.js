import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";
import { parseFormFloat, parseFormInt } from "~/utils/form";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposePersonnelFormationAutresForm } from "./EnquetePreposePersonnelFormationAutresForm";
import { UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_AUTRES } from "./mutations";
import { ENQUETE_PREPOSE_PERSONNEL_FORMATION } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnquetePreposePersonnelFormationAutres(props) {
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

  const [sendEnqueteReponseInformations, { loading: loading2, error: error2 }] =
    useMutation(UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_AUTRES, {
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
    });
  useQueryReady(loading2, error2);

  const initialData = data
    ? data.enquete_reponses_prepose_personel_formation[0] || {}
    : {};

  return (
    <EnquetePreposePersonnelFormationAutresForm
      data={initialData}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      enquete={props.enquete}
      onSubmit={async (values) => {
        const niveaux_qualification = values.niveaux_qualification
          ? {
              n1: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n1
              ),
              n2: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n2
              ),
              n3: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n3
              ),
              n4: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n4
              ),
              n5: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n5
              ),
              n6: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n6
              ),
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            id: enqueteReponse.id,
            nb_autre_personnel: parseFormInt(values.nb_autre_personnel),
            nb_autre_personnel_etp: parseFormFloat(
              values.nb_autre_personnel_etp
            ),
            nb_preposes_femme: parseFormInt(values.nb_preposes_femme),
            nb_preposes_homme: parseFormInt(values.nb_preposes_homme),
            niveaux_qualification,
          },
        });
      }}
      currentStep={props.currentStep}
      sections={props.sections}
    />
  );
}

export default EnquetePreposePersonnelFormationAutres;
function parseNbPreposeNombrePreposesParNiveauQualificationFromForm(val) {
  return {
    nb_preposes: val ? parseFormInt(val.nb_preposes, 10) : null,
    nb_preposes_etp: val ? parseFormFloat(val.nb_preposes_etp) : null,
  };
}
