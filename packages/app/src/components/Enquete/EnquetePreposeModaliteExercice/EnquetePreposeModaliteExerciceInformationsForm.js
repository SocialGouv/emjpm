import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat, parseFormInput } from "../../../util";
import {
  ENQ_REP_MODALITE_EXERCICE,
  PERSONNALITE_JURIDIQUE,
} from "../constants";
import {
  EnqueteFormFieldLabel,
  EnqueteFormInputField,
  EnqueteFormSelectField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  activite_exercee_par: yup
    .mixed()
    .oneOf(ENQ_REP_MODALITE_EXERCICE.ACTIVE_EXERCEE_PAR.keys)
    .required(),
  departement: yup.string().required(),
  etablissements_type: yup
    .mixed()
    .oneOf(ENQ_REP_MODALITE_EXERCICE.ETABLISSEMENTS_TYPE.keys)
    .required(),
  personnalite_juridique_etablissement: yup.string().required(),
  raison_sociale: yup.string().required(),
  region: yup.string().required(),
  total_mesures_etablissements: yup.number().min(0).required(),
});

function dataToForm(data) {
  return {
    activite_exercee_par: formatFormInput(data.activite_exercee_par),
    departement: formatFormInput(data.departement),
    etablissements_type: formatFormInput(data.etablissements_type),
    personnalite_juridique_etablissement: formatFormInput(
      data.personnalite_juridique_etablissement
    ),
    raison_sociale: formatFormInput(data.raison_sociale),
    region: formatFormInput(data.region),
    total_mesures_etablissements: formatFormInput(
      data.total_mesures_etablissements
    ),
  };
}
function formToData(values) {
  return {
    activite_exercee_par: values.activite_exercee_par,
    departement: parseFormInput(values.departement),
    etablissements_type: values.etablissements_type,
    personnalite_juridique_etablissement: parseFormInput(
      values.personnalite_juridique_etablissement
    ),
    raison_sociale: parseFormInput(values.raison_sociale),
    region: parseFormInput(values.region),
    total_mesures_etablissements: parseFormFloat(
      values.total_mesures_etablissements
    ),
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
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
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
