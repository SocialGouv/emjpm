import { Button, Field, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

export const ListeBlancheServiceForm = (props) => {
  const { handleSubmit, editMode } = props;

  const formik = useFormik({
    onSubmit: async (values) => {
      if (handleSubmit) {
        await handleSubmit(values);
      }
    },
    initialValues: {
      email: "",
      nom: "",
      telephone: "",
      siret: "",
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.siret}
          id="siret"
          name="siret"
          hasError={formik.errors.siret && formik.touched.siret}
          onChange={formik.handleChange}
          placeholder="SIRET"
        />
        {formik.touched.siret && <InlineError message={formik.errors.siret} fieldId="siret" />}
      </Field>
      <Field>
        <Input
          value={formik.values.etablissement}
          id="nom"
          name="nom"
          hasError={formik.errors.etablissement && formik.touched.etablissement}
          onChange={formik.handleChange}
          placeholder="Nom du service"
        />
        {formik.touched.etablissement && (
          <InlineError message={formik.errors.etablissement} fieldId="nom" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.email}
          id="email"
          name="email"
          hasError={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        <InlineError message={formik.errors.email} fieldId="email" />
      </Field>
      <Field>
        <Input
          value={formik.values.telephone}
          id="telephone"
          name="telephone"
          hasError={formik.errors.telephone && formik.touched.telephone}
          onChange={formik.handleChange}
          placeholder="Téléphone"
        />
        <InlineError message={formik.errors.telephone} fieldId="telephone" />
      </Field>
      <Flex justifyContent="flex-end">
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            {editMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default ListeBlancheServiceForm;
