import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { COUNTRIES, RESIDENCE } from "../../constants/mesures";
import { mandataireAcceptMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { UPDATE_MANDATAIRES_COUTERS } from "../MandataireMesures/mutations";
import { ACCEPT_MESURE } from "./mutations";

export const MandataireMesureAcceptForm = props => {
  const { mesure, departementsData } = props;
  const geocode = geocodeInitialValue();
  const [updateMandatairesCounter] = useMutation(UPDATE_MANDATAIRES_COUTERS);
  const [updateMesure] = useMutation(ACCEPT_MESURE);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const variables = {};

      if (values.country.value === "FR") {
        const regionCode = getRegionCode(values.geocode.postcode);
        const departements = departementsData.departements;
        const departement = departements.find(dep => dep.code === regionCode);

        if (!departement) {
          setErrors({
            geocode: `Aucun département trouvé pour le code postal ${values.geocode.postcode}`
          });
          return setSubmitting(false);
        } else {
          variables.department_id = departement.id;
          variables.code_postal = values.geocode.postcode;
          variables.ville = values.geocode.city;
          variables.latitude = values.geocode.latitude;
          variables.longitude = values.geocode.longitude;
        }
      }

      await updateMesure({
        refetchQueries: ["mesures", "mesures_aggregate"],
        variables: {
          ...variables,
          date_ouverture: values.date_ouverture,
          id: mesure.id,
          residence: values.residence.value,
          pays: values.country.value
        }
      });

      await updateMandatairesCounter({
        variables: {
          mandataireId: mesure.mandataireId,
          mesures_awaiting: -1,
          mesures_in_progress: 1
        }
      });

      setSubmitting(false);
      Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${mesure.id}`, {
        shallow: true
      });
    },
    validationSchema: mandataireAcceptMesureSchema,
    initialValues: {
      date_ouverture: "",
      residence: "",
      geocode,
      address: geocode.label,
      country: { value: "FR", label: COUNTRIES["FR"] }
    }
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
              onChange={option => formik.setFieldValue("residence", option)}
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
              onChange={option => formik.setFieldValue("country", option)}
              options={[
                {
                  label: "France",
                  value: "FR"
                },
                {
                  label: "Belgique",
                  value: "BE"
                }
              ]}
            />
            {formik.errors.country && formik.touched.country && (
              <Text>{formik.errors.country}</Text>
            )}
          </Field>
          {formik.values.country && formik.values.country.value === "FR" && (
            <Field>
              <Geocode
                onChange={async geocode => {
                  await formik.setFieldValue("geocode", geocode);
                  await formik.setFieldValue("address", geocode ? geocode.label : "");
                }}
              />
              <InlineError message={formik.errors.address} fieldId="geocode" />
            </Field>
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
                      shallow: true
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
  currentMesure: PropTypes.number.isRequired
};
