import { Button, Field, InlineError, Input, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex } from "rebass";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { Geocode, geocodeInitialValue } from "../Geocode";
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
  geocode: geocodeInitialValue()
};

export const ServiceMesureCreateForm = props => {
  const { tribunalList, antenneOptions, handleSubmit } = props;
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: serviceMesureSchema
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
          onChange={option => formik.setFieldValue("tribunal", option)}
          defaultOptions={tribunalList}
        />
        {formik.touched.tribunal && (
          <InlineError message={formik.errors.tribunal} fieldId="tribunal" />
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.numero_dossier}
          id="numero_dossier"
          name="numero_dossier"
          hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
          onChange={formik.handleChange}
          placeholder="Numero de dossier"
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
          onChange={option => formik.setFieldValue("antenne", option)}
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
          onChange={option => formik.setFieldValue("type", option)}
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
          onChange={option => formik.setFieldValue("civilite", option)}
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
          placeholder="année de naissance"
        />
        {formik.touched.annee && <InlineError message={formik.errors.annee} fieldId="type" />}
      </Field>
      <Field>
        <Select
          id="residence"
          name="residence"
          placeholder="Type de residence"
          value={formik.values.residence}
          hasError={formik.errors.residence && formik.touched.residence}
          onChange={option => formik.setFieldValue("residence", option)}
          options={RESIDENCE}
        />
        {formik.touched.residence && (
          <InlineError message={formik.errors.residence} fieldId="residence" />
        )}
      </Field>
      <Field>
        <Geocode onChange={geocode => formik.setFieldValue("geocode", geocode)} />
        {formik.errors.geocode && formik.touched.geocode && (
          <InlineError message={formik.errors.geocode} fieldId="geocode" />
        )}
      </Field>
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
