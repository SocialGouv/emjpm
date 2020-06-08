import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_TUTELLE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_TUTELLE } from "./queries";

export const EnquetePopulationsTutelle = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    userId,
    enquete: { id: enqueteId },
    section,
    step
  } = props;
  const {
    enquete_reponse_ids: { populations_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_TUTELLE, {
    variables: {
      id: populations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_TUTELLE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId }
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_TUTELLE,
        variables: { id: populations_id }
      }
    ]
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = {
    age_inf_25_ans_homme: populations.tutelle_age_inf_25_ans_homme || "",
    age_inf_25_ans_femme: populations.tutelle_age_inf_25_ans_femme || "",
    age_25_39_ans_homme: populations.tutelle_age_25_39_ans_homme || "",
    age_25_39_ans_femme: populations.tutelle_age_25_39_ans_femme || "",
    age_40_59_ans_homme: populations.tutelle_age_40_59_ans_homme || "",
    age_40_59_ans_femme: populations.tutelle_age_40_59_ans_femme || "",
    age_60_74_ans_homme: populations.tutelle_age_60_74_ans_homme || "",
    age_60_74_ans_femme: populations.tutelle_age_60_74_ans_femme || "",
    age_sup_75_ans_homme: populations.tutelle_age_sup_75_ans_homme || "",
    age_sup_75_ans_femme: populations.tutelle_age_sup_75_ans_femme || "",
    anciennete_inf_1_an: populations.tutelle_anciennete_inf_1_an || "",
    anciennete_1_3_ans: populations.tutelle_anciennete_1_3_ans || "",
    anciennete_3_5_ans: populations.tutelle_anciennete_3_5_ans || "",
    anciennete_5_10_ans: populations.tutelle_anciennete_5_10_ans || "",
    anciennete_sup_10_ans: populations.tutelle_anciennete_sup_10_ans || "",
    type_etablissement_personne_handicapee:
      populations.tutelle_etablissement_personne_handicapee || "",
    type_service_personne_handicapee: populations.tutelle_service_personne_handicapee || "",
    type_ehpad: populations.tutelle_ehpad || "",
    type_autre_etablissement_personne_agee:
      populations.tutelle_autre_etablissement_personne_agee || "",
    type_chrs: populations.tutelle_chrs || "",
    type_service_hospitalier_soins_longue_duree:
      populations.tutelle_service_hospitalier_soins_longue_duree || "",
    type_service_psychiatrique: populations.tutelle_service_psychiatrique || "",
    type_autre_service: populations.tutelle_autre_service || ""
  };

  return (
    !loading && (
      <Box>
        <EnquetePopulationsForm
          loading={loading}
          data={reponsePopulations}
          section={section}
          step={step}
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
                id: populations_id,
                ...data
              }
            });
            await goToNextPage();
          }}
          goToPrevPage={goToPrevPage}
          title={"Tutelle"}
        />
      </Box>
    )
  );
};

export default EnquetePopulationsTutelle;
