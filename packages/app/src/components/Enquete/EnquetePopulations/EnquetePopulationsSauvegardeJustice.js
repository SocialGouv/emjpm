import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./queries";

export const EnquetePopulationsSauvegardeJustice = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    mandataireId,
    enquete: { id: enqueteId },
    section,
    step
  } = props;
  const { enquete_reponses_populations_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE, {
    variables: {
      id: enquete_reponses_populations_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
        variables: { id: enquete_reponses_populations_id }
      }
    ]
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = {
    age_inf_25_ans_homme: populations.sauvegarde_justice_age_inf_25_ans_homme || "",
    age_inf_25_ans_femme: populations.sauvegarde_justice_age_inf_25_ans_femme || "",
    age_25_39_ans_homme: populations.sauvegarde_justice_age_25_39_ans_homme || "",
    age_25_39_ans_femme: populations.sauvegarde_justice_age_25_39_ans_femme || "",
    age_40_59_ans_homme: populations.sauvegarde_justice_age_40_59_ans_homme || "",
    age_40_59_ans_femme: populations.sauvegarde_justice_age_40_59_ans_femme || "",
    age_60_74_ans_homme: populations.sauvegarde_justice_age_60_74_ans_homme || "",
    age_60_74_ans_femme: populations.sauvegarde_justice_age_60_74_ans_femme || "",
    age_sup_75_ans_homme: populations.sauvegarde_justice_age_sup_75_ans_homme || "",
    age_sup_75_ans_femme: populations.sauvegarde_justice_age_sup_75_ans_femme || "",
    anciennete_inf_1_an: populations.sauvegarde_justice_anciennete_inf_1_an || "",
    anciennete_1_3_ans: populations.sauvegarde_justice_anciennete_1_3_ans || "",
    anciennete_3_5_ans: populations.sauvegarde_justice_anciennete_3_5_ans || "",
    anciennete_5_10_ans: populations.sauvegarde_justice_anciennete_5_10_ans || "",
    anciennete_sup_10_ans: populations.sauvegarde_justice_anciennete_sup_10_ans || "",
    type_etablissement_personne_handicapee:
      populations.sauvegarde_justice_etablissement_personne_handicapee || "",
    type_service_personne_handicapee:
      populations.sauvegarde_justice_service_personne_handicapee || "",
    type_ehpad: populations.sauvegarde_justice_ehpad || "",
    type_autre_etablissement_personne_agee:
      populations.sauvegarde_justice_autre_etablissement_personne_agee || "",
    type_chrs: populations.sauvegarde_justice_chrs || "",
    type_service_hospitalier_soins_longue_duree:
      populations.sauvegarde_justice_service_hospitalier_soins_longue_duree || "",
    type_service_psychiatrique: populations.sauvegarde_justice_service_psychiatrique || "",
    type_autre_service: populations.sauvegarde_justice_autre_service || ""
  };

  return (
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
              id: enquete_reponses_populations_id,
              ...data
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title={"Sauvegarde de justice"}
      />
    </Box>
  );
};

export default EnquetePopulationsSauvegardeJustice;
