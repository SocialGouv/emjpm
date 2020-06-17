import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { parseFormFloat } from "../../../util";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePreposeModaliteExerciceInformationsForm } from "./EnquetePreposeModaliteExerciceInformationsForm";
import { UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";

export const EnquetePreposeModaliteExerciceInformations = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    userId,
    step,
    enquete: { id: enqueteId },
  } = props;

  const {
    enquete_reponse_ids: { modalites_exercice_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: modalites_exercice_id,
    },
  });

  const [sendEnqueteReponseInformations] = useMutation(
    UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS,
    {
      refetchQueries: [
        {
          query: ENQUETE_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_PREPOSE_INFORMATIONS,
          variables: { id: modalites_exercice_id },
        },
      ],
    }
  );
  return (
    <EnquetePreposeModaliteExerciceInformationsForm
      data={data ? data.enquete_reponses_modalites_exercice_by_pk || {} : {}}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      onSubmit={async (values) => {
        await sendEnqueteReponseInformations({
          variables: {
            id: modalites_exercice_id,
            departement: values.departement || null,
            region: values.region || null,
            raison_sociale: values.raison_sociale || null,
            personnalite_juridique_etablissement:
              values.personnalite_juridique_etablissement || null,
            activite_personne_physique: parseFormFloat(values.activite_personne_physique),
            activite_service: parseFormFloat(values.activite_service),
            total_mesures_etablissements: parseFormFloat(values.total_mesures_etablissements),
            etablissement_personne_morale: parseFormFloat(values.etablissement_personne_morale),
            etablissement_convention_groupement: parseFormFloat(
              values.etablissement_convention_groupement
            ),
          },
        });
      }}
    />
  );
};

export default EnquetePreposeModaliteExerciceInformations;
