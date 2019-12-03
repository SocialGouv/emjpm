import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { EDIT_ANTENNE } from "./mutations";
import { ServiceEditAntenneStyle } from "./style";

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const cardStyle = { m: "1", mt: "5", p: "0" };

export const getCurrentAntenne = (user_antennes, currentAntenne) => {
  return user_antennes.filter(
    user_antenne => user_antenne.antenne_id === parseInt(currentAntenne, 10)
  );
};

const ServiceEditAntenne = props => {
  const { service_admins, id, currentAntenne, user_antennes } = props;
  const [currentUserService] = service_admins;
  const { service_id } = currentUserService;
  const [antenne] = getCurrentAntenne(user_antennes, currentAntenne);
  const {
    address_city,
    address_street,
    address_zip_code,
    contact_email,
    contact_firstname,
    contact_lastname,
    contact_phone,
    mesures_max,
    name
  } = antenne.service_antenne;
  const [createAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/antennes/[antenne_id]", `/services/antennes/${currentAntenne}`, {
        shallow: true
      });
    }
  });

  return (
    <Card sx={cardStyle}>
      <Flex sx={ServiceEditAntenneStyle} {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="80px">
            <Heading4>{`Information de cette  antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information de cette antenne`}
            </Text>
          </Box>
          <Box height="220px">
            <Heading4>{`Information du responsable`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent d'identifier la personne en charge de cette antenne.`}
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Contact de l'antenne`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Ces informations permettent de renseigner les coordonnées de cette antenne.`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                createAntenne({
                  refetchQueries: ["service_antenne"],
                  variables: {
                    address_city: values.address_city,
                    address_street: values.address_street,
                    address_zip_code: values.address_zip_code,
                    antenne_id: currentAntenne,
                    contact_email: values.contact_email,
                    contact_firstname: values.contact_firstname,
                    contact_lastname: values.contact_lastname,
                    contact_phone: values.contact_phone,
                    mesures_max: values.mesures_max,
                    name: values.name,
                    service_id: service_id,
                    user_id: id
                  }
                });
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                address_city: Yup.string(),
                address_street: Yup.string(),
                address_zip_code: Yup.string(),
                contact_email: Yup.string(),
                contact_firstname: Yup.string(),
                contact_lastname: Yup.string(),
                contact_phone: Yup.string(),
                mesures_max: Yup.number(),
                name: Yup.string()
              })}
              initialValues={{
                address_city: address_city || "",
                address_street: address_street || "",
                address_zip_code: address_zip_code || "",
                contact_email: contact_email || "",
                contact_firstname: contact_firstname || "",
                contact_lastname: contact_lastname || "",
                contact_phone: contact_phone || "",
                mesures_max: mesures_max || "",
                name: name || ""
              }}
            >
              {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.name}
                        id="name"
                        name="name"
                        hasError={errors.name && touched.name}
                        onChange={handleChange}
                        placeholder="Nom de l'antenne"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
                      <Input
                        value={values.contact_lastname}
                        id="contact_lastname"
                        name="contact_lastname"
                        hasError={errors.contact_lastname && touched.contact_lastname}
                        onChange={handleChange}
                        placeholder="Nom du responsable"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.contact_firstname}
                        id="contact_firstname"
                        name="contact_firstname"
                        hasError={errors.contact_firstname && touched.contact_firstname}
                        onChange={handleChange}
                        placeholder="Prénom du responsable"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.mesures_max.toString()}
                        id="mesures_max"
                        name="mesures_max"
                        hasError={errors.mesures_max && touched.mesures_max}
                        onChange={handleChange}
                        placeholder="Mesures maximum"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2" mt="5">
                      <Input
                        value={values.contact_phone}
                        id="contact_phone"
                        name="contact_phone"
                        hasError={errors.contact_phone && touched.contact_phone}
                        onChange={handleChange}
                        placeholder="Numéro de téléphone"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.contact_email}
                        id="contact_email"
                        name="contact_email"
                        hasError={errors.contact_email && touched.contact_email}
                        onChange={handleChange}
                        placeholder="Adresse email"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.address_street}
                        id="address_street"
                        name="address_street"
                        hasError={errors.address_street && touched.address_street}
                        onChange={handleChange}
                        placeholder="Adresse"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.address_zip_code}
                        id="address_zip_code"
                        name="address_zip_code"
                        hasError={errors.address_zip_code && touched.address_zip_code}
                        onChange={handleChange}
                        placeholder="Code postal"
                      />
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.address_city}
                        id="address_city"
                        name="address_city"
                        hasError={errors.address_city && touched.address_city}
                        onChange={handleChange}
                        placeholder="Ville"
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

export { ServiceEditAntenne };
