import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { PATH } from "../../constants/basePath";
import { magistratEditSchema } from "../../lib/validationSchemas";
import { Link } from "../Commons";
import { UserContext } from "../UserContext";
import { EDIT_USER } from "./mutations";

const MagistratEditInformations = () => {
  const { cabinet, prenom, nom, email, id, type } = useContext(UserContext);

  const [editUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
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
    validationSchema: magistratEditSchema,
    initialValues: {
      cabinet: cabinet || "",
      email: email || "",
      nom: nom || "",
      prenom: prenom || "",
    },
  });

  return (
    <Card mt="5" p="0">
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
                  value={formik.values.cabinet}
                  id="cabinet"
                  name="cabinet"
                  hasError={formik.errors.cabinet && formik.touched.cabinet}
                  onChange={formik.handleChange}
                  placeholder="Cabinet (optionnel)"
                />
                <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
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
