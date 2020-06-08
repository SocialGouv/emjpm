import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
import yup from "../../../lib/validationSchemas/yup";
import { findOption } from "../../../util/option/OptionUtil";
import { ENQ_REP_AGREMENTS_FORMATIONS } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

// schema identique à enqueteAgrementsFormationsStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  debut_activite_avant_2009: yup.boolean().required(),
  annee_agrement: yup
    .number()
    .integer()
    .min(2009)
    .required(),
  nb_departements: yup
    .mixed()
    .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
    .required(),
  nb_mesures_dep_finance: yup
    .number()
    .integer()
    .required(),
  nb_mesures_dep_autres: yup
    .number()
    .integer()
    .required()
});

function mapDataPropsToFormValues(data) {
  return {
    debut_activite_avant_2009: data.debut_activite_avant_2009 || false,
    annee_agrement: data.annee_agrement || "",
    nb_departements: data.nb_departements || "",
    nb_mesures_dep_finance: data.nb_mesures_dep_finance || "",
    nb_mesures_dep_autres: data.nb_mesures_dep_autres || ""
  };
}

export const EnqueteIndividuelInformationsAgrementsForm = props => {
  const { data = {}, step, goToPrevPage } = props;
  const {
    handleSubmit,
    submitCount,
    handleChange,
    values,
    errors,
    setValues,
    setFieldValue
  } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema,
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);
  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>{"Agréments"}</Heading3>

      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor="debut_activite_avant_2009">
            {"Exerciez vous l'activité de mandataire avant le 1/01/2009 ?"}
          </Label>
          <YesNoComboBox
            defaultValue={values.debut_activite_avant_2009}
            name="debut_activite_avant_2009"
            onChange={value => {
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
            onChange={option => setFieldValue("nb_departements", option.value)}
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
        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsAgrementsForm;
