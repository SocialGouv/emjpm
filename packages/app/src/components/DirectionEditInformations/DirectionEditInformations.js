import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { UserContext } from "../../../src/components/UserContext";
import { directionEditSchema } from "../../lib/validationSchemas/directionEditSchema";
import { EDIT_USER } from "./mutations";

const DirectionEditInformations = () => {
  const { prenom, nom, email, id } = useContext(UserContext);

  const [editUser] = useMutation(EDIT_USER, {
    update() {
      Router.push("/direction/informations", `/direction/informations`, {
        shallow: true,
      });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await editUser({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          cabinet: values.cabinet,
          email: values.email.toLowerCase(),
          id: id,
          nom: values.nom,
          prenom: values.prenom,
        },
      });

      setSubmitting(false);
    },
    validationSchema: directionEditSchema,
    initialValues: {
      email: email || "",
      nom: nom || "",
      prenom: prenom || "",
    },
  });

  return (
    <Card m="1" mt="5" p="0">
      <Flex>
        <Box width={[1, 2 / 5]} bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
          <Box height="80px">
            <Heading4>{`Modifier vos informations`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Vos informations`}
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <form onSubmit={formik.handleSubmit}>
              <Field>
                <Input
                  value={formik.values.prenom}
                  id="prenom"
                  name="prenom"
                  hasError={formik.errors.prenom && formik.touched.prenom}
                  onChange={formik.handleChange}
                  placeholder="Prénom"
                />
                <InlineError message={formik.errors.prenom} fieldId="prenom" />
              </Field>
              <Field>
                <Input
                  value={formik.values.nom}
                  id="nom"
                  name="nom"
                  hasError={formik.errors.nom && formik.touched.nom}
                  onChange={formik.handleChange}
                  placeholder="Nom"
                />
                <InlineError message={formik.errors.nom} fieldId="nom" />
              </Field>
              <Field>
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  hasError={formik.errors.email && formik.touched.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                <InlineError message={formik.errors.email} fieldId="email" />
              </Field>
              <Box>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  Enregistrer
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { DirectionEditInformations };
