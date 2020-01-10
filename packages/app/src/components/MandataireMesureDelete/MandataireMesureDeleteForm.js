import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, Input } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { DELETE_MESURE } from "./mutations";

export const MandataireMesureDeleteForm = props => {
  const { mesureId } = props;

  const [deleteMesure] = useMutation(DELETE_MESURE);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await deleteMesure({
        variables: {
          id: mesureId
        }
      });

      setSubmitting(false);
      Router.push(`/mandataires`);
    },
    validationSchema: Yup.object().shape({
      reason_delete: Yup.string().required("Required")
    }),
    initialValues: { reason_delete: "" }
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">Supprimer la mesure</Heading5>
        <Text mb="2" lineHeight="1.5">
          {`Vous êtes sur le point de supprimer définitivement une mesure de protection du système eMJPM. Toute suppression est irréversible, vous ne pourrez pas récupérer les données associées à cette mesure et celle-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'Etat.`}
        </Text>
        <Text mb="2" lineHeight="1.5">
          {`NB : les mesures éteintes ne sont plus comptabilisees dans vos "mesures en cours", elles n'apparaissent donc plus aupres des Magistrats.`}
        </Text>
        <Text lineHeight="1.5">{`Si vous souhaitez supprimer definitivement cette mesure, cliquez sur "Supprimer la mesure".`}</Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>Supprimer la mesure</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.reason_delete}
              hasError={formik.errors.reason_delete && formik.touched.reason_delete}
              id="reason_delete"
              name="reason_delete"
              onChange={formik.handleChange}
              placeholder="Raison de la suppression"
            />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(`/mandataires`);
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Supprimer la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

MandataireMesureDeleteForm.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
