import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { CIVILITY, COUNTRIES, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

const initialValues = {
  annee: "",
  antenne: "",
  civilite: "",
  code_postal: "",
  date_ouverture: "",
  numero_dossier: "",
  numero_rg: "",
  tribunal: undefined,
  city: "",
  zipcode: "",
  country: { value: "FR", label: COUNTRIES["FR"] },
  cabinet: "",
};

export const ServiceMesureCreateForm = (props) => {
  const { tribunaux, antenneOptions, handleSubmit } = props;
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: serviceMesureSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.numero_rg}
          id="numero_rg"
          name="numero_rg"
          hasError={formik.errors.numero_rg && formik.touched.numero_rg}
          onChange={formik.handleChange}
          placeholder="Numéro RG"
        />
        {formik.touched.numero_rg && (
          <InlineError message={formik.errors.numero_rg} fieldId="numero_rg" />
        )}
      </Field>
      <Field>
        <TribunalAutoComplete
          id="tribunal"
          value={formik.values.tribunal}
          name="tribunal"
          hasError={formik.errors.tribunal && formik.touched.tribunal}
          onChange={(option) => formik.setFieldValue("tribunal", option)}
          defaultOptions={tribunaux}
        />
        {formik.touched.tribunal && (
          <InlineError message={formik.errors.tribunal} fieldId="tribunal" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.cabinet}
          id="cabinet"
          name="cabinet"
          hasError={formik.errors.cabinet && formik.touched.cabinet}
          onChange={formik.handleChange}
          placeholder="Cabinet"
        />
        {formik.touched.cabinet && (
          <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.numero_dossier}
          id="numero_dossier"
          name="numero_dossier"
          hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
          onChange={formik.handleChange}
          placeholder="Numéro de dossier"
        />
        {formik.touched.numero_dossier && (
          <InlineError message={formik.errors.numero_dossier} fieldId="numero_dossier" />
        )}
      </Field>
      <Field>
        <Select
          id="antenne"
          name="antenne"
          placeholder="Antenne"
          value={formik.values.antenne}
          hasError={formik.errors.antenne_id && formik.touched.antenne_id}
          onChange={(option) => formik.setFieldValue("antenne", option)}
          options={antenneOptions}
        />
        {formik.touched.antenne_id && (
          <InlineError message={formik.errors.antenne_id} fieldId="antenne" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.date_ouverture}
          id="date_ouverture"
          type="date"
          name="date_ouverture"
          hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
          onChange={formik.handleChange}
          placeholder="Date d'ordonnance"
        />
        {formik.touched.date_ouverture && (
          <InlineError message={formik.errors.date_ouverture} fieldId="date_ouverture" />
        )}
      </Field>
      <Field>
        <Select
          id="type"
          name="type"
          placeholder="Type de mesure"
          value={formik.values.type}
          hasError={formik.errors.type && formik.touched.type}
          onChange={(option) => formik.setFieldValue("type", option)}
          options={MESURE_TYPE_LABEL_VALUE}
        />
        {formik.touched.type && <InlineError message={formik.errors.type} fieldId="type" />}
      </Field>
      <Field>
        <Select
          id="civilite"
          name="civilite"
          placeholder="Civilité"
          value={formik.values.civilite}
          hasError={formik.errors.civilite && formik.touched.civilite}
          onChange={(option) => formik.setFieldValue("civilite", option)}
          options={CIVILITY}
        />
        {formik.touched.civilite && (
          <InlineError message={formik.errors.civilite} fieldId="civilite" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.annee}
          id="annee"
          name="annee"
          type="number"
          hasError={formik.errors.annee && formik.touched.annee}
          onChange={formik.handleChange}
          placeholder="Année de naissance"
        />
        {formik.touched.annee && <InlineError message={formik.errors.annee} fieldId="type" />}
      </Field>
      <Field>
        <Select
          id="residence"
          name="residence"
          placeholder="Type de residence"
          value={formik.values.residence}
          hasError={!!formik.errors.residence}
          onChange={(option) => formik.setFieldValue("residence", option)}
          options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey}
        />
        {formik.touched.residence && (
          <InlineError message={formik.errors.residence} fieldId="residence" />
        )}
      </Field>

      <Field>
        <Select
          id="country"
          name="country"
          placeholder="Pays"
          value={formik.values.country}
          hasError={formik.errors.country && formik.touched.country}
          onChange={(option) => formik.setFieldValue("country", option)}
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
        />
        {formik.errors.country && formik.touched.country && <Text>{formik.errors.country}</Text>}
      </Field>

      {formik.values.country && formik.values.country.value === "FR" && (
        <Flex justifyContent="space-between">
          <Box mr={1} flex={1 / 2}>
            <Field>
              <Input
                value={formik.values.zipcode}
                id="zipcode"
                name="zipcode"
                onChange={async (e) => {
                  const { value } = e.target;
                  await formik.setFieldValue("zipcode", value);
                  await formik.setFieldValue("city", "");
                }}
                hasError={!!formik.errors.zipcode}
                placeholder="Code postal"
              />
              <InlineError message={formik.errors.zipcode} fieldId="zipcode" />
            </Field>
          </Box>
          <Box ml={1} flex={1 / 2}>
            <Field>
              <GeocodeCities
                placeholder="Ville"
                name="city"
                id="city"
                zipcode={formik.values.zipcode}
                onChange={(value) => formik.setFieldValue("city", value)}
                value={formik.values.city}
                hasError={!!formik.errors.city}
              />
              <InlineError message={formik.errors.city} fieldId="city" />
            </Field>
          </Box>
        </Flex>
      )}
      <Flex justifyContent="flex-end">
        <Box>
          <Button mr="2" variant="outline">
            <Link href="/services">
              <a>Annuler</a>
            </Link>
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
