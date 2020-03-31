import { Button, Field, Heading4, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { individuelFormationSchema } from "../../lib/validationSchemas";
import { FieldLabel } from "../IndividuelInformationCommon";

const InputField = ({ formik, property, placeholder, onChange }) => (
  <Field>
    <FieldLabel label={placeholder} />
    <Input
      value={formik.values[property]}
      id={property}
      name={property}
      hasError={formik.errors[property]}
      onChange={onChange}
      type="number"
    />
    <InlineError message={formik.errors[property]} fieldId={property} />
  </Field>
);

const IndividuelInformationFormationForm = props => {
  const { formation, handleSubmit, handleCancel } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelFormationSchema,
    initialValues: {
      cncMjpmAnneeObtention: formation.cnc_mjpm_annee_obtention || "",
      cncMjpmHeureFormation: formation.cnc_mjpm_heure_formation || "",
      cncMajAnneeObtention: formation.cnc_maj_annee_obtention || "",
      cncMajHeureFormation: formation.cnc_maj_heure_formation || "",
      cncDpfAnneeObtention: formation.cnc_dpf_annee_obtention || "",
      cncDpfHeureFormation: formation.cnc_dpf_heure_formation || "",
      niveauQualification: formation.niveau_qualification || "",
      niveauQualificationSecretaireSpe: formation.niveau_qualification_secretaire_spe || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Heading4 mb={1}>{"CNC MJPM"}</Heading4>
        <InputField
          formik={formik}
          placeholder="Année d'obtention du CNC MJPM"
          property="cncMjpmAnneeObtention"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          placeholder="Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"
          property="cncMjpmHeureFormation"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC MAJ"}</Heading4>
        <InputField
          formik={formik}
          placeholder="Année d'obtention du CNC MAJ"
          property="cncMajAnneeObtention"
          onChange={ev => {
            formik.handleChange(ev);
            if (!formik.values.cncMajAnneeObtention) {
              formik.setFieldValue("cncMajHeureFormation", "");
            }
          }}
        />
        {formik.values.cncMajAnneeObtention && !formik.errors.cncMajAnneeObtention && (
          <InputField
            formik={formik}
            placeholder="Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"
            property="cncMajHeureFormation"
            onChange={formik.handleChange}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC DPF"}</Heading4>
        <InputField
          formik={formik}
          placeholder="Année d'obtention du CNC DPF"
          property="cncDpfAnneeObtention"
          onChange={ev => {
            formik.handleChange(ev);
            if (!formik.values.cncDpfAnneeObtention) {
              formik.setFieldValue("cncDpfHeureFormation", "");
            }
          }}
        />
        {formik.values.cncDpfAnneeObtention && !formik.errors.cncDpfAnneeObtention && (
          <InputField
            formik={formik}
            placeholder="Nombre d'heures de formation dans le cadre du CNC DPF"
            property="cncDpfHeureFormation"
            onChange={formik.handleChange}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Niveau de qualification"}</Heading4>
        <InputField
          formik={formik}
          placeholder="Niveau de qualification de 1 à 5"
          property="niveauQualification"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          placeholder="Niveau de qualification du secretariat spécialisé de 1 à 5"
          property="niveauQualificationSecretaireSpe"
          onChange={formik.handleChange}
        />
      </Box>
      <Flex alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
        </Box>
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export { IndividuelInformationFormationForm };
