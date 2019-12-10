import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { PATH } from "../../constants/basePath";
import { Link } from "../Commons";
import { EDIT_USER } from "./mutations";

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const MandatairesEditInformations = props => {
  const { prenom, nom, email, id, type } = props;
  const [EditUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
        shallow: true
      });
    }
  });
  return (
    <Card sx={cardStyle}>
      <Flex {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="80px">
            <Heading4>{`Modifier vos informations`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Vos informations`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                EditUser({
                  refetchQueries: ["users"],
                  variables: {
                    email: values.email.toLowerCase(),
                    id: id,
                    nom: values.nom,
                    prenom: values.prenom
                  }
                });
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string("Champ obligatoire")
                  .email("Le format de votre email n'est pas correct")
                  .required("Champ obligatoire"),
                nom: Yup.string().required("Champ obligatoire"),
                prenom: Yup.string().required("Champ obligatoire")
              })}
              initialValues={{
                email: email || "",
                nom: nom || "",
                prenom: prenom || ""
              }}
            >
              {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.prenom}
                        id="prenom"
                        name="prenom"
                        hasError={errors.prenom && touched.prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                      />
                      {errors.prenom && touched.prenom && <Text mt="1">{errors.prenom}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.nom}
                        id="nom"
                        name="nom"
                        hasError={errors.nom && touched.nom}
                        onChange={handleChange}
                        placeholder="Nom"
                      />
                      {errors.nom && touched.nom && <Text mt="1">{errors.nom}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.email}
                        id="email"
                        name="email"
                        hasError={errors.email && touched.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      {errors.email && touched.email && <Text mt="1">{errors.email}</Text>}
                    </Box>
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Box mr="2">
                        <Link href={`${PATH[type]}/informations`}>Annuler</Link>
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

export { MandatairesEditInformations };
