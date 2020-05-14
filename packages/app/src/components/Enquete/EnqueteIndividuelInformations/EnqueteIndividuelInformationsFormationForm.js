import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
// import { mandataireEnqueteIndividuelAgrementFormationSchema } from "../../../lib/validationSchemas/mandataireEnqueteIndividuelSchema";

export const EnqueteIndividuelInformationsFormationForm = props => {
  const { data = {}, goToPrevPage } = props;

  const {
    cnc_dpf_annee_obtention = "",
    cnc_dpf_heure_formation,
    cnc_maj_annee_obtention = "",
    cnc_maj_heure_formation = "",
    cnc_mjpm_annee_obtention = "",
    cnc_mjpm_heure_formation = "",
    // cumul_delegue_service = "",
    // cumul_delegue_service_etp = "",
    // cumul_prepose = "",
    // cumul_prepose_etp = "",
    // debut_activite_avant_2009 = "",
    // last_update = "",
    niveau_qualification = "",
    niveau_qualification_secretaire_spe = ""
    // secretaire_specialise = ""
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    // validationSchema: mandataireEnqueteIndividuelAgrementFormationSchema,
    initialValues: {
      cnc_mjpm_annee_obtention,
      cnc_mjpm_heure_formation,
      cnc_maj_annee_obtention,
      cnc_maj_heure_formation,
      cnc_dpf_annee_obtention,
      cnc_dpf_heure_formation,
      niveau_qualification,
      niveau_qualification_secretaire_spe
    }
  });

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

        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsFormationForm;
