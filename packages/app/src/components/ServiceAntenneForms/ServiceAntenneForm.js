import { AsyncSelect, Button, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { serviceAntenneSchema } from "../../lib/validationSchemas";
import { debouncedGeocode } from "../../util/geocode";

const ServiceAntenneForm = props => {
  const { antenne, handleSubmit } = props;

  const {
    contact_email,
    contact_phone,
    contact_lastname,
    contact_firstname,
    mesures_max,
    name,
    address,
    address_city,
    address_zip_code,
    latitude,
    longitude
  } = antenne || {};

  const geocode = antenne
    ? {
        postcode: address_zip_code,
        city: address_city,
        label: address,
        lat: latitude,
        lng: longitude
      }
    : null;

  const geocodeDefaultValue = antenne ? { value: geocode, label: geocode.city } : null;

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
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.name}
          id="name"
          name="name"
          hasError={formik.errors.name && formik.touched.name}
          onChange={formik.handleChange}
          placeholder="Nom de l'antenne"
        />
        {formik.errors.name && formik.touched.name && <Text>{formik.errors.name}</Text>}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
        <Input
          value={formik.values.contact_lastname}
          id="contact_lastname"
          name="contact_lastname"
          hasError={formik.errors.contact_lastname && formik.touched.contact_lastname}
          onChange={formik.handleChange}
          placeholder="Nom du responsable"
        />
        {formik.errors.contact_lastname && formik.touched.contact_lastname && (
          <Text>{formik.errors.contact_lastname}</Text>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.contact_firstname}
          id="contact_firstname"
          name="contact_firstname"
          hasError={formik.errors.contact_firstname && formik.touched.contact_firstname}
          onChange={formik.handleChange}
          placeholder="Prénom du responsable"
        />
        {formik.errors.contact_firstname && formik.touched.contact_firstname && (
          <Text>{formik.errors.contact_firstname}</Text>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.mesures_max.toString()}
          id="mesures_max"
          name="mesures_max"
          hasError={formik.errors.mesures_max && formik.touched.mesures_max}
          onChange={formik.handleChange}
          placeholder="Mesures maximum"
        />
        {formik.errors.mesures_max && formik.touched.mesures_max && (
          <Text>{formik.errors.mesures_max}</Text>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
        <Input
          value={formik.values.contact_phone}
          id="contact_phone"
          name="contact_phone"
          hasError={formik.errors.contact_phone && formik.touched.contact_phone}
          onChange={formik.handleChange}
          placeholder="Numéro de téléphone"
        />
        {formik.errors.contact_phone && formik.touched.contact_phone && (
          <Text>{formik.errors.contact_phone}</Text>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.contact_email}
          id="contact_email"
          name="contact_email"
          hasError={formik.errors.contact_email && formik.touched.contact_email}
          onChange={formik.handleChange}
          placeholder="Adresse email"
        />
        {formik.errors.contact_email && formik.touched.contact_email && (
          <Text>{formik.errors.contact_email}</Text>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: "85" }} mb="2">
        <AsyncSelect
          name="geocode"
          cacheOptions
          defaultValue={geocodeDefaultValue}
          hasError={formik.errors.geocode && formik.touched.geocode}
          isClearable
          loadOptions={debouncedGeocode}
          placeholder="Adresse"
          noOptionsMessage={() => "Pas de résultats"}
          onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
        />
        {formik.errors.geocode && formik.touched.geocode && <Text>{formik.errors.geocode}</Text>}
      </Box>
      <Box>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Enregistrer
        </Button>
      </Box>
    </form>
  );
};

export { ServiceAntenneForm };
