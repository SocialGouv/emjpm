import { useContext, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box } from "rebass";

import { UserContext } from "~/containers/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR } from "./mutations";
import { ENQUETE_MANDAT_ADHOC_MAJEUR } from "./queries";

const PREFIX = "mandat_adhoc_majeur";

export function EnqueteActiviteMandatHadocMajeur(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { activite_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_MANDAT_ADHOC_MAJEUR,
        variables: {
          id: activite_id,
        },
      },
    ],
  });
  const { data, loading } = useQuery(ENQUETE_MANDAT_ADHOC_MAJEUR, {
    variables: {
      id: activite_id,
    },
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      debutAnnee: r[`${PREFIX}_debut_annee`],
      finAnnee: r[`${PREFIX}_fin_annee`],
      mesuresNouvelles: r[`${PREFIX}_mesures_nouvelles`],
      sortieMesures: r[`${PREFIX}_sortie_mesures`],
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteMesuresForm
        loading={loading}
        data={normalizedData}
        section={section}
        sections={props.sections}
        currentStep={props.currentStep}
        step={step}
        onSubmit={async (values) => {
          await updateEnquete({
            variables: {
              id: activite_id,
              ...values,
            },
          });
        }}
        enqueteContext={enqueteContext}
        dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
        title="Mandat ad hoc majeur"
      />
    </Box>
  );
}

export default EnqueteActiviteMandatHadocMajeur;
