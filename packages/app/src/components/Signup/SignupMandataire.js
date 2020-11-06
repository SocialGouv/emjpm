import { useApolloClient } from "@apollo/react-hooks";
import { findDepartementByCodeOrId } from "@emjpm/core";
import {
  Button,
  Field,
  Heading1,
  Heading4,
  InlineError,
  Select,
  Text,
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { mandataireSignupSchema } from "../../lib/validationSchemas";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { useDepartements } from "../../util/departements/useDepartements.hook";
import { FormGrayBox, FormGroupInput, FormInputBox } from "../AppForm";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

const SignupMandataireForm = ({ tiDatas }) => {
  const { user, mandataire, setMandataire, validateStepOne } = useContext(
    SignupContext
  );

  const { departements } = useDepartements();

  const tiOptions = tiDatas.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      dispo_max: mandataire ? mandataire.dispo_max : "",
      geocode: geocodeInitialValue(mandataire),
      siret: mandataire ? mandataire.siret : "",
      telephone: mandataire ? mandataire.telephone : "",
      telephone_portable: mandataire ? mandataire.telephone_portable : "",
      tis: mandataire ? mandataire.tis : "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (await isSiretExists(client, values.siret)) {
        setErrors({ siret: "Ce SIRET existe déjà" });
      } else {
        const codeDepartement = values.geocode.depcode;
        const departement = findDepartementByCodeOrId(departements, {
          code: codeDepartement,
        });
        const body = {
          mandataire: {
            adresse: values.geocode.label,
            code_postal: values.geocode.postcode,
            department_id: departement.id,
            dispo_max: parseInt(values.dispo_max),
            genre: user.genre,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            siret: values.siret,
            telephone: values.telephone,
            telephone_portable: values.telephone_portable,
            ville: values.geocode.city,
          },
          tis: values.tis.map((ti) => ti.value),
          user: {
            username: user.email,
            ...user,
          },
        };

        await signup({
          body,
          onComplete: () => setSubmitting(false),
          onError: (errors) => setErrors(errors),
          onSuccess: () => Router.push("/signup/congratulation"),
        });
      }
      setSubmitting(false);
    },
    validationSchema: mandataireSignupSchema,
  });

  return (
    <Fragment>
      <Heading1 p="1" m="1">
        {`Demande de création d'un compte de mandataire individuel`}
      </Heading1>

      <form onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading4>{`Tribunaux`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Sélectionner l'ensemble des tribunaux sur lesquels vous êtes agréés`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Field>
              <Select
                id="tis"
                name="tis"
                placeholder="Tribunaux dans lesquels vous exercez"
                value={formik.values.tis}
                hasError={formik.errors.tis && formik.touched.tis}
                onChange={(option) => formik.setFieldValue("tis", option)}
                options={tiOptions}
                isMulti
              />
              {formik.touched.tis && (
                <InlineError message={formik.errors.tis} fieldId="tis" />
              )}
            </Field>
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading4>{`Information professionelle`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre SIRET sera utilisé pour vous identifier en cas d'échanges de données avec
                d'autres systèmes (OCMI par exemple)`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="siret"
              formik={formik}
              placeholder="SIRET"
              value={formik.values.siret}
              validationSchema={mandataireSignupSchema}
            />
          </FormInputBox>
        </Flex>

        <Flex>
          <FormGrayBox>
            <Heading4>{`Téléphone`}</Heading4>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="telephone"
              formik={formik}
              placeholder="Téléphone"
              value={formik.values.telephone}
              validationSchema={mandataireSignupSchema}
            />
            <FormGroupInput
              id="telephone_portable"
              formik={formik}
              placeholder="Téléphone portable"
              value={formik.values.telephone_portable}
              validationSchema={mandataireSignupSchema}
            />
          </FormInputBox>
        </Flex>

        <Flex>
          <FormGrayBox>
            <Heading4>{`Adresse`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Cette adresse permettra de vous localiser sur la carte des mesures`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Field>
              <Geocode
                resource={mandataire}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              />
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
            </Field>
          </FormInputBox>
        </Flex>

        <Flex>
          <FormGrayBox>
            <Heading4>{`Capacité`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Indiquez le nombre de mesures maximal souhaité`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="dispo_max"
              formik={formik}
              placeholder="Nombre de mesures souhaité"
              value={formik.values.dispo_max}
              validationSchema={mandataireSignupSchema}
            />
          </FormInputBox>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box mr="2">
            <Link href="/">
              <Button variant="outline">Annuler</Button>
            </Link>
          </Box>
          <Box mr="2">
            <Button
              variant="outline"
              onClick={() => {
                setMandataire(formik.values);
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

const SignupMandataire = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupMandataireForm {...props} />}
  />
);

export { SignupMandataire };
