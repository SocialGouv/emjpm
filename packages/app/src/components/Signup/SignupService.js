import { Button, Heading1, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { signupServiceSchema } from "~/lib/validationSchemas";
import { toOptions } from "~/util";
import { useDepartements } from "~/util/departements/useDepartements.hook";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

function getServiceOptions(services, departementId) {
  const servicesByDepartement = services.filter(
    (s) => s.department_id === departementId
  );

  return toOptions(servicesByDepartement, "id", "etablissement");
}

const SignupServiceForm = ({ serviceDatas }) => {
  const { user, service, setService, validateStepOne } = useContext(
    SignupContext
  );
  const { departements, loading } = useDepartements();

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

  const serviceOptions = getServiceOptions(
    serviceDatas,
    formik.values.departement
  );

  const departementsOptions = toOptions(departements, "id", "nom");

  return (
    <Fragment>
      <Heading1
        p="1"
        m="1"
      >{`Création d'un compte de service mandataire`}</Heading1>
      <form onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading4>{`Votre service`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Sélectionnez le département dans lequel se situe le siège social du service mandataire pour lequel vous travaillez.`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="departement"
              formik={formik}
              placeholder="Département de votre service"
              options={departementsOptions}
            />
            <FormGroupSelect
              id="service"
              formik={formik}
              placeholder="Votre service"
              options={serviceOptions}
              isClearable={true}
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
