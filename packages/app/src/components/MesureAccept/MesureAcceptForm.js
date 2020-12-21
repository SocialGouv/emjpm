import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { FormGroupInput, FormGroupSelect } from "~/components/AppForm";
import { GeocodeCities } from "~/components/Geocode";
import { mesureAcceptSchema } from "~/lib/validationSchemas";
import { Button, Field, Heading3, Heading5, InlineError } from "~/ui";

export const MesureAcceptForm = (props) => {
  const { mesure, handleSubmit, handleCancel, antenneOptions } = props;

  const formik = useFormik({
    initialValues: {
      code_postal: mesure.code_postal,
      date_nomination: mesure.judgmentDate || "",
      lieu_vie: "",
      pays: "FR",
      ville: mesure.ville,
    },
    onSubmit: handleSubmit,
    validationSchema: mesureAcceptSchema,
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Accepter la mesure</Heading5>
        <Text lineHeight="1.5">
          {`A reception de la notification de la decision du juge par courrier, le formulaire ci-contre vous permet de valider que cette mesure vous a ete attribuee.`}
        </Text>
        <Text lineHeight="1.5">
          {`Afin de rendre cette mesure active, vous devez imperativement remplir tous les champs de ce formulaire, puis cliquer sur "Valider la mesure".`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Accepter la mesure</Heading3>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <FormGroupInput
            placeholder="Date de nomination"
            type="date"
            id="date_nomination"
            formik={formik}
            validationSchema={mesureAcceptSchema}
          />

          {antenneOptions.length > 0 && (
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              validationSchema={mesureAcceptSchema}
            />
          )}

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureAcceptSchema}
            onChange={(option) => {
              formik.setFieldValue("lieu_vie", option.value);
              formik.setFieldValue("type_etablissement", null);
            }}
          />

          {isTypeEtablissementRequired(formik.values.lieu_vie) && (
            <FormGroupSelect
              id="type_etablissement"
              options={MESURE_PROTECTION.TYPE_ETABLISSEMENT.options}
              placeholder="Type d'établissement"
              formik={formik}
              validationSchema={mesureAcceptSchema}
            />
          )}

          <FormGroupSelect
            id="pays"
            options={[
              {
                label: "France",
                value: "FR",
              },
              {
                label: "Belgique",
                value: "BE",
              },
            ]}
            placeholder="Pays"
            formik={formik}
            validationSchema={mesureAcceptSchema}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  validationSchema={mesureAcceptSchema}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
                />
              </Box>
              <Box ml={1} flex={1 / 2}>
                <Field>
                  <GeocodeCities
                    placeholder="Ville"
                    name="ville"
                    id="ville"
                    zipcode={formik.values.code_postal}
                    onChange={(value) => formik.setFieldValue("ville", value)}
                    value={formik.values.ville}
                    hasError={!!formik.errors.ville}
                  />
                  <InlineError message={formik.errors.ville} fieldId="ville" />
                </Field>
              </Box>
            </Flex>
          )}

          <Flex justifyContent="flex-end">
            <Box>
              <Button mr="2" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                Valider la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default MesureAcceptForm;
