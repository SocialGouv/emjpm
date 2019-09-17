import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { CLOSE_MESURE } from "./mutations";
import { Button, Input, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";

export const ServiceCloseMesure = props => {
  const { currentMesure } = props;
  const [UpdateMesure] = useMutation(CLOSE_MESURE);
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Mettre fin au mandat</Heading5>
        <Text lineHeight="1.5">
          {`On parle de fermeture d'une mesure, d'extinction d'une mesure ou de "fin de mandat pour dire que la mesure de protection a pris fin. Suite à ça, on parle de "mesure éteinte". Pour les raisons de traçabilité
          évoquée ci-dessus, une mesure éteinte n'est pas supprimée.`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Mettre fin au mandat</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              UpdateMesure({
                variables: {
                  id: currentMesure,
                  reason_extinction: values.reason_extinction,
                  extinction: values.extinction
                }
              });
              setSubmitting(false);
              setPanelType(null);
              setCurrentMesure(null);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            extinction: Yup.date().required("Required"),
            reason_extinction: Yup.string().required("Required")
          })}
          initialValues={{ reason_extinction: "", extinction: "" }}
        >
          {props => {
            const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb="2">
                  <Input
                    value={values.extinction}
                    id="extinction"
                    name="extinction"
                    hasError={errors.extinction && touched.extinction}
                    type="date"
                    onChange={handleChange}
                    placeholder="Date d'extinction"
                  />
                </Box>
                <Box mb="2">
                  <Input
                    value={values.reason_extinction}
                    hasError={errors.reason_extinction && touched.reason_extinction}
                    id="reason_extinction"
                    name="reason_extinction"
                    onChange={handleChange}
                    placeholder="Raison de l'extinction"
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
                      Confirmer la fin du mandat
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

ServiceCloseMesure.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
