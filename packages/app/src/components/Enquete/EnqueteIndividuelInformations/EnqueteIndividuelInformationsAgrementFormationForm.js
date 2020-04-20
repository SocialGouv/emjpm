import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { mandataireEnqueteIndividuelAgrementFormationSchema } from "../../../lib/validationSchemas/mandataireEnqueteIndividuelSchema";

export const EnqueteIndividuelInformationsAgrementFormationForm = props => {
  const { data = {} } = props;

  const {
    annee_agrement,
    cnc_mjpm_annee_obtention,
    cnc_mjpm_heure_formation,
    cnc_maj_annee_obtention,
    cnc_maj_heure_formation,
    cnc_dpf_annee_obtention,
    cnc_dpf_heure_formation,
    niveau_qualification,
    niveau_qualification_secretaire_spe
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema: mandataireEnqueteIndividuelAgrementFormationSchema,
    initialValues: {
      anneeAgrement: annee_agrement || "",
      cncMjpmAnneeObtention: cnc_mjpm_annee_obtention || "",
      cncMjpmHeureFormation: cnc_mjpm_heure_formation || "",
      cncMajAnneeObtention: cnc_maj_annee_obtention || "",
      cncMajHeureFormation: cnc_maj_heure_formation || "",
      cncDpfAnneeObtention: cnc_dpf_annee_obtention || "",
      cncDpfHeureFormation: cnc_dpf_heure_formation || "",
      niveauQualification: niveau_qualification || "",
      niveauQualificationSecretaireSpe: niveau_qualification_secretaire_spe || ""
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Agréments et formations</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor={"anneeAgrement"}>
            {"Année d'obtention de votre agrément"}
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.anneeAgrement}
            id="anneeAgrement"
            name="anneeAgrement"
            hasError={!!errors.anneeAgrement}
            onChange={handleChange}
          />
          <InlineError message={errors.anneeAgrement} fieldId="anneeAgrement" />
        </Field>
      </Box>

      <Box>
        <Field>
          <Label mb={1} htmlFor={"cncMjpmAnneeObtention"}>
            {"Année d'obtention du CNC MJPM"}
          </Label>
          <Input
            id="cncMjpmAnneeObtention"
            name="cncMjpmAnneeObtention"
            placeholder=""
            type="text"
            value={values.cncMjpmAnneeObtention}
            onChange={handleChange}
            hasError={!!errors.cncMjpmAnneeObtention}
          />
          <InlineError message={errors.cncMjpmAnneeObtention} fieldId="cncMjpmAnneeObtention" />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"cncMjpmHeureFormation"}>
            {"Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"}
          </Label>
          <Input
            id="cncMjpmHeureFormation"
            name="cncMjpmHeureFormation"
            placeholder=""
            type="text"
            value={values.cncMjpmHeureFormation}
            onChange={handleChange}
            hasError={!!errors.cncMjpmHeureFormation}
          />
          <InlineError message={errors.cncMjpmHeureFormation} fieldId="cncMjpmHeureFormation" />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1} htmlFor={"cncMajAnneeObtention"}>
            {"Année d'obtention du CNC MAJ"}
          </Label>
          <Input
            id="cncMajAnneeObtention"
            name="cncMajAnneeObtention"
            placeholder=""
            type="text"
            value={values.cncMajAnneeObtention}
            hasError={!!errors.cncMajAnneeObtention}
            onChange={event => {
              handleChange(event);
              if (!values.cncMajAnneeObtention) {
                setFieldValue("cncMajHeureFormation", "");
              }
            }}
          />
          <InlineError message={errors.cncMajAnneeObtention} fieldId="cncMajAnneeObtention" />
        </Field>

        {values.cncMajAnneeObtention && !errors.cncMajAnneeObtention && (
          <Field>
            <Label mb={1} htmlFor={"cncMajHeureFormation"}>
              {"Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"}
            </Label>
            <Input
              id="cncMajHeureFormation"
              name="cncMajHeureFormation"
              placeholder=""
              type="text"
              hasError={!!errors.cncMajHeureFormation}
              value={values.cncMajHeureFormation}
              onChange={handleChange}
            />
            <InlineError message={errors.cncMajHeureFormation} fieldId="cncMajHeureFormation" />
          </Field>
        )}
      </Box>
      <Box>
        <Field>
          <Label mb={1} htmlFor={"cncDpfAnneeObtention"}>
            {"Année d'obtention du CNC DPF"}
          </Label>
          <Input
            id="cncDpfAnneeObtention"
            name="cncDpfAnneeObtention"
            hasError={!!errors.cncDpfAnneeObtention}
            placeholder=""
            type="text"
            value={values.cncDpfAnneeObtention}
            onChange={event => {
              handleChange(event);
              if (!values.cncDpfAnneeObtention) {
                setFieldValue("cncDpfHeureFormation", "");
              }
            }}
          />
          <InlineError message={errors.cncDpfAnneeObtention} fieldId="cncDpfAnneeObtention" />
        </Field>

        {values.cncDpfAnneeObtention && !errors.cncDpfAnneeObtention && (
          <Field>
            <Label mb={1} htmlFor={"cncDpfHeureFormation"}>
              {"Nombre d'heures de formation dans le cadre du CNC DPF"}
            </Label>
            <Input
              id="cncDpfHeureFormation"
              name="cncDpfHeureFormation"
              placeholder=""
              type="text"
              value={values.cncDpfHeureFormation}
              onChange={handleChange}
              hasError={!!errors.cncDpfHeureFormation}
            />
            <InlineError message={errors.cncDpfHeureFormation} fieldId="cncDpfHeureFormation" />
          </Field>
        )}
      </Box>
      <Box>
        <Field>
          <Label mb={1} htmlFor={"niveauQualification"}>
            {"Niveau de qualification de 1 à 5"}
          </Label>
          <Input
            id="niveauQualification"
            name="niveauQualification"
            placeholder=""
            type="number"
            min={1}
            max={5}
            value={values.niveauQualification}
            hasError={!!errors.niveauQualification}
            onChange={handleChange}
          />
          <InlineError message={errors.niveauQualification} fieldId="niveauQualification" />
        </Field>

        <Field>
          <Label mb={1} htmlFor={"niveauQualification"}>
            {"Niveau de qualification du secretariat spécialisé de 1 à 5"}
          </Label>
          <Input
            id="niveauQualificationSecretaireSpe"
            name="niveauQualificationSecretaireSpe"
            min={1}
            max={5}
            placeholder=""
            type="number"
            value={values.niveauQualificationSecretaireSpe}
            hasError={!!errors.niveauQualificationSecretaireSpe}
            onChange={handleChange}
          />
          <InlineError
            message={errors.niveauQualificationSecretaireSpe}
            fieldId="niveauQualificationSecretaireSpe"
          />
        </Field>
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsAgrementFormationForm;
