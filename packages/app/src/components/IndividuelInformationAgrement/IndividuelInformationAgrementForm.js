import { Button, Field, Heading4, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { YES_NO_OPTIONS } from "../../constants/mandataire";
import { individuelAgrementSchema } from "../../lib/validationSchemas";
import { getOptionValue } from "../../util/option/OptionUtil";

const FieldLabel = ({ label }) => {
  return (
    <Text lineHeight="1.5" color="textSecondary">
      {label}
    </Text>
  );
};

const IndividuelInformationAgrementForm = props => {
  const { agrement, handleSubmit, handleCancel } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelAgrementSchema,
    initialValues: {
      debutActiviteAvant2009: YES_NO_OPTIONS.find(
        elm => elm.value === agrement.debut_activite_avant_2009
      ),
      anneeDebutActivite: agrement.annee_debut_activite || "",
      anneeAgrement: agrement.annee_agrement || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Heading4 pb={1}>{`Début de votre activtié`}</Heading4>
        <Field>
          <FieldLabel label="Votre activité de mandataire a-t-elle a-t-elle débuté avant 2009?" />
          <Select
            id="debutActiviteAvant2009"
            name="debutActiviteAvant2009"
            value={formik.values.debutActiviteAvant2009}
            hasError={formik.errors.debutActiviteAvant2009}
            onChange={option => {
              formik.setFieldValue("debutActiviteAvant2009", option);
              if (!option) {
                formik.setFieldValue("anneeDebutActivite", "");
              }
            }}
            options={YES_NO_OPTIONS}
          />
          <InlineError
            message={formik.errors.debutActiviteAvant2009}
            fieldId="debutActiviteAvant2009"
          />
        </Field>
        {getOptionValue(formik.values.debutActiviteAvant2009) && (
          <Field>
            <FieldLabel label="Année de début de votre activité" />
            <Input
              value={formik.values.anneeDebutActivite}
              id="anneeDebutActivite"
              name="anneeDebutActivite"
              hasError={formik.errors.anneeDebutActivite}
              onChange={formik.handleChange}
            />
            <InlineError message={formik.errors.anneeDebutActivite} fieldId="anneeDebutActivite" />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 pb={1}>{`Votre agrément`}</Heading4>
        <Field>
          <FieldLabel label="Année d'obtention de votre agrément" />
          <Input
            value={formik.values.anneeAgrement}
            id="anneeAgrement"
            name="anneeAgrement"
            hasError={formik.errors.anneeAgrement}
            onChange={formik.handleChange}
          />
          <InlineError message={formik.errors.anneeAgrement} fieldId="anneeAgrement" />
        </Field>
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

export { IndividuelInformationAgrementForm };
