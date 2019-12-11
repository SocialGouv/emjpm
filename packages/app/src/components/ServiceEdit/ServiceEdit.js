import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { EDIT_ANTENNE } from "./mutations";
import { GET_SERVICES } from "./queries";
import { ServiceEditAntenneStyle } from "./style";

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const cardStyle = { m: "1", mt: "5", p: "0" };

const ServiceEdit = props => {
  const { data, error, loading } = useQuery(GET_SERVICES);
  const [createAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/informations", `/services/informations`, {
        shallow: true
      });
    }
  });
  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const [service] = data.services;
  const {
    adresse,
    code_postal,
    email,
    dispo_max,
    etablissement,
    id,
    telephone,
    ville,
    nom,
    information,
    prenom
  } = service;

  return (
    <Card sx={cardStyle}>
      <Flex sx={ServiceEditAntenneStyle} {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="80px">
            <Heading4>{`Information de votre service`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information du service`}
            </Text>
          </Box>
          <Box height="220px">
            <Heading4>{`Information du responsable`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent d'identifier la personne en charge de ce service.`}
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Contact du service`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent de renseigner les coordonnées de ce service.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                createAntenne({
                  refetchQueries: ["Service"],
                  variables: {
                    adresse: values.adresse,
                    code_postal: values.code_postal,
                    dispo_max: values.dispo_max,
                    email: values.email,
                    etablissement: values.etablissement,
                    information: values.information,
                    nom: values.nom,
                    prenom: values.prenom,
                    service_id: id,
                    telephone: values.telephone,
                    ville: values.ville
                  }
                });
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                adresse: Yup.string(),
                code_postal: Yup.string(),
                dispo_max: Yup.number(),
                email: Yup.string(),
                etablissement: Yup.string(),
                information: Yup.string(),
                nom: Yup.string(),
                prenom: Yup.string(),
                telephone: Yup.string(),
                ville: Yup.string()
              })}
              initialValues={{
                adresse: adresse || "",
                code_postal: code_postal || "",
                dispo_max: dispo_max || "",
                email: email || "",
                etablissement: etablissement || "",
                information: information || "",
                nom: nom || "",
                prenom: prenom || "",
                telephone: telephone || "",
                ville: ville || ""
              }}
            >
              {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.etablissement}
                        id="etablissement"
                        name="etablissement"
                        hasError={errors.etablissement && touched.etablissement}
                        onChange={handleChange}
                        placeholder="Nom du service"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
                      <Input
                        value={values.nom}
                        id="nom"
                        name="nom"
                        hasError={errors.nom && touched.nom}
                        onChange={handleChange}
                        placeholder="Nom du responsable"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.prenom}
                        id="prenom"
                        name="prenom"
                        hasError={errors.prenom && touched.prenom}
                        onChange={handleChange}
                        placeholder="Prénom du responsable"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.dispo_max.toString()}
                        id="dispo_max"
                        name="dispo_max"
                        hasError={errors.dispo_max && touched.dispo_max}
                        onChange={handleChange}
                        placeholder="Mesures maximum"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
                      <Input
                        value={values.telephone}
                        id="telephone"
                        name="telephone"
                        hasError={errors.telephone && touched.telephone}
                        onChange={handleChange}
                        placeholder="Numéro de téléphone"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.email}
                        id="email"
                        name="email"
                        hasError={errors.email && touched.email}
                        onChange={handleChange}
                        placeholder="Adresse email"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.adresse}
                        id="adresse"
                        name="adresse"
                        hasError={errors.adresse && touched.adresse}
                        onChange={handleChange}
                        placeholder="Adresse"
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
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.information}
                        id="information"
                        name="information"
                        hasError={errors.information && touched.information}
                        onChange={handleChange}
                        placeholder="Informations"
                      />
                    </Box>
                    <Box>
                      <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        Enregistrer
                      </Button>
                    </Box>
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

export { ServiceEdit };
