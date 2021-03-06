import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsFormationForm } from "./EnqueteIndividuelInformationsFormationForm";
import { UPDATE_ENQUETE_INFORMATIONS_FORMATION } from "./mutations";
import {
  ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
  ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
} from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnqueteIndividuelInformationsFormation(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
    {
      variables: {
        id: enqueteReponse.id,
      },
    }
  );

  const {
    data: dataInformationsGenerales,
    loading: loadingInformationsGenerales,
  } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_INFORMATIONS_FORMATION,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const initialValues = useMemo(() => {
    if (data && dataInformationsGenerales) {
      const agrementsFormations = data.enquete_reponses_agrements_formations[0];

      const informationsGenerales =
        dataInformationsGenerales.enquete_reponses_informations_mandataire;

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
      enquete={props.enquete}
    />
  );
}

export default EnqueteIndividuelInformationsFormation;
