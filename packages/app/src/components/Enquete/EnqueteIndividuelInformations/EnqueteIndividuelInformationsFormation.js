import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useMemo } from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsFormationForm } from "./EnqueteIndividuelInformationsFormationForm";
import { UPDATE_ENQUETE_INFORMATIONS_FORMATION } from "./mutations";
import {
  ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
  ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
} from "./queries";

export const EnqueteIndividuelInformationsFormation = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { agrements_formations_id, informations_mandataire_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION, {
    variables: {
      id: agrements_formations_id,
    },
  });

  const { data: dataInformationsGenerales, loading: loadingInformationsGenerales } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
    {
      variables: {
        id: informations_mandataire_id,
      },
    }
  );

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_FORMATION, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
        variables: { id: agrements_formations_id },
      },
    ],
  });

  const initialValues = useMemo(() => {
    if (data && dataInformationsGenerales) {
      const agrementsFormations = data.enquete_reponses_agrements_formations_by_pk;

      const informationsGenerales =
        dataInformationsGenerales.enquete_reponses_informations_mandataire_by_pk;

      const initialValues = agrementsFormations
        ? {
            ...agrementsFormations,
          }
        : {};

      if (informationsGenerales) {
        initialValues.informations_generales_secretaire_specialise_etp =
          informationsGenerales.secretaire_specialise_etp;
      }

      return initialValues;
    }
  }, [data, dataInformationsGenerales]);

  return loading || loadingInformationsGenerales ? null : (
    <EnqueteIndividuelInformationsFormationForm
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      data={initialValues}
      section={section}
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: agrements_formations_id,
            ...values,
          },
        });
      }}
    />
  );
};

export default EnqueteIndividuelInformationsFormation;
