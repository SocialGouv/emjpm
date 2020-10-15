import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, InlineError } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex } from "rebass";

import { mesureSchema } from "../../lib/validationSchemas";
import { FormGroupInput, FormGroupSelect } from "../AppForm";
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
  country: "FR",
  cabinet: "",
};

export const MesureCreateForm = (props) => {
  const { tribunaux, antenneOptions, handleSubmit } = props;
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: mesureSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroupInput
        placeholder="Numéro RG"
        id="numero_rg"
        formik={formik}
        validationSchema={mesureSchema}
      />

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

      <FormGroupInput
        placeholder="Cabinet"
        id="cabinet"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupInput
        placeholder="Numéro de dossier"
        id="numero_dossier"
        formik={formik}
        validationSchema={mesureSchema}
      />

      {antenneOptions.length > 0 && (
        <FormGroupSelect
          id="antenne"
          options={antenneOptions}
          placeholder="Antenne"
          value={formik.values.antenne}
          formik={formik}
          validationSchema={mesureSchema}
        />
      )}

      <FormGroupInput
        placeholder="Date de jugement ou ordonnance de nomination"
        type="date"
        id="date_nomination"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="nature_mesure"
        options={MESURE_PROTECTION.NATURE_MESURE.options}
        placeholder="Nature de la mesure"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="champ_mesure"
        options={MESURE_PROTECTION.CHAMP_MESURE.options}
        placeholder="Champs de la mesure"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="civilite"
        options={MESURE_PROTECTION.CIVILITE.options}
        placeholder="Civilité"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupInput
        placeholder="Année de naissance"
        id="annee_naissance"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="lieu_vie"
        options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
        placeholder="Lieu de vie du majeur"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="country"
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
        validationSchema={mesureSchema}
      />

      {formik.values.country === "FR" && (
        <Flex justifyContent="space-between">
          <Box mr={1} flex={1 / 2}>
            <FormGroupInput
              placeholder="Code postal"
              id="zipcode"
              formik={formik}
              validationSchema={mesureSchema}
              onChange={async (e) => {
                const { value } = e.target;
                await formik.setFieldValue("zipcode", value);
                await formik.setFieldValue("city", "");
              }}
            />
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
