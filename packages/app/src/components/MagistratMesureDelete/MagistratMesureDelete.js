import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, Input } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { DELETE_MANDATAIRE_MESURE, DELETE_SERVICE_MESURE } from "./mutations";
import { MESURE } from "./queries";
import { MagistratMesureRemoveStyle } from "./style";

export const MagistratMesureDelete = props => {
  const { mesureId } = props;

  const { data, loading, error } = useQuery(MESURE, {
    variables: {
      id: mesureId
    }
  });

  const [DeleteMandataireMesure] = useMutation(DELETE_MANDATAIRE_MESURE, {
    onCompleted() {
      Router.push(`/magistrats/mesures`);
    }
  });
  const [DeleteServiceMesure] = useMutation(DELETE_SERVICE_MESURE, {
    onCompleted() {
      Router.push(`/magistrats/mesures`);
    }
  });

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const mesure = data.mesures[0];
  return (
    <Flex sx={MagistratMesureRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">Supprimer la mesure</Heading5>
        <Text mb="2" lineHeight="1.5">
          {`Vous êtes sur le point de supprimer définitivement une mesure réservée du système eMJPM. Toute suppression est irréversible.`}
        </Text>
        <Text lineHeight="1.5">{`Si vous souhaitez supprimer cette mesure réservée, cliquez sur "Supprimer la mesure".`}</Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>Supprimer la mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            if (mesure.mandataire_id) {
              DeleteMandataireMesure({
                refetchQueries: ["mesures"],
                variables: {
                  id: mesureId,
                  mandataire_id: mesure.mandataire_id
                }
              });
            } else if (mesure.service_id) {
              DeleteServiceMesure({
                refetchQueries: ["mesures"],
                variables: {
                  id: mesureId,
                  service_id: mesure.service_id
                }
              });
            }
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            reason_delete: Yup.string().required("Required")
          })}
          initialValues={{ reason_delete: "" }}
        >
          {props => {
            const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb="2">
                  <Input
                    value={values.reason_delete}
                    hasError={errors.reason_delete && touched.reason_delete}
                    id="reason_delete"
                    name="reason_delete"
                    onChange={handleChange}
                    placeholder="Raison de la suppression"
                  />
                </Box>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        Router.push(`/magistrats/mesures/${mesureId}`);
                      }}
                    >
                      Annuler
                    </Button>
                  </Box>
                  <Box>
                    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                      Supprimer la mesure
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
