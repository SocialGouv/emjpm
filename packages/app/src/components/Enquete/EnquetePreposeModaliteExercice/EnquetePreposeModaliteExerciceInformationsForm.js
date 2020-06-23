import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat, parseFormInput } from "../../../util";
import { ENQ_REP_MODALITE_EXERCICE, PERSONNALITE_JURIDIQUE } from "../constants";
import {
  EnqueteFormFieldLabel,
  EnqueteFormInputField,
  EnqueteFormSelectField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  departement: yup.string().required(),
  region: yup.string().required(),
  raison_sociale: yup.string().required(),
  personnalite_juridique_etablissement: yup.string().required(),
  activite_exercee_par: yup
    .mixed()
    .oneOf(ENQ_REP_MODALITE_EXERCICE.ACTIVE_EXERCEE_PAR.keys)
    .required(),
  etablissements_type: yup
    .mixed()
    .oneOf(ENQ_REP_MODALITE_EXERCICE.ETABLISSEMENTS_TYPE.keys)
    .required(),
  total_mesures_etablissements: yup.number().min(0).required(),
});

function dataToForm(data) {
  return {
    departement: formatFormInput(data.departement),
    region: formatFormInput(data.region),
    raison_sociale: formatFormInput(data.raison_sociale),
    personnalite_juridique_etablissement: formatFormInput(
      data.personnalite_juridique_etablissement
    ),
    activite_exercee_par: formatFormInput(data.activite_exercee_par),
    etablissements_type: formatFormInput(data.etablissements_type),
    total_mesures_etablissements: formatFormInput(data.total_mesures_etablissements),
  };
}
function formToData(values) {
  return {
    departement: parseFormInput(values.departement),
    region: parseFormInput(values.region),
    raison_sociale: parseFormInput(values.raison_sociale),
    personnalite_juridique_etablissement: parseFormInput(
      values.personnalite_juridique_etablissement
    ),
    activite_exercee_par: values.activite_exercee_par,
    etablissements_type: values.etablissements_type,
    total_mesures_etablissements: parseFormFloat(values.total_mesures_etablissements),
  };
}

export const EnquetePreposeModaliteExerciceInformationsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"50px"}>
        {"Modalité d'exercice en 2019"}
      </Heading1>
      <Heading3>{"Informations générales"}</Heading3>
      <Box mt={4}>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="region"
              label="Région"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="departement"
              label="Département"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>

        <EnqueteFormInputField
          id="raison_sociale"
          label="Raison sociale de l'établissement dont dépend le préposé"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="personnalite_juridique_etablissement"
          label="Indiquez la personnalité juridique de l'établissement dont dépend le(s) préposé(s) dans le menu déroulant"
          options={PERSONNALITE_JURIDIQUE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="activite_exercee_par"
          label="L'activité de préposé est exercée par"
          options={ENQ_REP_MODALITE_EXERCICE.ACTIVE_EXERCEE_PAR.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="etablissements_type"
          label="Situation des d'établissements auprès desquels est exercée l'activité de préposé MJPM"
          options={ENQ_REP_MODALITE_EXERCICE.ETABLISSEMENTS_TYPE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <Box mt={2}>
          <EnqueteFormInputField
            id="total_mesures_etablissements"
            size="small"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          >
            <Box ml={3}>
              <EnqueteFormFieldLabel
                id="total_mesures_etablissements"
                enqueteForm={enqueteForm}
                label="mesure(s) prises en charge par ces établissements"
              />
            </Box>
          </EnqueteFormInputField>
        </Box>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnquetePreposeModaliteExerciceInformationsForm;
