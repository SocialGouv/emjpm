import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { getHeadquarter } from "../../util/getHeadquarter";
import { ADD_MESURE } from "./mutations";

const ServiceCreateAntenneStyle = {
  flexWrap: "wrap"
};

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const cardStyle = { m: "1", mt: "5", p: "0" };

export const ServiceAddMesure = props => {
  const [AddMesure] = useMutation(ADD_MESURE, {
    options: {
      awaitRefetchQueries: true,
      refetchQueries: ["mesures", "mesures_aggregate"]
    }
  });

  const antenneOptions = props.user_antennes.map(ua => ({
    label: ua.service_antenne.name,
    value: ua.service_antenne.id
  }));
  const [headquarter] = getHeadquarter(props.user_antennes);

  return (
    <Card sx={cardStyle}>
      <Flex sx={ServiceCreateAntenneStyle} {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="155px">
            <Heading4>{`Information de l'antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre service et son antenne le cas écheant`}
            </Text>
          </Box>
          <Box height="280px">
            <Heading4>{`Informations de la mesure`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations nous permettent de vous présenter les mesures de mandataires les plus
              adaptés.
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Informations complémentaires`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations facultatives nous permettent de vous présenter les informations
              relative à vos mesures de façon plus adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                AddMesure({
                  awaitRefetchQueries: true,
                  refetchQueries: ["mesures", "mesures_aggregate"],
                  variables: {
                    annee: values.annee.toString(),
                    antenne_id: Number.parseInt(values.antenne.value),
                    civilite: values.civilite.value,
                    code_postal: values.code_postal,
                    date_ouverture: values.date_ouverture,
                    numero_dossier: values.numero_dossier,
                    numero_rg: values.numero_rg,
                    residence: values.residence.value,
                    type: values.type.value,
                    ville: values.ville
                  }
                });
                setSubmitting(false);
                Router.push("/services");
              }}
              validationSchema={Yup.object().shape({
                annee: Yup.number()
                  .required("Champs obligatoire")
                  .min(1900, "l'année choisi doit être au minimum 1900")
                  .max(2019, "l'année choisi doit être au maximum 2019"),
                antenne: Yup.string().required("Champs obligatoire"),
                civilite: Yup.string().required("Champs obligatoire"),
                code_postal: Yup.string().required("Champs obligatoire"),
                date_ouverture: Yup.date().required("Champs obligatoire"),
                numero_dossier: Yup.string().required("Champs obligatoire"),
                numero_rg: Yup.string().required("Champs obligatoire"),
                residence: Yup.string().required("Champs obligatoire"),
                type: Yup.string().required("Champs obligatoire"),
                ville: Yup.string().required("Champs obligatoire")
              })}
              initialValues={{
                annee: "",
                antenne: {
                  label: headquarter.service_antenne.name,
                  value: headquarter.service_antenne.id
                },
                civilite: "",
                code_postal: "",
                date_ouverture: "",
                numero_dossier: "",
                numero_rg: "",
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
                    <Box sx={{ position: "relative", zIndex: "110" }} mb="2">
                      <Select
                        id="antenne"
                        name="antenne"
                        placeholder="Antenne"
                        value={values.antenne}
                        hasError={errors.antenne_id && touched.antenne_id}
                        onChange={option => setFieldValue("antenne", option)}
                        options={antenneOptions}
                      />
                      {errors.antenne_id && touched.antenne_id && <Text>{errors.antenne_id}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.numero_dossier}
                        id="numero_dossier"
                        name="numero_dossier"
                        hasError={errors.numero_dossier && touched.numero_dossier}
                        onChange={handleChange}
                        placeholder="Numero de dossier"
                      />
                      {errors.numero_dossier && touched.numero_dossier && (
                        <Text>{errors.numero_dossier}</Text>
                      )}
                    </Box>
                    <Box mb="2" mt="5">
                      <Input
                        value={values.date_ouverture}
                        id="date_ouverture"
                        type="date"
                        name="date_ouverture"
                        hasError={errors.date_ouverture && touched.date_ouverture}
                        onChange={handleChange}
                        placeholder="Date d'ouverture"
                      />
                      {errors.date_ouverture && touched.date_ouverture && (
                        <Text>{errors.date_ouverture}</Text>
                      )}
                    </Box>
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
                      {errors.type && touched.type && <Text>{errors.type}</Text>}
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
                      {errors.residence && touched.residence && <Text>{errors.residence}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.numero_rg}
                        id="numero_rg"
                        name="numero_rg"
                        hasError={errors.numero_rg && touched.numero_rg}
                        onChange={handleChange}
                        placeholder="Numéro RG"
                      />
                      {errors.numero_rg && touched.numero_rg && <Text>{errors.numero_rg}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mt="5" mb="2">
                      <Input
                        value={values.annee}
                        id="annee"
                        name="annee"
                        type="number"
                        hasError={errors.annee && touched.annee}
                        onChange={handleChange}
                        placeholder="année"
                      />
                      {errors.annee && touched.annee && <Text>{errors.annee}</Text>}
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
                      {errors.code_postal && touched.code_postal && (
                        <Text>{errors.code_postal}</Text>
                      )}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.ville}
                        id="ville"
                        name="ville"
                        hasError={errors.ville && touched.ville}
                        onChange={handleChange}
                        placeholder="Ville"
                      />
                      {errors.ville && touched.ville && <Text>{errors.ville}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
                      <Select
                        id="civilite"
                        name="civilite"
                        placeholder="Civilité"
                        value={values.civilite}
                        hasError={errors.civilite && touched.civilite}
                        onChange={option => setFieldValue("civilite", option)}
                        options={CIVILITY}
                      />
                      {errors.civilite && touched.civilite && <Text>{errors.civilite}</Text>}
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
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
