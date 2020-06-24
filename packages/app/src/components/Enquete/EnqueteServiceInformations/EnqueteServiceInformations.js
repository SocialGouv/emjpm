import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { EnqueteServiceInformationsForm } from "./EnqueteServiceInformationsForm";
// import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_SERVICE_INFORMATIONS } from "./queries";

export const EnqueteServiceInformations = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    // serviceId,
    section,
    step,
    // enquete: { id: enqueteId },
  } = props;

  const {
    enquete_reponse_ids: { service_informations_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_SERVICE_INFORMATIONS, {
    variables: {
      id: service_informations_id,
    },
  });

  //   const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS);

  const informations = data ? data.enquete_reponses_service_informations_by_pk || {} : {};

  return loading ? null : (
    <EnqueteServiceInformationsForm
      data={informations}
      section={section}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      //   onSubmit={async (values) => {
      //     // await updateEnquete({
      //     //   variables: {
      //     //     id: informations_mandataire_id,
      //     //     ...values,
      //     //   },
      //     // });
      //   }}
    />
  );
};

export default EnqueteServiceInformations;
