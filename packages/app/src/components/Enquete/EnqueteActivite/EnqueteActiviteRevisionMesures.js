import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteRevisionMesuresForm } from "./EnqueteActiviteRevisionMesuresForm";
import { UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES } from "./mutations";
import { ENQUETE_REVISION_MESURES } from "./queries";

export const EnqueteActiviteRevisionMesures = props => {
  const { goToPrevPage, goToNextPage, enquete } = props;
  const { enqueteReponseId } = enquete;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_REVISION_MESURES);
  const { data, loading } = useQuery(ENQUETE_REVISION_MESURES, {
    variables: {
      id: enqueteReponseId
    }
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses } = data;
  const [
    {
      activite_revisions_main_levee,
      activite_revisions_masp,
      activite_revisions_reconduction,
      activite_revisions_changement,
      activite_revisions_autre
    }
  ] = enquete_reponses;

  return (
    <Box>
      <EnqueteActiviteRevisionMesuresForm
        revisionsMainLevee={activite_revisions_main_levee}
        revisionsMasp={activite_revisions_masp}
        revisionsReconduction={activite_revisions_reconduction}
        revisionsChangement={activite_revisions_changement}
        revisionsAutre={activite_revisions_autre}
        handleSubmit={async values => {
          await updateEnquete({
            variables: {
              id: enqueteReponseId,
              revisionsMainLevee: values.revisionsMainLevee || null,
              revisionsMasp: values.revisionsMasp || null,
              revisionsReconduction: values.revisionsReconduction || null,
              revisionsChangement: values.revisionsChangement || null,
              revisionsAutre: values.revisionsAutre || null
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
      />
    </Box>
  );
};

export default EnqueteActiviteRevisionMesures;
