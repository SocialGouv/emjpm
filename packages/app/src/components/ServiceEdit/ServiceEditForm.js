import { Button, Field, Input, Text, Textarea } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";

import { serviceSchema } from "../../lib/validationSchemas/serviceSchema";
import { Geocode, geocodeInitialValue } from "../Geocode";

const ServiceEditForm = props => {
  const { handleSubmit, service } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: serviceSchema,
    initialValues: {
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      etablissement: service.etablissement || "",
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
      geocode: geocodeInitialValue(service)
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.etablissement}
          id="etablissement"
          name="etablissement"
          hasError={formik.errors.etablissement && formik.touched.etablissement}
          onChange={formik.handleChange}
          placeholder="Nom du service"
        />
      </Field>
      <Field>
        <Input
          value={formik.values.nom}
          id="nom"
          name="nom"
          hasError={formik.errors.nom && formik.touched.nom}
          onChange={formik.handleChange}
          placeholder="Nom du responsable"
        />
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
      </Field>
      <Field>
        <Geocode
          resource={service}
          onChange={geocode => formik.setFieldValue("geocode", geocode)}
        />
        {formik.errors.geocode && formik.touched.geocode && <Text>{formik.errors.geocode}</Text>}
      </Field>
      <Field>
        <Textarea
          value={formik.values.competences}
          id="competences"
          name="competences"
          error={formik.errors.competences}
          onChange={formik.handleChange}
          label="Informations pour le magistrat"
          placeholder="Préférences géographiques, compétences, ..."
        />
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
