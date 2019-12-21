import { useMutation } from "@apollo/react-hooks";
import { AsyncSelect, Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { RESIDENCE } from "../../constants/mesures";
import { serviceAcceptMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { debouncedGeocode } from "../../util/geocode";
import { formatAntenneOptions } from "../../util/services";
import { ACCEPT_MESURE, UPDATE_ANTENNE_COUTERS, UPDATE_SERVICES_COUTERS } from "./mutations";
export const ServiceMesureAcceptForm = props => {
  const { mesureId, user_antennes, departementsData } = props;

  const [UpdateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const [UpdateServicesCounter] = useMutation(UPDATE_SERVICES_COUTERS);

  const [UpdateMesure] = useMutation(ACCEPT_MESURE, {
    update(
      cache,
      {
        data: {
          update_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;
      UpdateServicesCounter({
        variables: {
          mesures_awaiting: -1,
          mesures_in_progress: 1,
          service_id: mesure.service_id
        }
      });
      if (mesure.antenne_id) {
        UpdateAntenneCounters({
          variables: {
            antenne_id: mesure.antenne_id,
            inc_mesures_awaiting: -1,
            inc_mesures_in_progress: 1
          }
        });
      }
    }
  });

  const ANTENNE_OPTIONS = formatAntenneOptions(user_antennes);

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);
      if (!departement) {
        setErrors({
          geocode: `Aucun département trouvé pour le code postal ${values.geocode.postcode}`
        });
      } else {
        UpdateMesure({
          refetchQueries: ["mesures", "mesures_aggregate"],
          variables: {
            antenne_id: values.antenne_id ? values.antenne_id.value : null,
            date_ouverture: values.date_ouverture,
            department_id: departement.id,
            id: mesureId,
            residence: values.residence.value,
            ville: values.geocode.city,
            latitude: values.geocode.lat,
            longitude: values.geocode.lng,
            code_postal: values.geocode.postcode
          }
        });

        Router.push(`/services/mesures/${mesureId}`);
      }
      setSubmitting(false);
    },
    validationSchema: serviceAcceptMesureSchema,
    initialValues: {
      antenne_id: "",
      date_ouverture: "",
      residence: ""
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
          <Box mb="2">
            <Input
              value={formik.values.date_ouverture}
              id="date_ouverture"
              type="date"
              name="date_ouverture"
              hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
              onChange={formik.handleChange}
              placeholder="Date d'ouverture"
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
            <Select
              id="residence"
              name="residence"
              placeholder="Type de residence"
              value={formik.values.residence}
              hasError={formik.errors.residence && formik.touched.residence}
              onChange={option => formik.setFieldValue("residence", option)}
              options={RESIDENCE}
            />
            {formik.errors.residence && formik.touched.residence && (
              <Text>{formik.errors.residence}</Text>
            )}
          </Box>
          <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
            <AsyncSelect
              name="geocode"
              cacheOptions
              hasError={formik.errors.geocode}
              isClearable
              loadOptions={debouncedGeocode}
              placeholder="Ville, code postal, ..."
              noOptionsMessage={() => "Pas de résultats"}
              onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
            />
            {formik.errors.geocode && <Text>{formik.errors.geocode}</Text>}
          </Box>
          {user_antennes.length >= 2 && (
            <Box sx={{ position: "relative", zIndex: "70" }} mb="2">
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={option => formik.setFieldValue("antenne_id", option)}
                options={ANTENNE_OPTIONS}
              />
            </Box>
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
