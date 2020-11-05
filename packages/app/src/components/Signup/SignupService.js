import { useQuery } from "@apollo/react-hooks";
import { getDepartementCode } from "@emjpm/core";
import { Button, Card, Heading1, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupServiceSchema } from "../../lib/validationSchemas";
import { toOptions } from "../../util";
import { FormGroupSelect } from "../AppForm";
import { SignupContext } from "./context";
import { DEPARTMENTS } from "./queries";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

function getServiceOptions(services, departments, selectedValue) {
  const department = departments.find(
    (department) => department.id === selectedValue
  );
  if (!department) {
    return [];
  }

  const { code } = department;
  const compatibleServices = services.filter(({ code_postal }) => {
    // Permet de gérer les code postaux invalides en base de données
    try {
      return getDepartementCode(code_postal) === code;
    } catch (err) {
      return false;
    }
  });

  return toOptions(compatibleServices, "id", "etablissement");
}

const SignupServiceForm = ({ serviceDatas }) => {
  const { user, service, setService, validateStepOne } = useContext(
    SignupContext
  );
  const { data, loading } = useQuery(DEPARTMENTS);

  const formik = useFormik({
    initialValues: {
      departement: service?.departement || null,
      service: service?.service || null,
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        service: {
          service_id: values.service,
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
    validationSchema: signupServiceSchema,
  });

  if (loading) {
    return null;
  }

  const { departements: departments = [] } = data;

  const serviceOptions = getServiceOptions(
    serviceDatas,
    departments,
    formik.values.departement
  );

  const departmentsOptions = toOptions(departments, "id", "nom");

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
              <FormGroupSelect
                id="departement"
                formik={formik}
                placeholder="Département de votre service"
                options={departmentsOptions}
              />
              <FormGroupSelect
                id="service"
                formik={formik}
                placeholder="Votre service"
                options={serviceOptions}
                isClearable={true}
              />
              <Flex justifyContent="flex-end">
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
                      setService(null);
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
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};

const SignupService = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupServiceForm {...props} />}
  />
);

export { SignupService };
