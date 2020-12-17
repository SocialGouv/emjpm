import { Button, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/components/HeadingTitle";
import { Link } from "~/components/Link";
import { signupMagistratSchema } from "~/lib/validationSchemas";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

const SignupMagistratForm = ({ tiDatas }) => {
  const { user, magistrat, setMagistrat, validateStepOne } = useContext(
    SignupContext
  );

  const tiOptions = tiDatas.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  const formik = useFormik({
    initialValues: {
      cabinet: magistrat ? magistrat.cabinet : "",
      ti: magistrat ? magistrat.ti : "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        magistrat: {
          cabinet: values.cabinet,
          ti: values.ti,
        },
        user: {
          username: user.email,
          ...user,
        },
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => Router.push("/signup/congratulation"),
      });
    },
    validationSchema: signupMagistratSchema,
  });

  return (
    <Fragment>
      <HeadingTitle
        p="1"
        m="1"
      >{`Création d'un compte de magistrat`}</HeadingTitle>
      <form onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading4>{`Tribunal`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Dans quel tribunal exercez-vous?`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              formik={formik}
              id="ti"
              placeholder="Tribunal d'instance"
              options={tiOptions}
              isClearable={true}
            />

            <FormGroupInput
              id="cabinet"
              placeholder="Cabinet (optionnel)"
              formik={formik}
            />
          </FormInputBox>
        </Flex>

        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Link href="/">
              <Button mr="2" variant="outline">
                Annuler
              </Button>
            </Link>
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
              Retour
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
    </Fragment>
  );
};

const SignupMagistrat = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupMagistratForm {...props} />}
  />
);

export { SignupMagistrat };
