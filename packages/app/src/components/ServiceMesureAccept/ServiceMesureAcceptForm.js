import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Field,
  Heading3,
  Heading5,
  InlineError,
  Input,
  Select
} from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { RESIDENCE } from "../../constants/mesures";
import { serviceAcceptMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { formatAntenneOptions } from "../../util/services";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { UPDATE_ANTENNE_COUTERS, UPDATE_SERVICES_COUTERS } from "../ServiceMesures/mutations";
import { ACCEPT_MESURE } from "./mutations";

export const ServiceMesureAcceptForm = props => {
  const { mesureId, service_antennes, departementsData } = props;

  const [updateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const [updateServicesCounter] = useMutation(UPDATE_SERVICES_COUTERS);
  const [updateMesure] = useMutation(ACCEPT_MESURE, {
    update(
      cache,
      {
        data: {
          update_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;
      updateServicesCounter({
        variables: {
          mesures_awaiting: -1,
          mesures_in_progress: 1,
          service_id: mesure.service_id
        }
      });
      if (mesure.antenne_id) {
        updateAntenneCounters({
          variables: {
            antenne_id: mesure.antenne_id,
            inc_mesures_awaiting: -1,
            inc_mesures_in_progress: 1
          }
        });
      }
    },
    onCompleted() {
      Router.push(`/services/mesures/${mesureId}`);
    }
  });

  const ANTENNE_OPTIONS = formatAntenneOptions(service_antennes);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);
      if (!departement) {
        setErrors({
          geocode: `Aucun département trouvé pour le code postal ${values.geocode.postcode}`
        });
      } else {
        await updateMesure({
          refetchQueries: ["mesures", "mesures_aggregate"],
          variables: {
            antenne_id: values.antenne_id ? values.antenne_id.value : null,
            date_ouverture: values.date_ouverture,
            department_id: departement.id,
            id: mesureId,
            residence: values.residence.value,
            code_postal: values.geocode.postcode,
            ville: values.geocode.city,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude
          }
        });
      }

      setSubmitting(false);
    },
    validationSchema: serviceAcceptMesureSchema,
    initialValues: {
      antenne_id: "",
      date_ouverture: "",
      residence: "",
      geocode: geocodeInitialValue()
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
            <Geocode onChange={geocode => formik.setFieldValue("geocode", geocode)} />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
          </Field>
          {service_antennes.length >= 2 && (
            <Field>
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={option => formik.setFieldValue("antenne_id", option)}
                options={ANTENNE_OPTIONS}
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
                  Router.push(`/services/mesures/${mesureId}`);
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
