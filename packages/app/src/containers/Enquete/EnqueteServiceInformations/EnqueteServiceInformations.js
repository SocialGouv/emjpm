import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteServiceInformationsForm } from "./EnqueteServiceInformationsForm";
import { UPDATE_ENQUETE_SERVICE_INFORMATIONS } from "./mutations";
import { ENQUETE_SERVICE_INFORMATIONS } from "./queries";

export function EnqueteServiceInformations(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();

  const { data, loading } = useQuery(ENQUETE_SERVICE_INFORMATIONS, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SERVICE_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_SERVICE_INFORMATIONS,
        variables: {
          id: enqueteReponse.id,
        },
      },
    ],
  });
  const informations = data
    ? data.enquete_reponses_service_informations[0] || {}
    : {};

  return loading ? null : (
    <EnqueteServiceInformationsForm
      data={informations}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      enquete={props.enquete}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            affiliation_federation: values.affiliation_federation,
            departement: values.departement,
            id: enqueteReponse.id,
            last_update: new Date(),
            nb_structures_concernees: values.nb_structures_concernees,
            nom: values.nom,
            region: values.region,
            type_organisme_gestionnaire: values.type_organisme_gestionnaire,
          },
        });
      }}
    />
  );
}

export default EnqueteServiceInformations;
