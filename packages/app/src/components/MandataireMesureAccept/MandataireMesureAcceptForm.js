import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { COUNTRIES, RESIDENCE } from "../../constants/mesures";
import { mandataireAcceptMesureSchema } from "../../lib/validationSchemas";
import { GeocodeCities } from "../Geocode";

export const MandataireMesureAcceptForm = (props) => {
  const { mesure, onSubmit } = props;

  const formik = useFormik({
    onSubmit,
    validationSchema: mandataireAcceptMesureSchema,
    initialValues: {
      date_ouverture: "",
      residence: "",
      city: mesure.ville,
      zipcode: mesure.code_postal,
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
              value={formik.values.date_ouverture}
              id="date_ouverture"
              type="date"
              name="date_ouverture"
              hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
              onChange={formik.handleChange}
              placeholder="Date d'ordonnance"
            />
            <InlineError message={formik.errors.date_ouverture} fieldId="date_ouverture" />
          </Field>
          <Field>
            <Select
              id="residence"
              name="residence"
              placeholder="Type de residence"
              value={formik.values.residence}
              hasError={formik.errors.residence && formik.touched.residence}
              onChange={(option) => formik.setFieldValue("residence", option)}
              options={RESIDENCE}
            />
            <InlineError message={formik.errors.residence} fieldId="residence" />
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
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(
                    "/mandataires/mesures/[mesure_id]",
                    `/mandataires/mesures/${mesure.id}`,
                    {
                      shallow: true,
                    }
                  );
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

MandataireMesureAcceptForm.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};

export default MandataireMesureAcceptForm;
