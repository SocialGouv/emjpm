import { Button, Field, Heading4, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { servicePersonnelSchema } from "../../lib/validationSchemas";
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

const ServiceInformationPersonnelForm = props => {
  const { personnel, handleSubmit, handleCancel } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: servicePersonnelSchema,
    initialValues: {
      nombrePostesDeleguesEtp: personnel.nombre_postes_delegues_etp || "",
      nombreDelegues: personnel.nombre_delegues || "",
      nombrePosteAutrePersonnelEtp: personnel.nombre_poste_autre_personnel_etp || "",
      nombreDeleguesCnc: personnel.nombre_delegues_cnc || "",
      nombreDeleguesCncPjm: personnel.nombre_delegues_cnc_pjm || "",
      nombreDeleguesCncMaj: personnel.nombre_delegues_cnc_maj || "",
      nombreDeleguesCncDpf: personnel.nombre_delegues_cnc_dpf || "",
      nombreDeleguesEnFormation: personnel.nombre_delegues_en_formation || "",
      nombreDeleguesNonFormes: personnel.nombre_delegues_non_formes || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Heading4 pb={1}>{`Informations sur le personnel`}</Heading4>
        <InputField
          formik={formik}
          property="nombrePostesDeleguesEtp"
          placeholder="Nombre de postes de délégués en ETP"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDelegues"
          placeholder="Nombre de délégués"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombrePosteAutrePersonnelEtp"
          placeholder="Nombre de postes autres personnels en ETP"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués formés`}</Heading4>
        <InputField
          formik={formik}
          property="nombreDeleguesCnc"
          placeholder="Nombre de délégués en poste et ayant CNC"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncPjm"
          placeholder="Nombre de délégués en poste et ayant CNC PJM"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncMaj"
          placeholder="Nombre de délégués en poste et ayant CNC MAJ"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesCncDpf"
          placeholder="Nombre de délégués en poste et ayant CNC DPF"
          onChange={formik.handleChange}
        />
      </Box>
      <Box>
        <Heading4 pb={1}>{`Délégués non formés ou en cours de formation`}</Heading4>
        <InputField
          formik={formik}
          property="nombreDeleguesEnFormation"
          placeholder="Nombre de délégués en poste et en formation"
          onChange={formik.handleChange}
        />
        <InputField
          formik={formik}
          property="nombreDeleguesNonFormes"
          placeholder="Nombre de délégués en poste ni formés, ni en formation"
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

export { ServiceInformationPersonnelForm };
