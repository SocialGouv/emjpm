import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

// schema identique à enqueteAgrementsFormationsStatus
export const validationSchema = yup.object().shape({
  cnc_annee_obtention: yup
    .number()
    .positive()
    .integer()
    .required(),
  cnc_heures_formation: yup
    .number()
    .positive()
    .required(),
  niveau_qualification: yup
    .number()
    .min(1)
    .max(6)
    .integer()
    .required(),
  secretaire_specialise_etp_n1: yup.number().positive(),
  secretaire_specialise_etp_spe_n2: yup.number().positive(),
  secretaire_specialise_etp_spe_n3: yup.number().positive(),
  secretaire_specialise_etp_spe_n4: yup.number().positive(),
  secretaire_specialise_etp_spe_n5: yup.number().positive(),
  secretaire_specialise_etp_spe_n6: yup.number().positive()
});

function mapDataPropsToFormValues(data) {
  return {
    cnc_annee_obtention: data.cnc_annee_obtention || "",
    cnc_heures_formation: data.cnc_heures_formation || "",
    niveau_qualification: data.niveau_qualification ? parseInt(data.niveau_qualification) : "",
    secretaire_specialise_etp_n1: data.secretaire_specialise_etp_n1
      ? parseFloat(data.secretaire_specialise_etp_n1)
      : "",
    secretaire_specialise_etp_n2: data.secretaire_specialise_etp_n2
      ? parseFloat(data.secretaire_specialise_etp_n2)
      : "",
    secretaire_specialise_etp_n3: data.secretaire_specialise_etp_n3
      ? parseFloat(data.secretaire_specialise_etp_n3)
      : "",
    secretaire_specialise_etp_n4: data.secretaire_specialise_etp_n4
      ? parseFloat(data.secretaire_specialise_etp_n4)
      : "",
    secretaire_specialise_etp_n5: data.secretaire_specialise_etp_n5
      ? parseFloat(data.secretaire_specialise_etp_n5)
      : "",
    secretaire_specialise_etp_n6: data.secretaire_specialise_etp_n6
      ? parseFloat(data.secretaire_specialise_etp_n6)
      : ""
  };
}

export const EnqueteIndividuelInformationsFormationForm = props => {
  const { data = {}, step, goToPrevPage } = props;
  const { handleSubmit, submitCount, handleChange, values, errors, setValues } = useFormik({
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
      <Heading3>Formation</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor={"cnc_annee_obtention"}>
            {"Année d'obtention du CNC"}
          </Label>
          <Input
            id="cnc_annee_obtention"
            name="cnc_annee_obtention"
            placeholder=""
            type="text"
            value={values.cnc_annee_obtention}
            onChange={handleChange}
            hasError={showError && !!errors.cnc_annee_obtention}
          />
          <InlineError
            showError={showError}
            message={errors.cnc_annee_obtention}
            fieldId="cnc_annee_obtention"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"cnc_heures_formation"}>
            {"Nombre d'heures de formation dans le cadre du CNC (hors stage)"}
          </Label>
          <Input
            id="cnc_heures_formation"
            name="cnc_heures_formation"
            placeholder=""
            type="text"
            value={values.cnc_heures_formation}
            onChange={handleChange}
            hasError={showError && !!errors.cnc_heures_formation}
          />
          <InlineError
            showError={showError}
            message={errors.cnc_heures_formation}
            fieldId="cnc_heures_formation"
          />
        </Field>

        <Field>
          <Label mb={1} htmlFor={"niveau_qualification"}>
            {"Niveau de qualification de 1 à 5"}
          </Label>
          <Input
            id="niveau_qualification"
            name="niveau_qualification"
            placeholder=""
            type="number"
            min={1}
            max={5}
            value={values.niveau_qualification}
            hasError={showError && !!errors.niveau_qualification}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.niveau_qualification}
            fieldId="niveau_qualification"
          />
        </Field>
        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          {"Activité des secrétaires spécialisés par niveau en équivalent temps plein (ETP)"}
        </Text>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n1">
            {"Secrétaires spécialisés niveau 1 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n1"
            name="secretaire_specialise_etp_n1"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n1}
            hasError={showError && !!errors.secretaire_specialise_etp_n1}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n1}
            fieldId="secretaire_specialise_etp_n1"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n2">
            {"Secrétaires spécialisés niveau 2 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n2"
            name="secretaire_specialise_etp_n2"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n2}
            hasError={showError && !!errors.secretaire_specialise_etp_n2}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n2}
            fieldId="secretaire_specialise_etp_n2"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n3">
            {"Secrétaires spécialisés niveau 3 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n3"
            name="secretaire_specialise_etp_n3"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n3}
            hasError={showError && !!errors.secretaire_specialise_etp_n3}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n3}
            fieldId="secretaire_specialise_etp_n3"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n4">
            {"Secrétaires spécialisés niveau 4 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n4"
            name="secretaire_specialise_etp_n4"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n4}
            hasError={showError && !!errors.secretaire_specialise_etp_n4}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n4}
            fieldId="secretaire_specialise_etp_n4"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n5">
            {"Secrétaires spécialisés niveau 5 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n5"
            name="secretaire_specialise_etp_n5"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n5}
            hasError={showError && !!errors.secretaire_specialise_etp_n5}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n5}
            fieldId="secretaire_specialise_etp_n5"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="secretaire_specialise_etp_n6">
            {"Secrétaires spécialisés niveau 6 (ETP)"}
          </Label>
          <Input
            id="secretaire_specialise_etp_n6"
            name="secretaire_specialise_etp_n6"
            placeholder=""
            type="number"
            value={values.secretaire_specialise_etp_n6}
            hasError={showError && !!errors.secretaire_specialise_etp_n6}
            onChange={handleChange}
          />
          <InlineError
            showError={showError}
            message={errors.secretaire_specialise_etp_n6}
            fieldId="secretaire_specialise_etp_n6"
          />
        </Field>
        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsFormationForm;
