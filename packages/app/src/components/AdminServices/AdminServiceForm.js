import { Button, Field, Heading4, InlineError, Input, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { adminServiceSchema } from "../../lib/validationSchemas/adminServiceSchema";
import { Geocode, geocodeInitialValue } from "../Geocode";

export const AdminServiceForm = (props) => {
  const { handleCancel, handleSubmit, service } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: adminServiceSchema,
    initialValues: {
      email: service ? service.email : "",
      etablissement: service ? service.etablissement : "",
      telephone: service ? service.telephone : "",
      geocode: geocodeInitialValue(service),
      siret: service ? service.siret : "",
    },
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
                value={formik.values.siret}
                id="siret"
                name="siret"
                hasError={formik.errors.siret && formik.touched.siret}
                onChange={formik.handleChange}
                placeholder="SIRET"
              />
              {formik.touched.siret && (
                <InlineError message={formik.errors.siret} fieldId="siret" />
              )}
            </Field>
            <Field>
              <Input
                value={formik.values.etablissement}
                id="etablissement"
                name="etablissement"
                hasError={formik.errors.etablissement && formik.touched.etablissement}
                onChange={formik.handleChange}
                placeholder="Nom du service"
              />
              {formik.touched.etablissement && (
                <InlineError message={formik.errors.etablissement} fieldId="etablissement" />
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
              <InlineError message={formik.errors.email} fieldId="email" />
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
              <InlineError message={formik.errors.telephone} fieldId="telephone" />
            </Field>
            <Field>
              <Geocode
                resource={service}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              />
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
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
