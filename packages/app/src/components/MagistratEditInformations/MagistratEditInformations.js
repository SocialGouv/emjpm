import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Field, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { PATH } from "../../constants/basePath";
import { magistratEditSchema } from "../../lib/validationSchemas";
import { Link } from "../Commons";
import { EDIT_USER } from "./mutations";

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const MagistratEditInformations = props => {
  const { cabinet, prenom, nom, email, id, type } = props;

  const [editUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
        shallow: true
      });
    }
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await editUser({
        refetchQueries: ["users"],
        variables: {
          cabinet: values.cabinet,
          email: values.email.toLowerCase(),
          id: id,
          nom: values.nom,
          prenom: values.prenom
        }
      });

      setSubmitting(false);
    },
    validationSchema: magistratEditSchema,
    initialValues: {
      cabinet: cabinet || "",
      email: email || "",
      nom: nom || "",
      prenom: prenom || ""
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
            <form onSubmit={formik.handleSubmit}>
              <Field sx={{ position: "relative", zIndex: "1" }} mb="2">
                <Input
                  value={formik.values.cabinet}
                  id="cabinet"
                  name="cabinet"
                  hasError={formik.errors.cabinet && formik.touched.cabinet}
                  onChange={formik.handleChange}
                  placeholder="Cabinet (optionnel)"
                />
                {formik.errors.cabinet && formik.touched.cabinet && (
                  <Text mt="1">{formik.errors.cabinet}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.prenom}
                  id="prenom"
                  name="prenom"
                  hasError={formik.errors.prenom && formik.touched.prenom}
                  onChange={formik.handleChange}
                  placeholder="Prénom"
                />
                {formik.errors.prenom && formik.touched.prenom && (
                  <Text mt="1">{formik.errors.prenom}</Text>
                )}
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
                {formik.errors.nom && formik.touched.nom && <Text mt="1">{formik.errors.nom}</Text>}
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
                {formik.errors.email && formik.touched.email && (
                  <Text mt="1">{formik.errors.email}</Text>
                )}
              </Field>
              <Flex alignItems="center" justifyContent="flex-end">
                <Box mr="2">
                  <Link href={`${PATH[type]}/informations`}>Annuler</Link>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { MagistratEditInformations };
