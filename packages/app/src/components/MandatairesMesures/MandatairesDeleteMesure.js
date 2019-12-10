import { useMutation } from "@apollo/react-hooks";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { Button, Heading3, Heading5, Input } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { DELETE_MESURE } from "./mutations";
import { MANDATAIRE_MESURES } from "./queries";

export const MandatairesDeleteMesure = props => {
  const { currentMesure, queryVariables } = props;
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);

  const [UpdateMesure] = useMutation(DELETE_MESURE);

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">Supprimer la mesure</Heading5>
        <Text mb="2" lineHeight="1.5">
          {`Vous êtes sur le point de supprimer définitivement une mesure de protection du système eMJPM. Toute suppression est irreversible, vous ne pourrez pas récupérer les données associées à cette mesure et celle-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'Etat.`}
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
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            UpdateMesure({
              refetchQueries: [{ query: MANDATAIRE_MESURES, variables: queryVariables }],
              variables: {
                id: currentMesure
              }
            });
            setSubmitting(false);
            setPanelType(null);
            setCurrentMesure(null);
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
                        setPanelType(PANEL_TYPE.CLOSE);
                        setCurrentMesure(null);
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

MandatairesDeleteMesure.propTypes = {
  currentMesure: PropTypes.number.isRequired
};
