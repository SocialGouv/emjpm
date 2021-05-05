import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR } from "./mutations";
import { ENQUETE_MANDAT_ADHOC_MAJEUR } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

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

  const { id: userId } = useUser();
  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_MANDAT_ADHOC_MAJEUR,
          variables: {
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const { data, loading } = useQuery(ENQUETE_MANDAT_ADHOC_MAJEUR, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite[0] || {} : {};

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
              id: enqueteReponse.id,
              ...values,
            },
          });
        }}
        enqueteContext={enqueteContext}
        dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
        title="Mandat ad hoc majeur"
        enquete={props.enquete}
      />
    </Box>
  );
}

export default EnqueteActiviteMandatHadocMajeur;
