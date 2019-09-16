import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { EDIT_MESURE } from "./mutations";
import { Select, Button, Input, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import {
  MESURE_TYPE_LABEL_VALUE,
  RESIDENCE,
  CIVILITY,
  MESURE_STATUS_LABEL_VALUE
} from "../../constants/mesures";

export const ServiceEditMesure = props => {
  const { currentMesure } = props;
  const [UpdateMesure] = useMutation(EDIT_MESURE);
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">éditer la mesure</Heading5>
        <Text lineHeight="1.5">
          {`On parle de fermeture d'une mesure, d'extinction d'une mesure ou de "fin de mandat pour dire que la mesure de protection a pris fin. Suite à ça, on parle de "mesure éteinte". Pour les raisons de traçabilité
          évoquée ci-dessus, une mesure éteinte n'est pas supprimée.`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>éditer la mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              UpdateMesure({
                variables: {
                  id: currentMesure,
                  date_ouverture: values.date_ouverture,
                  type: values.type.value,
                  residence: values.residence.value,
                  code_postal: values.code_postal,
                  ville: values.ville,
                  civilite: values.civilite.value,
                  annee: values.annee,
                  numero_dossier: values.numero_dossier,
                  numero_rg: values.numero_rg,
                  status: values.status.value
                  // antenne_id: values.antenneId
                }
              });
              setSubmitting(false);
              setPanelType(PANEL_TYPE.CLOSE);
              setCurrentMesure(null);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            date_ouverture: Yup.date().required("Required"),
            type: Yup.string().required("Required"),
            residence: Yup.string().required("Required"),
            code_postal: Yup.string().required("Required"),
            ville: Yup.string().required("Required"),
            civilite: Yup.string().required("Required"),
            annee: Yup.string().required("Required"),
            numero_dossier: Yup.string().required("Required"),
            numero_rg: Yup.string().required("Required"),
            status: Yup.string().required("Required")
          })}
          initialValues={{
            date_ouverture: "",
            type: "",
            residence: "",
            code_postal: "",
            ville: "",
            civilite: "",
            annee: "",
            numero_dossier: "",
            numero_rg: "",
            status: "",
            antenne_id: ""
          }}
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
            console.log(errors);
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
                    placeholder="Date d'extinction"
                  />
                </Box>
                <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
                  <Select
                    id="type"
                    name="type"
                    placeholder="Type de mesure"
                    value={values.type}
                    hasError={errors.type && touched.type}
                    onChange={option => setFieldValue("type", option)}
                    options={MESURE_TYPE_LABEL_VALUE}
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
                <Box sx={{ zIndex: "80", position: "relative" }} mb="2">
                  <Select
                    id="civilite"
                    name="civilite"
                    placeholder="civilité"
                    value={values.civilite}
                    hasError={errors.civilite && touched.civilite}
                    onChange={option => setFieldValue("civilite", option)}
                    options={CIVILITY}
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.annee}
                    id="annee"
                    name="annee"
                    hasError={errors.annee && touched.annee}
                    onChange={handleChange}
                    placeholder="année"
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.numero_dossier}
                    id="numero_dossier"
                    name="numero_dossier"
                    hasError={errors.numero_dossier && touched.numero_dossier}
                    onChange={handleChange}
                    placeholder="numero de dossier"
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.numero_rg}
                    id="numero_rg"
                    name="numero_rg"
                    hasError={errors.numero_rg && touched.numero_rg}
                    onChange={handleChange}
                    placeholder="numero rg"
                  />
                </Box>
                <Box sx={{ zIndex: "70", position: "relative" }} mb="2">
                  <Select
                    id="status"
                    name="status"
                    placeholder="status de la mesure"
                    value={values.status}
                    hasError={errors.status && touched.status}
                    onChange={option => setFieldValue("status", option)}
                    options={MESURE_STATUS_LABEL_VALUE}
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
                      Enregistrer
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

ServiceEditMesure.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
