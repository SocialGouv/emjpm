import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { COUNTRIES } from "../../constants/mesures";
import { serviceAcceptMesureSchema } from "../../lib/validationSchemas";
import { formatAntenneOptions } from "../../util/services";
import { GeocodeCities } from "../Geocode";

export const ServiceMesureAcceptForm = (props) => {
  const { mesure, service_antennes, onSubmit } = props;
  const antenneOptions = formatAntenneOptions(service_antennes);

  const formik = useFormik({
    onSubmit,
    validationSchema: serviceAcceptMesureSchema,
    initialValues: {
      antenne_id: "",
      date_nomination: "",
      lieu_vie: "",
      city: "",
      zipcode: "",
      country: { value: "FR", label: COUNTRIES["FR"] },
    },
  });
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Accepter la mesure</Heading5>
        <Text lineHeight="1.5">
          {`A reception de la notification de la decision du juge par courrier, le formulaire ci-contre vous permet de valider que cette mesure vous a ete attribuee.`}
        </Text>
        <Text lineHeight="1.5">
          {`Afin de rendre cette mesure active, vous devez imperativement remplir tous les champs de ce formulaire, puis cliquer sur "Valider la mesure".`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Accepter la mesure</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.date_nomination}
              id="date_nomination"
              type="date"
              name="date_nomination"
              hasError={formik.errors.date_nomination && formik.touched.date_nomination}
              onChange={formik.handleChange}
              placeholder="Date de jugement ou ordonnance de nomination"
            />
            <InlineError message={formik.errors.date_nomination} fieldId="date_nomination" />
          </Field>
          <Field>
            <Select
              id="lieu_vie"
              name="lieu_vie"
              placeholder="Lieu de vie du majeur"
              value={formik.values.lieu_vie}
              hasError={formik.errors.lieu_vie && formik.touched.lieu_vie}
              onChange={(option) => formik.setFieldValue("lieu_vie", option)}
              options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            />
            <InlineError message={formik.errors.lieu_vie} fieldId="lieu_vie" />
          </Field>

          <Field>
            <Select
              id="country"
              name="country"
              placeholder="Pays"
              value={formik.values.country}
              hasError={formik.errors.country && formik.touched.country}
              onChange={(option) => formik.setFieldValue("country", option)}
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
            />
            {formik.errors.country && formik.touched.country && (
              <Text>{formik.errors.country}</Text>
            )}
          </Field>

          {formik.values.country && formik.values.country.value === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <Field>
                  <Input
                    value={formik.values.zipcode}
                    id="zipcode"
                    name="zipcode"
                    onChange={async (e) => {
                      const { value } = e.target;
                      await formik.setFieldValue("zipcode", value);
                      await formik.setFieldValue("city", "");
                    }}
                    placeholder="Code postal"
                  />
                  <InlineError message={formik.errors.zipcode} fieldId="zipcode" />
                </Field>
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
                  />
                  <InlineError message={formik.errors.city} fieldId="city" />
                </Field>
              </Box>
            </Flex>
          )}

          {service_antennes.length >= 2 && (
            <Field>
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={(option) => formik.setFieldValue("antenne_id", option)}
                options={antenneOptions}
              />
              <InlineError message={formik.errors.antenne_id} fieldId="antenne_id" />
            </Field>
          )}
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/services/mesures/[mesure_id]", `/services/mesures/${mesure.id}`, {
                    shallow: true,
                  });
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Valider la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
