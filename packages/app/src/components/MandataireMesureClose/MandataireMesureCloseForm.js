import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../lib/validationSchemas/yup";
import { CLOSE_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";
import { MANDATAIRE, MESURE } from "./queries";

const EXTINCTION_LABEL_VALUE = [
  { label: "caducité", value: "caducité" },
  { label: "changement de mandataires", value: "changement de mandataires" },
  { label: "changement de tribunal d'instance", value: "changement de tribunal d'instance" },
  { label: "décès", value: "décès" },
  { label: "main levée", value: "levée" },
  { label: "erreur de saisie", value: "saisie" },
  { label: "autre", value: "autr" }
];

export const MandataireMesureCloseForm = props => {
  const { mesure } = props;

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES, {
    refetchQueries: [
      {
        query: MESURE,
        variables: { id: mesure.id }
      },
      {
        query: MANDATAIRE,
        variables: { id: mesure.mandataireId }
      }
    ]
  });
  const [updateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({ variables: { mandataire_id: mesure.mandataireId } });
    }
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
        variables: {
          extinction: values.extinction,
          id: mesure.id,
          reason_extinction: values.reason_extinction.value
        }
      });
      Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${mesure.id}`, {
        shallow: true
      });
      setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      extinction: yup
        .string()
        .matches(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
          "Doit être du format dd/mm/yyyy"
        )
        .required(),
      reason_extinction: yup.string().required()
    }),
    initialValues: { extinction: "", reason_extinction: "" }
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
            <Label mb={1}>Date de fin de mandat</Label>
            <Input
              value={formik.values.extinction}
              id="extinction"
              name="extinction"
              type="date"
              onChange={formik.handleChange}
              placeholder=""
            />
            <InlineError message={formik.errors.extinction} fieldId="extinction" />
          </Field>
          <Field>
            <Label mb={1}>Raison de la fin de mandat</Label>
            <Select
              id="reason_extinction"
              name="reason_extinction"
              placeholder=""
              value={formik.values.type}
              hasError={formik.errors.reason_extinction && formik.touched.reason_extinction}
              onChange={option => formik.setFieldValue("reason_extinction", option)}
              options={EXTINCTION_LABEL_VALUE}
            />
            <InlineError message={formik.errors.reason_extinction} fieldId="reason_extinction" />
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
                      shallow: true
                    }
                  );
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
