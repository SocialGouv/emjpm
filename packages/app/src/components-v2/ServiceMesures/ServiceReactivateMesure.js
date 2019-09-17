import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { REACTIVATE_MESURE } from "./mutations";
import { Button, Input, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";

export const ServiceReactivateMesure = props => {
  const { currentMesure } = props;
  const [UpdateMesure] = useMutation(REACTIVATE_MESURE);
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Réactiver la mesure</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous peremet de reactiver une mesure. Dans ce cas, elle reprend place dans les "mesures en cours" de votre service, elle est des lors decomptee dans la "disponibilite actuelle" du service, apparait sur la carte et prise en compte dans vos statistiques d'activite.`}
        </Text>
        <Text lineHeight="1.5">
          {`Si vous souhaitez enregistrer vos modifications, cliquez sur le bouton "Reactiver la mesure".`}
        </Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur le bouton "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Réactiver la mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              UpdateMesure({
                variables: {
                  id: currentMesure,
                  reason_extinction: values.reason_extinction
                }
              });
              setSubmitting(false);
              setPanelType(null);
              setCurrentMesure(null);
            }, 500);
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
                        setPanelType(PANEL_TYPE.CLOSE);
                        setCurrentMesure(null);
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

ServiceReactivateMesure.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
