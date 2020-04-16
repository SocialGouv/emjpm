import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { MandataireEnqueteIndividuelForm } from "./MandataireEnqueteIndividuelForm";
import { CREATE_ENQUETE, UPDATE_ENQUETE } from "./mutations";
import { ENQUETE_INDIVIDUEL } from "./queries";

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

export const MandataireEnqueteIndividuel = props => {
  const { enqueteId, mandataireId } = props;
  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL, {
    variables: { id: enqueteId }
  });

  const [createEnquete] = useMutation(CREATE_ENQUETE);
  const [updateEnquete] = useMutation(UPDATE_ENQUETE);

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquete_individuels_by_pk: enquete = {} } = data;
  return (
    <MandataireEnqueteIndividuelForm
      enquete={enquete}
      handleSubmit={async values => {
        if (enquete && enquete.id) {
          await updateEnquete({
            variables: {
              id: enquete.id,
              ...formatValues(values)
            }
          });
        } else {
          await createEnquete({
            variables: {
              mandataireId,
              ...formatValues(values)
            }
          });
        }
      }}
    />
  );
};

export default MandataireEnqueteIndividuel;
