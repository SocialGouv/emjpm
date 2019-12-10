import { useMutation, useQuery } from "@apollo/react-hooks";
import { MesureContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { getRegionCode } from "../../util/departements";
import { EDIT_MESURE, UPDATE_ANTENNE_COUTERS } from "./mutations";
import { DEPARTEMENTS, SERVICE_TRIBUNAL } from "./queries";
import { formatAntenneOptions, formatServiceTribunalList } from "./utils";

export const ServiceEditMesure = props => {
  const {
    currentMesure,
    age,
    antenneId,
    civilite,
    codePostal,
    dateOuverture,
    numeroRg,
    numeroDossier,
    residence,
    type,
    ville,
    user_antennes,
    tribunal,
    tiId,
    service: { service_id }
  } = props;

  const { loading, error, data } = useQuery(SERVICE_TRIBUNAL, {
    variables: { serviceId: service_id }
  });
  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);
  const [EditMesure] = useMutation(EDIT_MESURE);
  const [UpdateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const { setCurrentMesure, setPanelType } = useContext(MesureContext);

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const tribunalList = formatServiceTribunalList(data.service_tis);
  const tribunalDefautValue = tiId ? { label: tribunal, value: tiId } : "";
  const ANTENNE_OPTIONS = formatAntenneOptions(user_antennes);

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Modifier la mesure</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de modifier l'ensemble des informations relatives a une mesure en cours.
          `}
        </Text>
        <Text lineHeight="1.5">
          {`Les cases qui presentent une fleche sur la droite vous proposent de selectionner une valeur dans un menu deroulant, les autres cases sont des champs a remplir librement.
          `}
        </Text>
        <Text lineHeight="1.5">
          {`Cliquez sur le bouton "enregitrer" en bas a droite de la fenetre pour que vos modifications soient prises en compte.
          `}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Modifier la mesure</Heading3>
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
              EditMesure({
                awaitRefetchQueries: true,
                refetchQueries: ["mesures", "mesures_aggregate"],
                variables: {
                  annee: values.annee,
                  antenne_id: values.antenne_id ? values.antenne_id.value : null,
                  civilite: values.civilite.value,
                  code_postal: values.code_postal,
                  date_ouverture: values.date_ouverture,
                  department_id: departement.id,
                  id: currentMesure,
                  numero_dossier: values.numero_dossier,
                  numero_rg: values.numero_rg,
                  residence: values.residence.value,
                  ti_id: values.tribunal.value,
                  type: values.type.value,
                  ville: values.ville
                }
              });
              if (values.antenne_id) {
                UpdateAntenneCounters({
                  variables: {
                    antenne_id: values.antenne_id.value,
                    inc_mesures_awaiting: 0,
                    inc_mesures_in_progress: 1
                  }
                });
              }
              if (antenneId) {
                UpdateAntenneCounters({
                  variables: {
                    antenne_id: antenneId,
                    inc_mesures_awaiting: 0,
                    inc_mesures_in_progress: -1
                  }
                });
              }
              setPanelType(null);
              setCurrentMesure(null);
            }
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            annee: Yup.string().required("Champ obligatoire"),
            civilite: Yup.string().required("Champ obligatoire"),
            code_postal: Yup.string().required("Champ obligatoire"),
            date_ouverture: Yup.date().required("Champ obligatoire"),
            numero_dossier: Yup.string().required("Champ obligatoire"),
            numero_rg: Yup.string().required("Champ obligatoire"),
            residence: Yup.string().required("Champ obligatoire"),
            tribunal: Yup.string().required("Champ obligatoire"),
            type: Yup.string().required("Champ obligatoire"),
            ville: Yup.string().required("Champ obligatoire")
          })}
          initialValues={{
            annee: age,
            antenne_id: antenneId ? ANTENNE_OPTIONS.find(o => o.value === antenneId) : null,
            civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
            code_postal: codePostal,
            date_ouverture: dateOuverture,
            numero_dossier: numeroDossier,
            numero_rg: numeroRg,
            residence: { label: residence, value: residence },
            tribunal: tribunalDefautValue,
            type: { label: type, value: type },
            ville: ville
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
                <Box sx={{ position: "relative", zIndex: "70" }} mb="2">
                  <Select
                    id="tribunal"
                    name="tribunal"
                    placeholder="Tribunal"
                    value={values.tribunal}
                    options={tribunalList}
                    hasError={errors.tribunal && touched.tribunal}
                    onChange={option => setFieldValue("tribunal", option)}
                  />
                  {errors.tribunal && touched.tribunal && <Text>{errors.tribunal}</Text>}
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.numero_dossier}
                    id="numero_dossier"
                    name="numero_dossier"
                    hasError={errors.numero_dossier && touched.numero_dossier}
                    onChange={handleChange}
                    placeholder="numero de dossier"
                  />
                </Box>
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
                {user_antennes.length >= 2 && (
                  <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
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
