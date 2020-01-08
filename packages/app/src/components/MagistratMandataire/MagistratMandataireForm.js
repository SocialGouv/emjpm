import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { CIVILITY, IS_URGENT, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { magistratMandataireSchema } from "../../lib/validationSchemas";
import { UserContext } from "../UserContext";
import { CHOOSE_MANDATAIRE, CHOOSE_SERVICE } from "./mutations";

export const MagistratMandataireForm = props => {
  const { serviceId, mandataireId } = props;
  const {
    cabinet,
    magistrat: { ti_id: tiId }
  } = useContext(UserContext);

  const [chooseMandataire] = useMutation(CHOOSE_MANDATAIRE, {
    onCompleted({ insert_mesures }) {
      const [mesure] = insert_mesures.returning;
      Router.push(`/magistrats/mesures/${mesure.id}`);
    }
  });

  const [chooseService] = useMutation(CHOOSE_SERVICE, {
    onCompleted({ insert_mesures }) {
      const [mesure] = insert_mesures.returning;
      Router.push(`/magistrats/mesures/${mesure.id}`);
    }
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      if (mandataireId) {
        await chooseMandataire({
          refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"],
          variables: {
            annee: values.annee,
            cabinet: values.cabinet,
            civilite: values.civilite.value,
            judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
            mandataire_id: mandataireId,
            numero_rg: values.numero_rg,
            ti: tiId,
            type: values.type.value,
            urgent: values.urgent.value
          }
        });
      } else {
        await chooseService({
          refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"],
          variables: {
            annee: values.annee,
            cabinet: values.cabinet,
            civilite: values.civilite.value,
            judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
            numero_rg: values.numero_rg,
            service_id: serviceId,
            ti: tiId,
            type: values.type.value,
            urgent: values.urgent.value
          }
        });
      }

      setSubmitting(false);
    },
    validationSchema: magistratMandataireSchema,
    initialValues: {
      annee: "",
      cabinet,
      civilite: "",
      judgmentDate: "",
      numero_rg: "",
      type: "",
      urgent: IS_URGENT.find(lv => lv.value == false)
    }
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" sx={{ flexGrow: 1, flexBasis: 380 }}>
        <Heading5 mb="1">Réserver une mesures</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de réserver une mesure aupres d'un mandataire.`}
        </Text>
        <Text lineHeight="1.5" mt=" 2">
          {`Une fois les informations souhaitées remplies, cliquer sur "Enregistrer".`}
        </Text>
      </Box>
      <Box p="5" sx={{ flexGrow: 99999, flexBasis: 0, minWidth: 320 }}>
        <Box mb="3">
          <Heading3>Réserver une mesure</Heading3>
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
              placeholder="année"
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
              placeholder="cabinet (optionnel)"
            />
          </Field>
          <Field>
            <Select
              id="urgent"
              name="urgent"
              placeholder="Est-ce une demande urgente"
              value={formik.values.urgent}
              hasError={formik.errors.urgent && formik.touched.urgent}
              onChange={option => formik.setFieldValue("urgent", option)}
              options={IS_URGENT}
            />
          </Field>
          <Field>
            <Input
              value={formik.values.judgmentDate}
              id="judgmentDate"
              name="judgmentDate"
              hasError={formik.errors.judgmentDate && formik.touched.judgmentDate}
              type="date"
              onChange={formik.handleChange}
              placeholder="Date prévisionnelle du jugement (optionnel)"
            />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(`/magistrats`);
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

MagistratMandataireForm.propTypes = {
  antenneId: PropTypes.number,
  mandataireId: PropTypes.number
};
