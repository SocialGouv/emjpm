import { AsyncSelect, Button, Field, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";

import { serviceSchema } from "../../lib/validationSchemas/serviceSchema";
import { debouncedGeocode } from "../../util/geocode";

const ServiceEditForm = props => {
  const { handleSubmit, service } = props;

  const geocode = {
    label: service.adresse,
    postcode: service.code_postal,
    city: service.ville,
    latitude: service.latitude,
    longitude: service.longitude
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: serviceSchema,
    initialValues: {
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      etablissement: service.etablissement || "",
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
      geocode
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
        <AsyncSelect
          name="geocode"
          cacheOptions
          defaultValue={{ value: geocode, label: geocode.label }}
          hasError={formik.errors.geocode && formik.touched.geocode}
          isClearable
          loadOptions={debouncedGeocode}
          placeholder="Adresse"
          noOptionsMessage={() => "Pas de résultats"}
          onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
        />
        {formik.errors.geocode && formik.touched.geocode && <Text>{formik.errors.geocode}</Text>}
        {formik.errors.code_postal && <Text>{formik.errors.codePostal}</Text>}
      </Field>
      <Field>
        <Input
          value={formik.values.information}
          id="information"
          name="information"
          hasError={formik.errors.information && formik.touched.information}
          onChange={formik.handleChange}
          placeholder="Informations"
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
