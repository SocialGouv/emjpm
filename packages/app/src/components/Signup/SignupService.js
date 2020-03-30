import { Button, Card, Field, Heading1, Heading4, InlineError, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { signupServiceSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

const SignupServiceForm = ({ departementDatas, serviceDatas }) => {
  const { user, service, setService, validateStepOne } = useContext(SignupContext);

  const [serviceOptions, setServiceOptions] = useState([]);

  const departementOptions = departementDatas.map(departement => ({
    label: departement.nom,
    value: departement.id
  }));

  const selectDepartement = option => {
    const selectedDepartement = departementDatas.find(data => data.id === option.value);
    const departementalServices = serviceDatas.filter(data => {
      const regionCode = getRegionCode(data.code_postal);
      return regionCode === selectedDepartement.code;
    });
    setServiceOptions(
      departementalServices.map(data => ({
        label: data.etablissement,
        value: data.id
      }))
    );
  };

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        service: {
          service_id: values.service.value
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
    validationSchema: signupServiceSchema,
    initialValues: {
      departement: service ? service.departement : null,
      service: service ? service.service : null
    }
  });

  return (
    <Fragment>
      <Heading1 px="1">{`Création d'un compte de service mandataire`}</Heading1>
      <Card sx={cardStyle}>
        <Flex mt="3">
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px" pt={1}>
              <Heading4>{`Votre service`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Sélectionnez le département dans lequel se situe le siège social du service mandataire pour lequel vous travaillez.`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} mb="4" width={[1, 3 / 5]}>
            <form onSubmit={formik.handleSubmit}>
              <SignupGeneralError errors={formik.errors} />
              <Field>
                <Select
                  id="departement"
                  name="departement"
                  placeholder="Département de votre service"
                  value={formik.values.departement}
                  hasError={formik.errors.departement && formik.touched.departement}
                  onChange={option => {
                    selectDepartement(option);
                    formik.setFieldValue("departement", option);
                  }}
                  options={departementOptions}
                />
                {formik.touched.departement && (
                  <InlineError message={formik.errors.departement} fieldId="departement" />
                )}
              </Field>
              <Field>
                <Select
                  id="service"
                  name="service"
                  placeholder="Votre service"
                  value={formik.values.service}
                  hasError={formik.errors.service && formik.touched.service}
                  onChange={option => formik.setFieldValue("service", option)}
                  options={serviceOptions}
                />
                {formik.touched.service && (
                  <InlineError message={formik.errors.service} fieldId="service" />
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
                      setService(formik.values);
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

const SignupService = props => (
  <SignupDatas {...props} Component={props => <SignupServiceForm {...props} />} />
);

export { SignupService };
