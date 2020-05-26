import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_CURATELLE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_CURATELLE } from "./queries";

export const EnquetePopulationsCuratelle = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    mandataireId,
    enquete: { id: enqueteId }
  } = props;
  const { enquete_reponses_populations_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_CURATELLE, {
    variables: {
      id: enquete_reponses_populations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_CURATELLE, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_CURATELLE,
        variables: { id: enquete_reponses_populations_id }
      }
    ]
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses_populations_by_pk: populations } = data;

  const reponsePopulations = {
    age_inf_25_ans_homme: populations.curatelle_age_inf_25_ans_homme,
    age_inf_25_ans_femme: populations.curatelle_age_inf_25_ans_femme,
    age_25_39_ans_homme: populations.curatelle_age_25_39_ans_homme,
    age_25_39_ans_femme: populations.curatelle_age_25_39_ans_femme,
    age_40_59_ans_homme: populations.curatelle_age_40_59_ans_homme,
    age_40_59_ans_femme: populations.curatelle_age_40_59_ans_femme,
    age_60_74_ans_homme: populations.curatelle_age_60_74_ans_homme,
    age_60_74_ans_femme: populations.curatelle_age_60_74_ans_femme,
    age_sup_75_ans_homme: populations.curatelle_age_sup_75_ans_homme,
    age_sup_75_ans_femme: populations.curatelle_age_sup_75_ans_femme,
    anciennete_inf_1_an: populations.curatelle_anciennete_inf_1_an,
    anciennete_1_3_ans: populations.curatelle_anciennete_1_3_ans,
    anciennete_3_5_ans: populations.curatelle_anciennete_3_5_ans,
    anciennete_5_10_ans: populations.curatelle_anciennete_5_10_ans,
    anciennete_sup_10_ans: populations.curatelle_anciennete_sup_10_ans,
    type_etablissement_personne_handicapee: populations.curatelle_etablissement_personne_handicapee,
    type_service_personne_handicapee: populations.curatelle_service_personne_handicapee,
    type_ehpad: populations.curatelle_ehpad,
    type_autre_etablissement_personne_agee: populations.curatelle_autre_etablissement_personne_agee,
    type_chrs: populations.curatelle_chrs,
    type_service_hospitalier_soins_longue_duree:
      populations.curatelle_service_hospitalier_soins_longue_duree,
    type_service_psychiatrique: populations.curatelle_service_psychiatrique,
    type_autre_service: populations.curatelle_autre_service
  };

  return (
    <Box>
      <EnquetePopulationsForm
        data={reponsePopulations}
        handleSubmit={async values => {
          const data = Object.keys(values).reduce((acc, key) => {
            return {
              ...acc,
              [key]: values[key] ? Number(values[key]) : null
            };
          }, {});

          await updateEnquete({
            variables: {
              id: enquete_reponses_populations_id,
              ...data
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title={"Curatelle"}
      />
    </Box>
  );
};

export default EnquetePopulationsCuratelle;
