import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { COUNTRIES } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

const initialValues = {
  annee_naissance: "",
  antenne: "",
  civilite: "",
  code_postal: "",
  date_nomination: "",
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
          value={formik.values.date_nomination}
          id="date_nomination"
          type="date"
          name="date_nomination"
          hasError={formik.errors.date_nomination && formik.touched.date_nomination}
          onChange={formik.handleChange}
          placeholder="Date de jugement ou ordonnance de nomination"
        />
        {formik.touched.date_nomination && (
          <InlineError message={formik.errors.date_nomination} fieldId="date_nomination" />
        )}
      </Field>
      <Field>
        <Select
          id="nature_mesure"
          name="nature_mesure"
          placeholder="Nature de la mesure"
          value={formik.values.nature_mesure}
          hasError={formik.errors.nature_mesure && formik.touched.nature_mesure}
          onChange={(option) => formik.setFieldValue("nature_mesure", option)}
          options={MESURE_PROTECTION.NATURE_MESURE.options}
        />
        {formik.touched.nature_mesure && (
          <InlineError message={formik.errors.nature_mesure} fieldId="nature_mesure" />
        )}
      </Field>
      <Field>
        <Select
          id="champ_protection"
          name="champ_protection"
          placeholder="Nature de la mesure"
          value={formik.values.champ_protection}
          hasError={formik.errors.champ_protection && formik.touched.champ_protection}
          onChange={(option) => formik.setFieldValue("champ_protection", option)}
          isClearable={true}
          options={MESURE_PROTECTION.CHAMP_PROTECTION.options}
        />
        {formik.touched.champ_protection && (
          <InlineError message={formik.errors.champ_protection} fieldId="champ_protection" />
        )}
      </Field>
      <Field>
        <Select
          id="civilite"
          name="civilite"
          placeholder="Civilité"
          value={formik.values.civilite}
          hasError={formik.errors.civilite && formik.touched.civilite}
          onChange={(option) => formik.setFieldValue("civilite", option)}
          options={MESURE_PROTECTION.CIVILITE.options}
        />
        {formik.touched.civilite && (
          <InlineError message={formik.errors.civilite} fieldId="civilite" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.annee_naissance}
          id="annee_naissance"
          name="annee_naissance"
          type="number"
          hasError={formik.errors.annee_naissance && formik.touched.annee_naissance}
          onChange={formik.handleChange}
          placeholder="Année de naissance"
        />
        {formik.touched.annee_naissance && (
          <InlineError message={formik.errors.annee_naissance} fieldId="annee_naissance" />
        )}
      </Field>
      <Field>
        <Select
          id="lieu_vie"
          name="lieu_vie"
          placeholder="Lieu de vie du majeur"
          value={formik.values.lieu_vie}
          hasError={!!formik.errors.lieu_vie}
          onChange={(option) => formik.setFieldValue("lieu_vie", option)}
          options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
        />
        {formik.touched.lieu_vie && (
          <InlineError message={formik.errors.lieu_vie} fieldId="lieu_vie" />
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
