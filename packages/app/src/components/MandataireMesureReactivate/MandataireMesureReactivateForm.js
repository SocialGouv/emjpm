import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, Input } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { REACTIVATE_MESURE, UPDATE_MANDATAIRES_COUTERS } from "./mutations";

export const MandataireMesureReactivateForm = props => {
  const { mesureId } = props;

  const [UpdateMandatairesCounter] = useMutation(UPDATE_MANDATAIRES_COUTERS);
  const [UpdateMesure] = useMutation(REACTIVATE_MESURE, {
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
          mesures_awaiting: 0,
          mesures_in_progress: 1
        }
      });
    }
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
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            UpdateMesure({
              refetchQueries: ["mesures", "mesures_aggregate"],
              variables: {
                id: mesureId,
                reason_extinction: values.reason_extinction
              }
            });
            setSubmitting(false);

            Router.push({ pathname: `/mandataires/mesures/${mesureId}` });
          }}
          validationSchema={Yup.object().shape({
            reason_extinction: Yup.string().required("Required")
          })}
          initialValues={{ reason_extinction: "" }}
        >
          {props => {
            const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb="2">
                  <Input
                    value={values.reason_extinction}
                    hasError={errors.reason_extinction && touched.reason_extinction}
                    id="reason_extinction"
                    name="reason_extinction"
                    onChange={handleChange}
                    placeholder="Raison de la réactivation"
                  />
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
                    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                      Réactiver la mesure
                    </Button>
                  </Box>
                </Flex>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Flex>
  );
};

MandataireMesureReactivateForm.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
