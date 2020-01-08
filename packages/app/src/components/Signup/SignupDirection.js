import { Button, Card, Field, Heading1, Heading4, Select, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { DIRECTION_TYPE_LABEL_VALUE } from "../../constants/direction";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

export const SignupDirection = () => {
  const { user, direction, setDirection, validateStepOne } = useContext(SignupContext);

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        direction: {
          directionType: values.directionType.value
        },
        user: {
          username: user.email,
          ...user
        }
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: errors => setErrors(errors),
        onSuccess: () => Router.push("/signup/congratulation")
      });
    },
    validationSchema: Yup.object().shape({
      directionType: Yup.string().required("Champ obligatoire")
    }),
    initialValues: {
      directionType: direction ? direction.directionType : ""
    }
  });

  return (
    <Fragment>
      <Card sx={cardStyle}>
        <Heading1 px="1">{`Création d'un compte d'agent de l'état`}</Heading1>
        <Flex flexDirection="column">
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px" pt={1}>
              <Heading4>{`Institution`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Pour quelle direction travaillez-vous?`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <form onSubmit={formik.handleSubmit}>
                <SignupGeneralError errors={formik.errors} />
                <Field>
                  <Select
                    id="directionType"
                    name="directionType"
                    placeholder="Type de direction"
                    value={formik.values.directionType}
                    hasError={formik.errors.directionType && formik.touched.directionType}
                    onChange={option => formik.setFieldValue("directionType", option)}
                    options={DIRECTION_TYPE_LABEL_VALUE}
                  />
                  {formik.errors.cabinet && formik.touched.cabinet && (
                    <Text>{formik.errors.cabinet}</Text>
                  )}
                </Field>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Button mr="2" variant="outline">
                      <Link href="/">
                        <a>Annuler</a>
                      </Link>
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        setDirection(formik.values);
                        validateStepOne(false);
                      }}
                    >
                      <a>Retour</a>
                    </Button>
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
    </Fragment>
  );
};
