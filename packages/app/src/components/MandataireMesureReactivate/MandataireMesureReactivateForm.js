import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { MANDATAIRE, REACTIVATE_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";

export const MandataireMesureReactivateForm = (props) => {
  const { mesure } = props;

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES, {
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mesure.mandataireId },
      },
    ],
  });
  const [updateMesure] = useMutation(REACTIVATE_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({ variables: { mandataire_id: mesure.mandataireId } });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
        variables: {
          id: mesure.id,
          reason_extinction: values.reason_extinction,
        },
      });
      await Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${mesure.id}`, {
        shallow: true,
      });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      reason_extinction: Yup.string().required("Required"),
    }),
    initialValues: { reason_extinction: "" },
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Réactiver la mesure</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de réactiver une mesure. Dans ce cas, elle reprend place dans les "mesures en cours" de votre mandataires, elle est des lors décomptée dans la "disponibilite actuelle" du mandataires, apparait sur la carte et prise en compte dans vos statistiques d'activité.`}
        </Text>
        <Text lineHeight="1.5">
          {`Si vous souhaitez enregistrer vos modifications, cliquez sur le bouton "Réactiver la mesure".`}
        </Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur le bouton "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Réactiver la mesure</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.reason_extinction}
              hasError={formik.errors.reason_extinction && formik.touched.reason_extinction}
              id="reason_extinction"
              name="reason_extinction"
              onChange={formik.handleChange}
              placeholder="Raison de la réactivation"
            />
          </Field>
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
                Réactiver la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

MandataireMesureReactivateForm.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};
