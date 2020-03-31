import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Field, Heading1, Heading4, InlineError, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupServiceSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { SignupContext } from "./context";
import { DEPARTMENTS } from "./queries";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

function getServiceOptions(services, departments, selectedValue) {
  const department = departments.find(data => data.id === selectedValue);
  if (!department) {
    return [];
  }

  const { code } = department;
  return services
    .filter(({ code_postal }) => {
      // Permet de gérer les code postaux invalides en base de données
      try {
        return getRegionCode(code_postal) === code;
      } catch (err) {
        return false;
      }
    })
    .map(({ etablissement, id }) => ({
      label: etablissement,
      value: id
    }));
}

const SignupServiceForm = ({ serviceDatas }) => {
  const { user, service, setService, validateStepOne } = useContext(SignupContext);
  const { data, loading } = useQuery(DEPARTMENTS);

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

  if (loading) {
    return null;
  }

  const { departements: departments = [] } = data;
  const selectedValue = formik.values.departement ? formik.values.departement.value : undefined;
  const serviceOptions = getServiceOptions(serviceDatas, departments, selectedValue);
  const departmentsOptions = departments.map(({ nom, id }) => ({
    label: nom,
    value: id
  }));

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
                  onChange={option => formik.setFieldValue("departement", option)}
                  options={departmentsOptions}
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
