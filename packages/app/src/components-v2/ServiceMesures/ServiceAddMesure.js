import { useMutation } from "@apollo/react-hooks";
import { Button, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { ADD_MESURE } from "./mutations";

export const ServiceAddMesure = props => {
  const [AddMesure] = useMutation(ADD_MESURE);

  const antenneOptions = props.user_antennes.map(ua => ({
    label: ua.service_antenne.name,
    value: ua.service_antenne.id
  }));

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          AddMesure({
            variables: {
              antenne_id: Number.parseInt(values.antenne.value),
              date_ouverture: values.date_ouverture,
              type: values.type.value,
              residence: values.residence.value,
              code_postal: values.code_postal,
              ville: values.ville,
              civilite: values.civilite.value,
              annee: values.annee,
              numero_dossier: values.numero_dossier,
              numero_rg: values.numero_rg,
              status: "Mesure en cours"
            },
            refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"]
          });
          setSubmitting(false);
          Router.push("/services");
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        antenne: Yup.string().required(),
        date_ouverture: Yup.date().required(),
        type: Yup.string().required(),
        residence: Yup.string().required(),
        code_postal: Yup.string().required(),
        ville: Yup.string().required(),
        civilite: Yup.string().required(),
        annee: Yup.string().required(),
        numero_dossier: Yup.string().required(),
        numero_rg: Yup.string().required()
      })}
      initialValues={{
        date_ouverture: "",
        code_postal: "",
        ville: "",
        annee: "",
        civilite: "",
        numero_rg: "",
        numero_dossier: ""
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
            <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
              <Select
                id="antenne"
                name="antenne"
                placeholder="Antenne"
                value={values.antenne}
                hasError={errors.antenne_id && touched.antenne_id}
                onChange={option => setFieldValue("antenne", option)}
                options={antenneOptions}
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
            <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
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
            <Box sx={{ zIndex: "90", position: "relative" }} mb="2">
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
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Input
                value={values.code_postal}
                id="code_postal"
                name="code_postal"
                hasError={errors.code_postal && touched.code_postal}
                onChange={handleChange}
                placeholder="Code postal"
              />
            </Box>
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Input
                value={values.ville}
                id="ville"
                name="ville"
                hasError={errors.ville && touched.ville}
                onChange={handleChange}
                placeholder="ville"
              />
            </Box>
            <Box sx={{ zIndex: "80", position: "relative" }} mb="2">
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
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Input
                value={values.annee}
                id="annee"
                name="annee"
                hasError={errors.annee && touched.annee}
                onChange={handleChange}
                placeholder="année"
              />
            </Box>
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Input
                value={values.numero_dossier}
                id="numero_dossier"
                name="numero_dossier"
                hasError={errors.numero_dossier && touched.numero_dossier}
                onChange={handleChange}
                placeholder="numero de dossier"
              />
            </Box>
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Input
                value={values.numero_rg}
                id="numero_rg"
                name="numero_rg"
                hasError={errors.numero_rg && touched.numero_rg}
                onChange={handleChange}
                placeholder="numero rg"
              />
            </Box>
            <Flex justifyContent="flex-end">
              <Box>
                <Button mr="2" variant="outline">
                  <Link href="/services">
                    <a>Annuler</a>
                  </Link>
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
  );
};
