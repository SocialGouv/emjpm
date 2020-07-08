import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading3, Heading5, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { UserContext } from "../../components/UserContext";
import { GET_SERVICE_USERS } from "../../components/UserContext/queries";
import { CLOSE_MESURE, RECALCULATE_SERVICE_MESURES } from "../ServiceMesures/mutations";
import { MESURE, SERVICE } from "./queries";

export const ServiceMesureCloseForm = (props) => {
  const { mesure } = props;
  const { id, serviceId } = mesure;
  const user = useContext(UserContext);

  const [recalculateServiceMesure] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: MESURE,
        variables: { id },
      },
      {
        query: SERVICE,
        variables: { id: serviceId },
      },
      {
        query: GET_SERVICE_USERS,
        variables: { userId: user.id },
      },
    ],
  });
  const [updateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesure({ variables: { service_id: serviceId } });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
        variables: {
          date_fin_mesure: values.date_fin_mesure,
          id,
          cause_sortie: values.cause_sortie.value,
        },
      });

      await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
        shallow: true,
      });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      date_fin_mesure: Yup.date().required("Required"),
      cause_sortie: Yup.string().required("Required"),
    }),
    initialValues: { date_fin_mesure: "", cause_sortie: "" },
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
              value={formik.values.date_fin_mesure}
              id="date_fin_mesure"
              name="date_fin_mesure"
              hasError={formik.errors.date_fin_mesure && formik.touched.date_fin_mesure}
              type="date"
              onChange={formik.handleChange}
              placeholder="Date de fin de la mesure de protection"
            />
          </Field>
          <Field>
            <Select
              instanceId={"cause_sortie"}
              id="cause_sortie"
              name="cause_sortie"
              placeholder="Raison de la fin de mandat"
              value={formik.values.type}
              hasError={formik.errors.type && formik.touched.type}
              onChange={(option) => formik.setFieldValue("cause_sortie", option)}
              options={MESURE_PROTECTION.CAUSE_SORTIE.options}
            />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
                    shallow: true,
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
  mesure: PropTypes.shape({
    id: PropTypes.number,
    serviceId: PropTypes.number,
  }),
};

export default ServiceMesureCloseForm;
