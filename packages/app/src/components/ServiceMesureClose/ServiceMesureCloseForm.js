import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { CLOSE_MESURE, RECALCULATE_SERVICE_MESURES } from "../ServiceMesures/mutations";
import { MESURE, SERVICE } from "./queries";

const EXTINCTION_LABEL_VALUE = [
  { label: "caducité", value: "caducité" },
  { label: "changement de mandataires", value: "changement de mandataires" },
  { label: "changement de tribunal d'instance", value: "changement de tribunal d'instance" },
  { label: "décès", value: "décès" },
  { label: "main levée", value: "levée" },
  { label: "erreur de saisie", value: "saisie" },
  { label: "autre", value: "autre" }
];

export const ServiceMesureCloseForm = props => {
  const { mesure } = props;
  const { id, serviceId } = mesure;

  const [recalculateServiceMesure] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: MESURE,
        variables: { id }
      },
      {
        query: SERVICE,
        variables: { serviceId }
      }
    ]
  });
  const [updateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesure({ variables: { service_id: serviceId } });
    }
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
        variables: {
          extinction: values.extinction,
          id,
          reason_extinction: values.reason_extinction.value
        }
      });

      await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
        shallow: true
      });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      extinction: Yup.date().required("Required"),
      reason_extinction: Yup.string().required("Required")
    }),
    initialValues: { extinction: "", reason_extinction: "" }
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Mettre fin au mandat</Heading5>
        <Text lineHeight="1.5">{`Le formulaire ci-contre vous permet de mettre fin au madat de protection selectionne. Vous devez indiquer la date et la raison de l'extinction de la mesure.`}</Text>
        <Text lineHeight="1.5">{`Les mesures pour lesquelles vous mettez fin au mandat ne sont plus comptabilisees dans vos "mesures en cours".`}</Text>
        <Text lineHeight="1.5">{`Pour enregistrer vos modifications, cliquez sur "Confirmer la fin du mandat".`}</Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Mettre fin au mandat</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.extinction}
              id="extinction"
              name="extinction"
              hasError={formik.errors.extinction && formik.touched.extinction}
              type="date"
              onChange={formik.handleChange}
              placeholder="Date de fin de mandat"
            />
          </Field>
          <Field>
            <Select
              id="reason_extinction"
              name="reason_extinction"
              placeholder="Raison de la fin de mandat"
              value={formik.values.type}
              hasError={formik.errors.type && formik.touched.type}
              onChange={option => formik.setFieldValue("reason_extinction", option)}
              options={EXTINCTION_LABEL_VALUE}
            />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
                    shallow: true
                  });
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Confirmer la fin du mandat
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

ServiceMesureCloseForm.propTypes = {
  mesure: PropTypes.object({
    id: PropTypes.number,
    serviceId: PropTypes.number
  })
};

export default ServiceMesureCloseForm;
