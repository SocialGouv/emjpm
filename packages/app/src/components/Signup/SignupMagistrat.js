import {
  Button,
  Card,
  Field,
  Heading1,
  Heading4,
  InlineError,
  Input,
  Select,
  Text
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupMagistratSchema } from "../../lib/validationSchemas";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

const SignupMagistratForm = ({ tiDatas }) => {
  const { user, magistrat, setMagistrat, validateStepOne } = useContext(SignupContext);

  const tiOptions = tiDatas.map(ti => ({
    label: ti.etablissement,
    value: ti.id
  }));

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        magistrat: {
          cabinet: values.cabinet,
          ti: values.ti.value
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
    validationSchema: signupMagistratSchema,
    initialValues: {
      cabinet: magistrat ? magistrat.cabinet : "",
      ti: magistrat ? magistrat.ti : ""
    }
  });

  return (
    <Fragment>
      <Heading1 px="1">{`Création d'un compte de magistrat`}</Heading1>
      <Card sx={cardStyle}>
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px" pt={1}>
              <Heading4>{`Tribunal`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Dans quel tribunal exercez-vous?`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} mb="4" width={[1, 3 / 5]}>
            <form onSubmit={formik.handleSubmit}>
              <SignupGeneralError errors={formik.errors} />
              <Field>
                <Select
                  id="ti"
                  name="ti"
                  placeholder="Tribunal d'instance"
                  value={formik.values.ti}
                  hasError={formik.errors.ti && formik.touched.ti}
                  onChange={option => formik.setFieldValue("ti", option)}
                  options={tiOptions}
                />
                {formik.touched.ti && <InlineError message={formik.errors.ti} fieldId="ti" />}
              </Field>
              <Field>
                <Input
                  id="cabinet"
                  name="cabinet"
                  placeholder="Cabinet (optionnel)"
                  value={formik.values.cabinet}
                  hasError={formik.errors.cabinet && formik.touched.cabinet}
                  onChange={formik.handleChange}
                />
                {formik.touched.cabinet && (
                  <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
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
                      setMagistrat(formik.values);
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
        </Flex>
      </Card>
    </Fragment>
  );
};

const SignupMagistrat = props => (
  <SignupDatas {...props} Component={props => <SignupMagistratForm {...props} />} />
);

export { SignupMagistrat };
