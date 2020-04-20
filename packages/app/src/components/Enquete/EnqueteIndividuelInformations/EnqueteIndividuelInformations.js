import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelInformationsForm } from "./EnqueteIndividuelInformationsForm";
import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE } from "./queries";

const formatNumber = value => (value ? Number(value) : undefined);

function formatValues(values) {
  return {
    estimationEtp: values.estimationEtp,
    secretaireSpecialise: values.secretaireSpecialise,
    secretaireSpecialiseEtp: `${values.secretaireSpecialiseEtp}`,
    cumulPrepose: values.cumulPrepose,
    cumulPreposeEtp: values.cumulPreposeEtp,
    cumulDelegueService: values.cumulDelegueService,
    cumulDelegueServiceEtp: values.cumulDelegueServiceEtp,
    debutActiviteAvant2009: values.debutActiviteAvant2009,
    anneeDebutActivite: formatNumber(values.anneeDebutActivite),
    anneeAgrement: formatNumber(values.anneeAgrement),
    cncMjpmAnneeObtention: formatNumber(values.cncMjpmAnneeObtention),
    cncMjpmHeureFormation: formatNumber(values.cncMjpmHeureFormation),
    cncMajAnneeObtention: formatNumber(values.cncMajAnneeObtention),
    cncMajHeureFormation: formatNumber(values.cncMajHeureFormation),
    cncDpfAnneeObtention: formatNumber(values.cncDpfAnneeObtention),
    cncDpfHeureFormation: formatNumber(values.cncDpfHeureFormation),
    niveauQualification: formatNumber(values.niveauQualification),
    niveauQualificationSecretaireSpe: formatNumber(values.niveauQualificationSecretaireSpe)
  };
}

export const EnqueteIndividuelInformations = props => {
  const { goToNextPage, goToPrevPage, enquete } = props;
  const { enqueteIndividuelId } = enquete;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE, {
    variables: {
      id: enqueteIndividuelId
    }
  });
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
        variables: { id: enqueteIndividuelId }
      }
    ]
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_individuels_by_pk: informations = {} } = data;

  return (
    <EnqueteIndividuelInformationsForm
      data={informations}
      goToPrevPage={goToPrevPage}
      handleSubmit={async values => {
        const formattedValues = formatValues(values);
        await updateEnquete({
          variables: {
            id: enqueteIndividuelId,
            ...formattedValues
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformations;
