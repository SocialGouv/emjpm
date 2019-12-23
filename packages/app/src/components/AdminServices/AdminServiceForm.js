import { Button, Field, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { adminServiceSchema } from "../../lib/validationSchemas/adminServiceSchema";
import { Geocode, geocodeInitialValue } from "../Geocode";

export const AdminServiceForm = props => {
  const { handleCancel, handleSubmit, service } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: adminServiceSchema,
    initialValues: {
      email: service ? service.email : "",
      etablissement: service ? service.etablissement : "",
      telephone: service ? service.telephone : "",
      geocode: geocodeInitialValue(service)
    }
  });

  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
        <Box height="230px">
          <Heading4>{`Information du service`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Informations relatives au service`}
          </Text>
        </Box>
        <Box height="150px">
          <Heading4>{`Contact du service`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            Contact du service
          </Text>
        </Box>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="2">
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
              {formik.errors.etablissement && formik.touched.etablissement && (
                <Text>{formik.errors.etablissement}</Text>
              )}
            </Field>
            <Field>
              <Input
                value={formik.values.email}
                id="email"
                name="email"
                hasError={formik.errors.email && formik.touched.email}
                onChange={formik.handleChange}
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email && <Text>{formik.errors.email}</Text>}
            </Field>
            <Field>
              <Input
                value={formik.values.telephone}
                id="telephone"
                name="telephone"
                hasError={formik.errors.telephone && formik.touched.telephone}
                onChange={formik.handleChange}
                placeholder="Téléphone"
              />
              {formik.errors.telephone && formik.touched.telephone && (
                <Text>{formik.errors.telephone}</Text>
              )}
            </Field>
            <Field>
              <Geocode
                resource={service}
                onChange={geocode => formik.setFieldValue("geocode", geocode)}
              />
              {formik.errors.geocode && formik.touched.geocode && (
                <Text>{formik.errors.geocode}</Text>
              )}
            </Field>
            <Flex justifyContent="flex-end">
              {handleCancel && (
                <Box>
                  <Button mr="2" variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </Box>
              )}
              <Box>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  Enregistrer
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
