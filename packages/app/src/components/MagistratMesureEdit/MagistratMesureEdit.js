import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { magistratMesureEditSchema } from "../../lib/validationSchemas";
import { MesureContext } from "../MesureContext";
import { EDIT_MESURE } from "./mutations";
import { MagistratMesureEditStyle } from "./style";

export const MagistratMesureEdit = () => {
  const { id, age, civilite, numeroRg, type, cabinet } = useContext(MesureContext);
  const [updateMesure] = useMutation(EDIT_MESURE, {
    onCompleted() {
      Router.push(`/magistrats/mesures/${id}`);
    }
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
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
    },
    validationSchema: magistratMesureEditSchema,
    initialValues: {
      annee: age,
      cabinet: cabinet ? cabinet : "",
      civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
      numero_rg: numeroRg,
      type: { label: type, value: type }
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
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Select
              id="type"
              name="type"
              placeholder="Type de mesure"
              value={formik.values.type}
              hasError={formik.errors.type && formik.touched.type}
              onChange={option => formik.setFieldValue("type", option)}
              options={MESURE_TYPE_LABEL_VALUE}
            />
          </Field>
          <Field>
            <Select
              id="civilite"
              name="civilite"
              placeholder="civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={option => formik.setFieldValue("civilite", option)}
              options={CIVILITY}
            />
          </Field>
          <Field>
            <Input
              value={formik.values.annee}
              id="annee"
              name="annee"
              hasError={formik.errors.annee && formik.touched.annee}
              onChange={formik.handleChange}
              placeholder="année de naissance"
            />
          </Field>
          <Field>
            <Input
              value={formik.values.numero_rg}
              id="numero_rg"
              name="numero_rg"
              hasError={formik.errors.numero_rg && formik.touched.numero_rg}
              onChange={formik.handleChange}
              placeholder="numero rg"
            />
          </Field>
          <Field>
            <Input
              value={formik.values.cabinet}
              id="cabinet"
              name="cabinet"
              hasError={formik.errors.cabinet && formik.touched.cabinet}
              onChange={formik.handleChange}
              placeholder="Cabinet (optionnel)"
            />
          </Field>
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
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Enregistrer
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

MagistratMesureEdit.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
