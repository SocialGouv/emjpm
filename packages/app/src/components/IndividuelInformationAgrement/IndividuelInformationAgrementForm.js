import { Button, Field, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Flex, Text } from "rebass";

import { YES_NO_OPTIONS } from "../../constants/mandataire";
import { individuelAgrementSchema } from "../../lib/validationSchemas";
import { getOptionValue } from "../../util/option/OptionUtil";

const IndividuelInformationAgrementForm = props => {
  const { agrement, handleSubmit } = props;

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
      <Field>
        <Text>{"L'activité du mandataire individuel a-t-elle débuté avant 2009?"}</Text>
        <Select
          id="debutActiviteAvant2009"
          name="debutActiviteAvant2009"
          placeholder="L'activité du mandataire individuel a-t-elle débuté avant 2009?"
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
          <Text>{"Année de début de votre activité"}</Text>
          <Input
            value={formik.values.anneeDebutActivite}
            id="anneeDebutActivite"
            name="anneeDebutActivite"
            hasError={formik.errors.anneeDebutActivite}
            onChange={formik.handleChange}
            placeholder="Année de début de votre activité"
          />
          <InlineError message={formik.errors.anneeDebutActivite} fieldId="anneeDebutActivite" />
        </Field>
      )}
      <Field>
        <Text>{"Année d'obtention de votre agrément"}</Text>
        <Input
          value={formik.values.anneeAgrement}
          id="anneeAgrement"
          name="anneeAgrement"
          hasError={formik.errors.anneeAgrement}
          onChange={formik.handleChange}
          placeholder="Année d'obtention de votre agrément"
        />
        <InlineError message={formik.errors.anneeAgrement} fieldId="anneeAgrement" />
      </Field>
      <Flex>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Modifier
        </Button>
      </Flex>
    </form>
  );
};

export { IndividuelInformationAgrementForm };
