import { Button, Field, InlineError, Input, Textarea } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";

import { serviceSchema } from "../../lib/validationSchemas/serviceSchema";
import { Geocode, geocodeInitialValue } from "../Geocode";

const ServiceEditForm = (props) => {
  const { handleSubmit, service } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: serviceSchema,
    initialValues: {
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
      geocode: geocodeInitialValue(service),
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.nom}
          id="nom"
          name="nom"
          hasError={formik.errors.nom && formik.touched.nom}
          onChange={formik.handleChange}
          placeholder="Nom du responsable"
        />
        <InlineError message={formik.errors.nom} fieldId="nom" />
      </Field>
      <Field>
        <Input
          value={formik.values.prenom}
          id="prenom"
          name="prenom"
          hasError={formik.errors.prenom && formik.touched.prenom}
          onChange={formik.handleChange}
          placeholder="Prénom du responsable"
        />
        <InlineError message={formik.errors.prenom} fieldId="prenom" />
      </Field>
      <Field>
        <Input
          value={formik.values.dispo_max.toString()}
          id="dispo_max"
          name="dispo_max"
          hasError={formik.errors.dispo_max && formik.touched.dispo_max}
          onChange={formik.handleChange}
          placeholder="Mesures maximum"
        />
        <InlineError message={formik.errors.dispo_max} fieldId="dispo_max" />
      </Field>
      <Field>
        <Input
          value={formik.values.telephone}
          id="telephone"
          name="telephone"
          hasError={formik.errors.telephone && formik.touched.telephone}
          onChange={formik.handleChange}
          placeholder="Numéro de téléphone"
        />
        <InlineError message={formik.errors.telephone} fieldId="telephone" />
      </Field>
      <Field>
        <Input
          value={formik.values.email}
          id="email"
          name="email"
          hasError={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          placeholder="Adresse email"
        />
        <InlineError message={formik.errors.etablissement} fieldId="email" />
      </Field>
      <Field>
        <Geocode
          resource={service}
          onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
        />
        <InlineError message={formik.errors.geocode} fieldId="geocode" />
      </Field>
      <Field>
        <Textarea
          value={formik.values.competences}
          id="competences"
          name="competences"
          error={formik.errors.competences}
          onChange={formik.handleChange}
          label="Informations à destination du magistrat"
          placeholder="Préférences géographiques, compétences, langues parlées, ..."
        />
        <InlineError message={formik.errors.competences} fieldId="competences" />
      </Field>
      <Field>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Enregistrer
        </Button>
      </Field>
    </form>
  );
};

export { ServiceEditForm };
