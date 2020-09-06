import { Button, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { Geocode } from "../Geocode";

export const EtablissementEditForm = (props) => {
  const { data, onSubmit, departements } = props;
  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      const { depcode, ...val } = values;

      const departement = departements.find((d) => d.code === depcode);
      if (departement) {
        val.departement_id = departement.id;
      }

      if (onSubmit) {
        await onSubmit(val);
      }
      setSubmitting(false);
    },
    initialValues: {
      adresse: data.adresse,
      fax: data.fax,
      tel: data.tel,
      latitude: data.latitude,
      longitude: data.longitude,
      code_postal: data.code_postal,
      depcode: data.departement.code,
      id_finess: data.id_finess,
      nom: data.nom,
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <Box mb={2}>
          <Input
            name="nom"
            type="text"
            value={formik.values.nom}
            placeholder="Nom"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Box>
        <Box mb={2}>
          <Geocode
            resource={data}
            onChange={(result) => {
              if (result) {
                const { city, depcode, label, latitude, longitude, postcode } = result;
                formik.setValues({
                  ...formik.values,
                  adresse: label,
                  latitude,
                  longitude,
                  ville: city,
                  code_postal: postcode,
                  depcode,
                });
              }
            }}
          />
        </Box>
      </Box>
      <Box mb={2}>
        <Input
          name="tel"
          type="text"
          value={formik.values.tel}
          placeholder="Téléphone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Box>
      <Box mb={2}>
        <Input
          name="fax"
          type="text"
          value={formik.values.tel}
          placeholder="Fax"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Box>
      <Box mb={2}>
        <Input
          name="id_finess"
          type="text"
          value={formik.values.id_finess}
          placeholder="Finess"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Box>
      <Flex mt={4} justifyContent="flex-end">
        <Box>
          <Button type="submit">Enregistrer</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default EtablissementEditForm;
