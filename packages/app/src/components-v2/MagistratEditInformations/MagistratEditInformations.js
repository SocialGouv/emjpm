import React from "react";
import { Box, Flex } from "rebass";
import Router from "next/router";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import { Text, Heading4, Card, Input, Button } from "@socialgouv/emjpm-ui-core";

import { EDIT_USER } from "./mutations";

const cardStyle = { p: "0", m: "1", mt: "5" };

const grayBox = {
  borderRadius: "5px 0 0 5px",
  bg: "cardSecondary",
  p: "5"
};

const MagistratEditInformations = props => {
  const { cabinet, username, prenom, nom, email, id } = props;
  const [EditUser] = useMutation(EDIT_USER, {
    update() {
      Router.push("/magistrats/informations", `/magistrats/informations`, {
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
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                EditUser({
                  variables: {
                    cabinet: values.cabinet,
                    username: values.username,
                    prenom: values.prenom,
                    nom: values.nom,
                    email: values.email,
                    id: id
                  },
                  refetchQueries: ["users"]
                });
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                cabinet: Yup.string(),
                username: Yup.string().required(),
                prenom: Yup.string().required(),
                nom: Yup.string().required(),
                email: Yup.string().required()
              })}
              initialValues={{
                cabinet: cabinet || "",
                username: username || "",
                prenom: prenom || "",
                nom: nom || "",
                email: email || ""
              }}
            >
              {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                      <Input
                        value={values.cabinet}
                        id="cabinet"
                        name="cabinet"
                        hasError={errors.cabinet && touched.cabinet}
                        onChange={handleChange}
                        placeholder="Cabinet"
                      />
                    </Box>
                    <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                      <Input
                        value={values.username}
                        id="username"
                        name="username"
                        hasError={errors.username && touched.username}
                        onChange={handleChange}
                        placeholder="Nom d'utilisateur"
                      />
                    </Box>
                    <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                      <Input
                        value={values.prenom}
                        id="prenom"
                        name="prenom"
                        hasError={errors.prenom && touched.prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                      />
                    </Box>
                    <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                      <Input
                        value={values.nom}
                        id="nom"
                        name="nom"
                        hasError={errors.nom && touched.nom}
                        onChange={handleChange}
                        placeholder="Nom"
                      />
                    </Box>
                    <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                      <Input
                        value={values.email}
                        id="email"
                        name="email"
                        hasError={errors.email && touched.email}
                        onChange={handleChange}
                        placeholder="Email"
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

export { MagistratEditInformations };
