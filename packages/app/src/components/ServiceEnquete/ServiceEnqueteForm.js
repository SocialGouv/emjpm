import { Button, Field, Heading4, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { enqueteServicesSchema } from "../../lib/validationSchemas";

const InputField = ({ formik, property, label, onChange }) => (
  <Field>
    <Label mb={1} htmlFor={property}>
      {label}
    </Label>
    <Input
      placeholder=""
      value={formik.values[property]}
      id={property}
      name={property}
      hasError={!!formik.errors[property]}
      onChange={onChange}
      type="number"
    />
    <InlineError message={formik.errors[property]} fieldId={property} />
  </Field>
);

export const ServiceEnqueteForm = props => {
  const { enqueteServices, handleSubmit } = props;
  const {
    nombre_postes_delegues_etp,
    nombre_delegues,
    nombre_poste_autre_personnel_etp,
    nombre_delegues_cnc,
    nombre_delegues_cnc_pjm,
    nombre_delegues_cnc_maj,
    nombre_delegues_cnc_dpf,
    nombre_delegues_en_formation,
    nombre_delegues_non_formes
  } = enqueteServices;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: enqueteServicesSchema,
    initialValues: {
      nombrePostesDeleguesEtp: nombre_postes_delegues_etp || "",
      nombreDelegues: nombre_delegues || "",
      nombrePosteAutrePersonnelEtp: nombre_poste_autre_personnel_etp || "",
      nombreDeleguesCnc: nombre_delegues_cnc || "",
      nombreDeleguesCncPjm: nombre_delegues_cnc_pjm || "",
      nombreDeleguesCncMaj: nombre_delegues_cnc_maj || "",
      nombreDeleguesCncDpf: nombre_delegues_cnc_dpf || "",
      nombreDeleguesEnFormation: nombre_delegues_en_formation || "",
      nombreDeleguesNonFormes: nombre_delegues_non_formes || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Heading4 pb={1}>{`Informations sur le personnel`}</Heading4>
        <InputField
          formik={formik}
          property="nombrePostesDeleguesEtp"
          label="Nombre de postes de délégués en ETP"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDelegues"
          label="Nombre de délégués"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombrePosteAutrePersonnelEtp"
          label="Nombre de postes autres personnels en ETP"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués formés`}</Heading4>
        <InputField
          formik={formik}
          property="nombreDeleguesCnc"
          label="Nombre de délégués en poste et ayant CNC"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncPjm"
          label="Nombre de délégués en poste et ayant CNC PJM"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncMaj"
          label="Nombre de délégués en poste et ayant CNC MAJ"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncDpf"
          label="Nombre de délégués en poste et ayant CNC DPF"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués non formés ou en cours de formation`}</Heading4>
        <InputField
          formik={formik}
          property="nombreDeleguesEnFormation"
          label="Nombre de délégués en poste et en formation"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesNonFormes"
          label="Nombre de délégués en poste ni formés, ni en formation"
          onChange={formik.handleChange}
        />
      </Box>
      <Flex alignItems="center" justifyContent="flex-end">
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default ServiceEnqueteForm;
