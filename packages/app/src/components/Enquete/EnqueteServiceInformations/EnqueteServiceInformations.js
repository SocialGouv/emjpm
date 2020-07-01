import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";

import { UserContext } from "../../UserContext";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteServiceInformationsForm } from "./EnqueteServiceInformationsForm";
import { UPDATE_ENQUETE_SERVICE_INFORMATIONS } from "./mutations";
import { ENQUETE_SERVICE_INFORMATIONS } from "./queries";

export const EnqueteServiceInformations = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useContext(UserContext);

  const {
    enquete_reponse_ids: { service_informations_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_SERVICE_INFORMATIONS, {
    variables: {
      id: service_informations_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SERVICE_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_SERVICE_INFORMATIONS,
        variables: {
          id: service_informations_id,
        },
      },
    ],
  });
  const informations = data ? data.enquete_reponses_service_informations_by_pk || {} : {};

  return loading ? null : (
    <EnqueteServiceInformationsForm
      data={informations}
      section={section}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: service_informations_id,
            last_update: new Date(),
            region: values.region,
            nom: values.nom,
            nb_structures_concernees: values.nb_structures_concernees,
            departement: values.departement,
            type_organisme_gestionnaire: values.type_organisme_gestionnaire,
            affiliation_federation: values.affiliation_federation,
          },
        });
      }}
    />
  );
};

export default EnqueteServiceInformations;
