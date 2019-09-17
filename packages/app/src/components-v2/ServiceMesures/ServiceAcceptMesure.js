import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { ACCEPT_MESURE } from "./mutations";
import { Select, Button, Input, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { RESIDENCE } from "../../constants/mesures";

export const ServiceAcceptMesure = props => {
  const { currentMesure } = props;
  const [UpdateMesure] = useMutation(ACCEPT_MESURE);
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Accepter la mesure</Heading5>
        <Text lineHeight="1.5">
          {`Dans l'outil, il faut une étape de validation pour activer la mesure, étape correspondant à la réception de la notification courrier par les mandataires.
Pour vérifier que le mandataire a bien reçu le courrier, l'outil eMJPM demande des informations complémentaires à l'utilisateur, informations contenues uniquement dans le courrier de notification.`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Accepter la mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              UpdateMesure({
                variables: {
                  id: currentMesure,
                  date_ouverture: values.date_ouverture,
                  residence: values.residence.value,
                  code_postal: values.code_postal,
                  ville: values.ville
                }
              });
              setSubmitting(false);
              setPanelType(null);
              setCurrentMesure(null);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            date_ouverture: Yup.date(),
            residence: Yup.string(),
            code_postal: Yup.string(),
            ville: Yup.string()
          })}
          initialValues={{ date_ouverture: "", residence: "", code_postal: "", ville: "" }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb="2">
                  <Input
                    value={values.date_ouverture}
                    id="date_ouverture"
                    type="date"
                    name="date_ouverture"
                    hasError={errors.date_ouverture && touched.date_ouverture}
                    onChange={handleChange}
                    placeholder="Date d'ouverture"
                  />
                </Box>
                <Box sx={{ zIndex: "90", position: "relative" }} mb="2">
                  <Select
                    id="residence"
                    name="residence"
                    placeholder="Type de residence"
                    value={values.residence}
                    hasError={errors.residence && touched.residence}
                    onChange={option => setFieldValue("residence", option)}
                    options={RESIDENCE}
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.code_postal}
                    id="code_postal"
                    name="code_postal"
                    hasError={errors.code_postal && touched.code_postal}
                    onChange={handleChange}
                    placeholder="Code postal"
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.ville}
                    id="ville"
                    name="ville"
                    hasError={errors.ville && touched.ville}
                    onChange={handleChange}
                    placeholder="ville"
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

ServiceAcceptMesure.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
