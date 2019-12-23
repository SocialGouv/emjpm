import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import {
  CLOSE_MESURE,
  UPDATE_ANTENNE_COUTERS,
  UPDATE_SERVICES_COUTERS
} from "../ServiceMesures/mutations";

const EXTINCTION_LABEL_VALUE = [
  { label: "caducité", value: "caducité" },
  { label: "changement de mandataires", value: "changement de mandataires" },
  { label: "changement de tribunal d'instance", value: "changement de tribunal d'instance" },
  { label: "décès", value: "décès" },
  { label: "main levée", value: "levée" },
  { label: "erreur de saisie", value: "saisie" },
  { label: "autre", value: "autre" }
];

export const ServiceMesureCloseForm = props => {
  const { mesureId } = props;

  const [UpdateServicesCounter] = useMutation(UPDATE_SERVICES_COUTERS);
  const [UpdateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const [UpdateMesure] = useMutation(CLOSE_MESURE, {
    onCompleted() {
      Router.push(`/services/mesures/${mesureId}`);
    },
    update(
      cache,
      {
        data: {
          update_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;
      UpdateServicesCounter({
        variables: {
          mesures_awaiting: 0,
          mesures_in_progress: -1,
          service_id: mesure.service_id
        }
      });
      if (mesure.antenne_id) {
        UpdateAntenneCounters({
          variables: {
            antenne_id: mesure.antenne_id,
            inc_mesures_awaiting: -1,
            inc_mesures_in_progress: 1
          }
        });
      }
    }
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
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            UpdateMesure({
              refetchQueries: ["mesures", "mesures_aggregate"],
              variables: {
                extinction: values.extinction,
                id: mesureId,
                reason_extinction: values.reason_extinction.value
              }
            });
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            extinction: Yup.date().required("Required"),
            reason_extinction: Yup.string().required("Required")
          })}
          initialValues={{ extinction: "", reason_extinction: "" }}
        >
          {props => {
            const {
              setFieldValue,
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit
            } = props;
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
                    placeholder="Date de fin de mandat"
                  />
                </Box>
                <Box mb="2">
                  <Select
                    id="reason_extinction"
                    name="reason_extinction"
                    placeholder="Raison de la fin de mandat"
                    value={values.type}
                    hasError={errors.type && touched.type}
                    onChange={option => setFieldValue("reason_extinction", option)}
                    options={EXTINCTION_LABEL_VALUE}
                  />
                </Box>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        Router.push(`/services/mesures/${mesureId}`);
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
