import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteEtablissementDomicileForm } from "./common";
import { UPDATE_ENQUETE_ACTIVITE_TUTELLE } from "./mutations";
import { ENQUETE_TUTELLE } from "./queries";

const PREFIX = "tutelle";

export function EnqueteActiviteTutelle(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_TUTELLE, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_TUTELLE,
        variables: {
          id: enqueteReponse.id,
        },
      },
    ],
  });
  const { data, loading } = useQuery(ENQUETE_TUTELLE, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      domicileDebutAnnee: r[`${PREFIX}_domicile_debut_annee`],
      domicileFinAnnee: r[`${PREFIX}_domicile_fin_annee`],
      domicileMesuresNouvelles: r[`${PREFIX}_domicile_mesures_nouvelles`],
      domicileSortieMesures: r[`${PREFIX}_domicile_sortie_mesures`],
      etablissementDebutAnnee: r[`${PREFIX}_etablissement_debut_annee`],
      etablissementFinAnnee: r[`${PREFIX}_etablissement_fin_annee`],
      etablissementMesuresNouvelles:
        r[`${PREFIX}_etablissement_mesures_nouvelles`],
      etablissementSortieMesures: r[`${PREFIX}_etablissement_sortie_mesures`],
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteEtablissementDomicileForm
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
        title="Tutelle"
      />
    </Box>
  );
}

export default EnqueteActiviteTutelle;
