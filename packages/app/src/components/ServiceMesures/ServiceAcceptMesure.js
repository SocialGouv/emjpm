import { useMutation, useQuery } from "@apollo/react-hooks";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { RESIDENCE } from "../../constants/mesures";
import { getRegionCode } from "../../util/departements";
import { ACCEPT_MESURE, UPDATE_ANTENNE_COUTERS, UPDATE_SERVICES_COUTERS } from "./mutations";
import { DEPARTEMENTS } from "./queries";
import { formatAntenneOptions } from "./utils";

export const ServiceAcceptMesure = props => {
  const { currentMesure, user_antennes } = props;

  const { data: departementsData } = useQuery(DEPARTEMENTS);

  const [UpdateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const [UpdateServicesCounter] = useMutation(UPDATE_SERVICES_COUTERS);

  const [UpdateMesure] = useMutation(ACCEPT_MESURE, {
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
          mesures_awaiting: -1,
          mesures_in_progress: 1,
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

  const { setCurrentMesure, setPanelType } = useContext(MesureContext);
  const ANTENNE_OPTIONS = formatAntenneOptions(user_antennes);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Accepter la mesure</Heading5>
        <Text lineHeight="1.5">
          {`A reception de la notification de la decision du juge par courrier, le formulaire ci-contre vous permet de valider que cette mesure vous a ete attribuee.`}
        </Text>
        <Text lineHeight="1.5">
          {`Afin de rendre cette mesure active, vous devez imperativement remplir tous les champs de ce formulaire, puis cliquer sur "Valider la mesure".`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Accepter la mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting, setErrors }) => {
            const regionCode = getRegionCode(values.code_postal);
            const departements = departementsData.departements;
            const departement = departements.find(dep => dep.code === regionCode);
            if (!departement) {
              setErrors({
                code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
              });
            } else {
              UpdateMesure({
                refetchQueries: ["mesures", "mesures_aggregate"],
                variables: {
                  antenne_id: values.antenne_id ? values.antenne_id.value : null,
                  code_postal: values.code_postal,
                  date_ouverture: values.date_ouverture,
                  department_id: departement.id,
                  id: currentMesure,
                  residence: values.residence.value,
                  ville: values.ville
                }
              });
              setPanelType(null);
              setCurrentMesure(null);
            }
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            code_postal: Yup.string().required(),
            date_ouverture: Yup.date().required(),
            residence: Yup.string().required(),
            ville: Yup.string().required()
          })}
          initialValues={{
            antenne_id: "",
            code_postal: "",
            date_ouverture: "",
            residence: "",
            ville: ""
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
                <Box sx={{ position: "relative", zIndex: "90" }} mb="2">
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
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.code_postal}
                    id="code_postal"
                    name="code_postal"
                    hasError={errors.code_postal && touched.code_postal}
                    onChange={handleChange}
                    placeholder="Code postal"
                  />
                  {errors.code_postal && touched.code_postal && <Text>{errors.code_postal}</Text>}
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.ville}
                    id="ville"
                    name="ville"
                    hasError={errors.ville && touched.ville}
                    onChange={handleChange}
                    placeholder="ville"
                  />
                </Box>
                {user_antennes.length >= 2 && (
                  <Box sx={{ position: "relative", zIndex: "70" }} mb="2">
                    <Select
                      id="antenne_id"
                      name="antenne_id"
                      placeholder="Antenne"
                      value={values.antenne_id}
                      hasError={errors.antenne_id && touched.antenne_id}
                      onChange={option => setFieldValue("antenne_id", option)}
                      options={ANTENNE_OPTIONS}
                    />
                  </Box>
                )}
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
                      Valider la mesure
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
