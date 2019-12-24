import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { MesureContext } from "../MesureContext";
import { EDIT_MESURE } from "./mutations";
import { MagistratMesureEditStyle } from "./style";

export const MagistratMesureEdit = () => {
  const { id, age, civilite, numeroRg, type, cabinet } = useContext(MesureContext);
  const [UpdateMesure] = useMutation(EDIT_MESURE, {
    onCompleted() {
      Router.push(`/magistrats/mesures/${id}`);
    }
  });

  return (
    <Flex sx={MagistratMesureEditStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Modifier la mesure réservée</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de modifier une mesure réservée aupres d'un mandataire.`}
        </Text>
        <Text lineHeight="1.5">
          {`Une fois les modifications souhaitées apportées, cliquer sur "Enregistrer".`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Modifier la mesure réservée</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            UpdateMesure({
              variables: {
                annee: values.annee,
                cabinet: values.cabinet,
                civilite: values.civilite.value,
                id: id,
                numero_rg: values.numero_rg,
                type: values.type.value
              }
            });
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            annee: Yup.string().required(),
            cabinet: Yup.string(),
            civilite: Yup.string().required(),
            numero_rg: Yup.string().required(),
            type: Yup.string().required()
          })}
          initialValues={{
            annee: age,
            cabinet: cabinet ? cabinet : "",
            civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
            numero_rg: numeroRg,
            type: { label: type, value: type }
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
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
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
                <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
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
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.annee}
                    id="annee"
                    name="annee"
                    hasError={errors.annee && touched.annee}
                    onChange={handleChange}
                    placeholder="année"
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.numero_rg}
                    id="numero_rg"
                    name="numero_rg"
                    hasError={errors.numero_rg && touched.numero_rg}
                    onChange={handleChange}
                    placeholder="numero rg"
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.cabinet}
                    id="cabinet"
                    name="cabinet"
                    hasError={errors.cabinet && touched.cabinet}
                    onChange={handleChange}
                    placeholder="Cabinet (optionnel)"
                  />
                </Box>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        Router.push(`/magistrats/mesures/${id}`);
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

MagistratMesureEdit.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
