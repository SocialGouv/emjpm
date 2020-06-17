import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
import yup from "../../../lib/validationSchemas/yup";
import { formatFormBoolean, formatFormInput } from "../../../util";
import { findOption } from "../../../util/option/OptionUtil";
import { ENQ_REP_AGREMENTS_FORMATIONS } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à enqueteAgrementsFormationsStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  debut_activite_avant_2009: yup.boolean().required(),
  annee_agrement: yup.number().integer().min(2009).required(),
  nb_departements: yup.mixed().oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys).required(),
  nb_mesures_dep_finance: yup.number().integer().required(),
  nb_mesures_dep_autres: yup.number().integer().required(),
});

function dataToForm(data) {
  return {
    debut_activite_avant_2009: formatFormBoolean(data.debut_activite_avant_2009, false),
    annee_agrement: formatFormInput(data.annee_agrement),
    nb_departements: formatFormInput(data.nb_departements),
    nb_mesures_dep_finance: formatFormInput(data.nb_mesures_dep_finance),
    nb_mesures_dep_autres: formatFormInput(data.nb_mesures_dep_finance),
  };
}

export const EnqueteIndividuelInformationsAgrementForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const {
    submitForm,
    handleChange,
    values,
    errors,
    setFieldValue,
    showError,
    submit,
  } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>{"Agrément"}</Heading3>

      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor="debut_activite_avant_2009">
            {"Exerciez vous l'activité de mandataire avant le 01/01/2009 ?"}
          </Label>
          <YesNoComboBox
            value={values.debut_activite_avant_2009}
            name="debut_activite_avant_2009"
            onChange={(value) => {
              setFieldValue("debut_activite_avant_2009", value);
              if (!value) {
                setFieldValue("debut_activite_avant_2009", "");
              }
            }}
          />
          <InlineError
            showError={showError}
            message={errors.debut_activite_avant_2009}
            fieldId="debut_activite_avant_2009"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"annee_agrement"}>
            {
              "Indiquez l'année de votre agrément selon les nouvelles modalités prévues par la loi du 5 mars 2007"
            }
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.annee_agrement}
            id="annee_agrement"
            name="annee_agrement"
            hasError={showError && !!errors.annee_agrement}
            onChange={handleChange}
            min={2009}
          />
          <InlineError
            showError={showError}
            message={errors.annee_agrement}
            fieldId="annee_agrement"
          />
        </Field>

        <Field>
          <Label mb={1} htmlFor="nb_departements">
            {"Nombre de départements dans lesquels vous disposez d'un agrément"}
          </Label>
          <Select
            placeholder=""
            id="nb_departements"
            instanceId={"nb_departements"}
            name="nb_departements"
            value={findOption(
              ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byKey,
              values.nb_departements
            )}
            hasError={showError && !!errors.nb_departements}
            onChange={(option) => setFieldValue("nb_departements", option.value)}
            options={ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byKey}
          />
          <InlineError
            showError={showError}
            message={errors.nb_departements}
            fieldId="nb_departements"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"nb_mesures_dep_finance"}>
            {
              "Nombre de mesures au 31/12 exercées dans le département dans lequel vous avez obtenu votre premier agrément et qui vous finance"
            }
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.nb_mesures_dep_finance}
            id="nb_mesures_dep_finance"
            name="nb_mesures_dep_finance"
            hasError={showError && !!errors.nb_mesures_dep_finance}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.nb_mesures_dep_finance}
            fieldId="nb_mesures_dep_finance"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"nb_mesures_dep_autres"}>
            {"Le cas échéant, nombre de mesures exerçées dans les autres départements"}
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.nb_mesures_dep_autres}
            id="nb_mesures_dep_autres"
            name="nb_mesures_dep_autres"
            hasError={showError && !!errors.nb_mesures_dep_autres}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.nb_mesures_dep_autres}
            fieldId="nb_mesures_dep_autres"
          />
        </Field>
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsAgrementForm;
