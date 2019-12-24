import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { RESIDENCE } from "../../constants/mesures";
import { mandataireAcceptMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { UPDATE_MANDATAIRES_COUTERS } from "../MandatairesMesures/mutations";
import { ACCEPT_MESURE } from "./mutations";

export const MandataireMesureAcceptForm = props => {
  const { mesureId, departementsData } = props;

  const [UpdateMandatairesCounter] = useMutation(UPDATE_MANDATAIRES_COUTERS);

  const [UpdateMesure] = useMutation(ACCEPT_MESURE, {
    onCompleted() {
      Router.push(`/mandataires/mesures/${mesureId}`);
    },
    update(
      cache,
      {
        data: {
          update_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;
      UpdateMandatairesCounter({
        variables: {
          mandataireId: mesure.mandataire_id,
          mesures_awaiting: -1,
          mesures_in_progress: 1
        }
      });
    }
  });

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
    validationSchema: mandataireAcceptMesureSchema,
    initialValues: {
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
            {formik.errors.date_ouverture && <Text>{formik.errors.date_ouverture}</Text>}
          </Box>
          <Box sx={{ position: "relative", zIndex: "90" }} mb="2">
            <Select
              id="residence"
              name="residence"
              placeholder="Type de residence"
              value={formik.values.residence}
              hasError={formik.errors.residence && formik.touched.residence}
              onChange={option => formik.setFieldValue("residence", option)}
              options={RESIDENCE}
            />
            {formik.errors.residence && <Text>{formik.errors.residence}</Text>}
          </Box>
          <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
            <Geocode onChange={geocode => formik.setFieldValue("geocode", geocode)} />
            {formik.errors.geocode && formik.touched.geocode && (
              <Text>{formik.errors.geocode}</Text>
            )}
          </Box>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(`/mandataires/mesures/${mesureId}`);
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
