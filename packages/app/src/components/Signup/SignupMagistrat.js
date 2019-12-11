import { Button, Card, Heading1, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

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
          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <Formik
                onSubmit={(values, { setSubmitting, setErrors }) => {
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
                }}
                validationSchema={Yup.object().shape({
                  cabinet: Yup.string(),
                  ti: Yup.string().required("Champ obligatoire")
                })}
                initialValues={{
                  cabinet: magistrat ? magistrat.cabinet : "",
                  ti: magistrat ? magistrat.ti : ""
                }}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    setFieldValue,
                    handleChange
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <SignupGeneralError errors={props.errors} />
                      <Box sx={{ position: "relative", zIndex: "110" }} mb="2">
                        <Select
                          id="ti"
                          name="ti"
                          placeholder="Tribunal d'instance"
                          value={values.ti}
                          hasError={errors.ti && touched.ti}
                          onChange={option => setFieldValue("ti", option)}
                          options={tiOptions}
                        />
                        {errors.ti && touched.ti && <Text>{errors.ti}</Text>}
                      </Box>
                      <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
                        <Input
                          id="cabinet"
                          name="cabinet"
                          placeholder="Cabinet (optionnel)"
                          value={values.cabinet}
                          hasError={errors.cabinet && touched.cabinet}
                          onChange={handleChange}
                        />
                        {errors.cabinet && touched.cabinet && <Text>{errors.cabinet}</Text>}
                      </Box>
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
                              setMagistrat(values);
                              validateStepOne(false);
                            }}
                          >
                            <a>Retour</a>
                          </Button>
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
    </Fragment>
  );
};

const SignupMagistrat = props => (
  <SignupDatas {...props} Component={props => <SignupMagistratForm {...props} />} />
);

export { SignupMagistrat };
