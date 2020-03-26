import { Button, Field, InlineError, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Flex } from "rebass";

import { individuelFormationSchema } from "../../lib/validationSchemas";

const InputField = ({ formik, property, placeholder, onChange }) => (
  <Field>
    <Input
      value={formik.values[property]}
      id={property}
      name={property}
      hasError={formik.errors[property]}
      onChange={onChange}
      placeholder={placeholder}
    />
    <InlineError message={formik.errors[property]} fieldId={property} />
  </Field>
);

const IndividuelInformationFormationForm = props => {
  const { formation, handleSubmit } = props;

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
      <InputField
        formik={formik}
        placeholder="Niveau de qualification de 1 à 5"
        property="niveauQualification"
        onChange={formik.handleChange}
      />
      <InputField
        formik={formik}
        placeholder="Niveau de qualification du secrétaire spécialisé de 1 à 5"
        property="niveauQualificationSecretaireSpe"
        onChange={formik.handleChange}
      />
      <Flex>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Modifier
        </Button>
      </Flex>
    </form>
  );
};

export { IndividuelInformationFormationForm };
