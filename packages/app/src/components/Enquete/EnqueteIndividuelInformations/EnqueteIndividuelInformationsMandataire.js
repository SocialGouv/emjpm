import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsMandataireForm } from "./EnqueteIndividuelInformationsMandataireForm";
import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE } from "./queries";

export const EnqueteIndividuelInformationsMandataire = props => {
  const {
    goToNextPage,
    goToPrevPage,
    enqueteReponse,
    userId,
    section,
    step,
    enquete: { id: enqueteId }
  } = props;
  const {
    enquete_reponse_ids: { informations_mandataire_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE, {
    variables: {
      id: informations_mandataire_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId }
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
        variables: { id: informations_mandataire_id }
      }
    ]
  });

  const informations = data ? data.enquete_reponses_informations_mandataire_by_pk || {} : {};
  return loading ? null : (
    <EnqueteIndividuelInformationsMandataireForm
      data={informations}
      section={section}
      step={step}
      goToPrevPage={goToPrevPage}
      loading={loading}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: informations_mandataire_id,
            nom: values.nom || null,
            departement: values.departement || null,
            region: values.region || null,
            sexe: values.sexe ? `${values.sexe}` : null,
            tranche_age: values.tranche_age ? `${values.tranche_age}` : null,
            anciennete: values.anciennete ? `${values.anciennete}` : null,
            benevole: values.benevole,
            estimation_etp: values.estimation_etp || null,
            forme_juridique: values.forme_juridique ? values.forme_juridique : null,
            local_professionnel: values.local_professionnel,
            exerce_seul_activite: values.exerce_seul_activite,
            exerce_secretaires_specialises: values.exerce_secretaires_specialises,
            secretaire_specialise_etp:
              values.secretaire_specialise_etp &&
              !isNaN(parseFloat(values.secretaire_specialise_etp))
                ? parseFloat(values.secretaire_specialise_etp)
                : null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformationsMandataire;
