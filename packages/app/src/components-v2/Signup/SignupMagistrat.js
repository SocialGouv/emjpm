import { Heading1, Heading4, Button, Card, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { MAGISTRAT_CABINET_LABEL_VALUE } from "../../constants/magistrat";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { grayBox, cardStyle } from "./style";

const SignupMagistratForm = ({ tiDatas }) => {
  const { user, magistrat, setMagistrat, validateStepOne } = useContext(SignupContext);

  const tiOptions = tiDatas.map(ti => ({
    value: ti.id,
    label: ti.etablissement
  }));

  return (
    <Card sx={cardStyle}>
      <Flex flexDirection="column">
        <Box pl={5} pb={3}>
          <Heading1>{`Création d'un compte de magistrat`}</Heading1>
        </Box>
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
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Formik
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const body = {
                    magistrat: {
                      ti: values.ti.value,
                      cabinet: values.cabinet.value
                    },
                    user: {
                      username: user.email,
                      ...user
                    }
                  };
                  signup({
                    body,
                    onSuccess: () => Router.push("/signup/congratulation"),
                    onError: errors => setErrors(errors),
                    onComplete: () => setSubmitting(false)
                  });
                }}
                validationSchema={Yup.object().shape({
                  ti: Yup.string().required("Champs obligatoire"),
                  cabinet: Yup.string().required("Champs obligatoire")
                })}
                initialValues={{
                  ti: magistrat ? magistrat.ti : "",
                  cabinet: magistrat ? magistrat.cabinet : ""
                }}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    setFieldValue
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <SignupGeneralError errors={props.errors} />
                      <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
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
                      <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
                        <Select
                          id="cabinet"
                          name="cabinet"
                          placeholder="Cabinet"
                          value={values.cabinet}
                          hasError={errors.cabinet && touched.cabinet}
                          onChange={option => setFieldValue("cabinet", option)}
                          options={MAGISTRAT_CABINET_LABEL_VALUE}
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
      </Flex>
    </Card>
  );
};

const SignupMagistrat = props => (
  <SignupDatas {...props} Component={props => <SignupMagistratForm {...props} />} />
);

export { SignupMagistrat };
