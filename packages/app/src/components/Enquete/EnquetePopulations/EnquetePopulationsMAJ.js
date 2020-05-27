import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_MAJ } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_MAJ } from "./queries";

export const EnquetePopulationsMAJ = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    mandataireId,
    enquete: { id: enqueteId }
  } = props;
  const { enquete_reponses_populations_id } = enqueteReponse;
  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_MAJ, {
    variables: {
      id: enquete_reponses_populations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_MAJ, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_MAJ,
        variables: { id: enquete_reponses_populations_id }
      }
    ]
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = {
    age_inf_25_ans_homme: populations.maj_age_inf_25_ans_homme || "",
    age_inf_25_ans_femme: populations.maj_age_inf_25_ans_femme || "",
    age_25_39_ans_homme: populations.maj_age_25_39_ans_homme || "",
    age_25_39_ans_femme: populations.maj_age_25_39_ans_femme || "",
    age_40_59_ans_homme: populations.maj_age_40_59_ans_homme || "",
    age_40_59_ans_femme: populations.maj_age_40_59_ans_femme || "",
    age_60_74_ans_homme: populations.maj_age_60_74_ans_homme || "",
    age_60_74_ans_femme: populations.maj_age_60_74_ans_femme || "",
    age_sup_75_ans_homme: populations.maj_age_sup_75_ans_homme || "",
    age_sup_75_ans_femme: populations.maj_age_sup_75_ans_femme || "",
    anciennete_inf_1_an: populations.maj_anciennete_inf_1_an || "",
    anciennete_1_3_ans: populations.maj_anciennete_1_3_ans || "",
    anciennete_3_5_ans: populations.maj_anciennete_3_5_ans || "",
    anciennete_5_10_ans: populations.maj_anciennete_5_10_ans || "",
    anciennete_sup_10_ans: populations.maj_anciennete_sup_10_ans || "",
    type_etablissement_personne_handicapee: populations.maj_etablissement_personne_handicapee || "",
    type_service_personne_handicapee: populations.maj_service_personne_handicapee || "",
    type_ehpad: populations.maj_ehpad || "",
    type_autre_etablissement_personne_agee: populations.maj_autre_etablissement_personne_agee || "",
    type_chrs: populations.maj_chrs || "",
    type_service_hospitalier_soins_longue_duree:
      populations.maj_service_hospitalier_soins_longue_duree || "",
    type_service_psychiatrique: populations.maj_service_psychiatrique || "",
    type_autre_service: populations.maj_autre_service || ""
  };

  return (
    <Box>
      <EnquetePopulationsForm
        loading={loading}
        data={reponsePopulations}
        handleSubmit={async values => {
          const data = Object.keys(values).reduce((acc, key) => {
            if (values[key]) {
              return {
                ...acc,
                [key]: parseInt(values[key], 10)
              };
            }
            return acc;
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
        title={"Mesure d'accompagnement de justice"}
      />
    </Box>
  );
};

export default EnquetePopulationsMAJ;
