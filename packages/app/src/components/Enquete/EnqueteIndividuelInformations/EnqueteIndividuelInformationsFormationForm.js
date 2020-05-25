import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box } from "rebass";

import { enqueteMandataireIndividuelFormationSchema } from "../../../lib/validationSchemas";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

function mapDataPropsToFormValues(data) {
  return {
    cnc_mjpm_annee_obtention: data.cnc_mjpm_annee_obtention || "",
    cnc_mjpm_heure_formation: data.cnc_mjpm_heure_formation || "",
    cnc_maj_annee_obtention: data.cnc_maj_annee_obtention || "",
    cnc_maj_heure_formation: data.cnc_maj_heure_formation || "",
    cnc_dpf_annee_obtention: data.cnc_dpf_annee_obtention || "",
    cnc_dpf_heure_formation: data.cnc_dpf_heure_formation || "",
    niveau_qualification: data.niveau_qualification || "",
    niveau_qualification_secretaire_spe: data.niveau_qualification_secretaire_spe || ""
  };
}

export const EnqueteIndividuelInformationsFormationForm = props => {
  const { data = {}, goToPrevPage, loading = false } = props;
  const { handleSubmit, handleChange, values, errors, setFieldValue, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema: enqueteMandataireIndividuelFormationSchema,
    initialValues: mapDataPropsToFormValues(data)
  });
  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Formation</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor={"cnc_mjpm_annee_obtention"}>
            {"Année d'obtention du CNC MJPM"}
          </Label>
          <Input
            id="cnc_mjpm_annee_obtention"
            name="cnc_mjpm_annee_obtention"
            placeholder=""
            type="text"
            value={values.cnc_mjpm_annee_obtention}
            onChange={handleChange}
            hasError={!!errors.cnc_mjpm_annee_obtention}
          />
          <InlineError
            message={errors.cnc_mjpm_annee_obtention}
            fieldId="cnc_mjpm_annee_obtention"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"cnc_mjpm_heure_formation"}>
            {"Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"}
          </Label>
          <Input
            id="cnc_mjpm_heure_formation"
            name="cnc_mjpm_heure_formation"
            placeholder=""
            type="text"
            value={values.cnc_mjpm_heure_formation}
            onChange={handleChange}
            hasError={!!errors.cnc_mjpm_heure_formation}
          />
          <InlineError
            message={errors.cnc_mjpm_heure_formation}
            fieldId="cnc_mjpm_heure_formation"
          />
        </Field>

        <Field>
          <Label mb={1} htmlFor={"cnc_maj_annee_obtention"}>
            {"Année d'obtention du CNC MAJ"}
          </Label>
          <Input
            id="cnc_maj_annee_obtention"
            name="cnc_maj_annee_obtention"
            placeholder=""
            type="text"
            value={values.cnc_maj_annee_obtention}
            hasError={!!errors.cnc_maj_annee_obtention}
            onChange={event => {
              handleChange(event);
              if (!values.cnc_maj_annee_obtention) {
                setFieldValue("cnc_maj_heure_formation", "");
              }
            }}
          />
          <InlineError message={errors.cnc_maj_annee_obtention} fieldId="cnc_maj_annee_obtention" />
        </Field>

        {values.cncMajAnneeObtention && !errors.cnc_maj_annee_obtention && (
          <Field>
            <Label mb={1} htmlFor={"cnc_maj_heure_formation"}>
              {"Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"}
            </Label>
            <Input
              id="cnc_maj_heure_formation"
              name="cnc_maj_heure_formation"
              placeholder=""
              type="text"
              hasError={!!errors.cnc_maj_heure_formation}
              value={values.cnc_maj_heure_formation}
              onChange={handleChange}
            />
            <InlineError
              message={errors.cnc_maj_heure_formation}
              fieldId="cnc_maj_heure_formation"
            />
          </Field>
        )}
        <Field>
          <Label mb={1} htmlFor={"cnc_dpf_annee_obtention"}>
            {"Année d'obtention du CNC DPF"}
          </Label>
          <Input
            id="cnc_dpf_annee_obtention"
            name="cnc_dpf_annee_obtention"
            hasError={!!errors.cnc_dpf_annee_obtention}
            placeholder=""
            type="text"
            value={values.cnc_dpf_annee_obtention}
            onChange={event => {
              handleChange(event);
              if (!values.cnc_dpf_annee_obtention) {
                setFieldValue("cnc_dpf_heure_formation", "");
              }
            }}
          />
          <InlineError message={errors.cnc_dpf_annee_obtention} fieldId="cnc_dpf_annee_obtention" />
        </Field>

        {values.cnc_dpf_annee_obtention && !errors.cnc_dpf_annee_obtention && (
          <Field>
            <Label mb={1} htmlFor={"cnc_dpf_heure_formation"}>
              {"Nombre d'heures de formation dans le cadre du CNC DPF"}
            </Label>
            <Input
              id="cnc_dpf_heure_formation"
              name="cnc_dpf_heure_formation"
              placeholder=""
              type="text"
              value={values.cnc_dpf_heure_formation}
              onChange={handleChange}
              hasError={!!errors.cnc_dpf_heure_formation}
            />
            <InlineError
              message={errors.cnc_dpf_heure_formation}
              fieldId="cnc_dpf_heure_formation"
            />
          </Field>
        )}

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
            hasError={!!errors.niveau_qualification}
            onChange={handleChange}
          />
          <InlineError message={errors.niveau_qualification} fieldId="niveau_qualification" />
        </Field>

        <Field>
          <Label mb={1} htmlFor={"niveau_qualification_secretaire_spe"}>
            {"Niveau de qualification du secretariat spécialisé de 1 à 5"}
          </Label>
          <Input
            id="niveau_qualification_secretaire_spe"
            name="niveau_qualification_secretaire_spe"
            min={1}
            max={5}
            placeholder=""
            type="number"
            value={values.niveau_qualification_secretaire_spe}
            hasError={!!errors.niveau_qualification_secretaire_spe}
            onChange={handleChange}
          />
          <InlineError
            message={errors.niveau_qualification_secretaire_spe}
            fieldId="niveau_qualification_secretaire_spe"
          />
        </Field>

        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsFormationForm;
