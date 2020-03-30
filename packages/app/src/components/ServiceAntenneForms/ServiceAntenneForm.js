import { Button, Field, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { serviceAntenneSchema } from "../../lib/validationSchemas";
import { Geocode, geocodeInitialValue } from "../Geocode";

const ServiceAntenneForm = props => {
  const { antenne = {}, handleSubmit } = props;
  const {
    contact_email,
    contact_phone,
    contact_lastname,
    contact_firstname,
    mesures_max,
    name
  } = antenne;
  const geocode = geocodeInitialValue(antenne);

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: serviceAntenneSchema,
    initialValues: {
      contact_email: contact_email || "",
      contact_firstname: contact_firstname || "",
      contact_lastname: contact_lastname || "",
      contact_phone: contact_phone || "",
      mesures_max: mesures_max || "",
      name: name || "",
      geocode
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.name}
          id="name"
          name="name"
          hasError={formik.errors.name && formik.touched.name}
          onChange={formik.handleChange}
          placeholder="Nom de l'antenne"
        />
        <InlineError message={formik.errors.name} fieldId="name" />
      </Field>
      <Field>
        <Input
          value={formik.values.contact_lastname}
          id="contact_lastname"
          name="contact_lastname"
          hasError={formik.errors.contact_lastname && formik.touched.contact_lastname}
          onChange={formik.handleChange}
          placeholder="Nom du responsable"
        />
        <InlineError message={formik.errors.contact_lastname} fieldId="contact_lastname" />
      </Field>
      <Field>
        <Input
          value={formik.values.contact_firstname}
          id="contact_firstname"
          name="contact_firstname"
          hasError={formik.errors.contact_firstname && formik.touched.contact_firstname}
          onChange={formik.handleChange}
          placeholder="Prénom du responsable"
        />
        <InlineError message={formik.errors.contact_firstname} fieldId="contact_firstname" />
      </Field>
      <Field>
        <Input
          value={formik.values.mesures_max.toString()}
          id="mesures_max"
          name="mesures_max"
          hasError={formik.errors.mesures_max && formik.touched.mesures_max}
          onChange={formik.handleChange}
          placeholder="Mesures maximum"
        />
        <InlineError message={formik.errors.mesures_max} fieldId="mesures_max" />
      </Field>
      <Field>
        <Input
          value={formik.values.contact_phone}
          id="contact_phone"
          name="contact_phone"
          hasError={formik.errors.contact_phone && formik.touched.contact_phone}
          onChange={formik.handleChange}
          placeholder="Numéro de téléphone"
        />
        <InlineError message={formik.errors.contact_phone} fieldId="contact_phone" />
      </Field>
      <Field>
        <Input
          value={formik.values.contact_email}
          id="contact_email"
          name="contact_email"
          hasError={formik.errors.contact_email && formik.touched.contact_email}
          onChange={formik.handleChange}
          placeholder="Adresse email"
        />
        <InlineError message={formik.errors.contact_email} fieldId="contact_email" />
      </Field>
      <Field>
        <Geocode
          onChange={geocode => formik.setFieldValue("geocode", geocode)}
          resource={antenne}
        />
        <InlineError message={formik.errors.geocode} fieldId="geocode" />
      </Field>
      <Box>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Enregistrer
        </Button>
      </Box>
    </form>
  );
};

export { ServiceAntenneForm };
