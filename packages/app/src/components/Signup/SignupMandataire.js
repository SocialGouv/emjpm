import { useApolloClient } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Field,
  Heading1,
  Heading4,
  InlineError,
  Input,
  Select,
  Text,
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireSignupSchema } from "../../lib/validationSchemas";
import { getLocation } from "../../query-service/LocationQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { GeocodeCities } from "../Geocode";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { grayBox } from "./style";

const SignupMandataireForm = ({ tiDatas }) => {
  const { user, mandataire, setMandataire, validateStepOne } = useContext(
    SignupContext
  );

  const tiOptions = tiDatas.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      address: mandataire ? mandataire.adresse : "",
      city: mandataire ? mandataire.city : "",
      dispo_max: mandataire ? mandataire.dispo_max : "",
      genre: mandataire ? mandataire.genre : "",
      siret: mandataire ? mandataire.siret : "",
      telephone: mandataire ? mandataire.telephone : "",
      telephone_portable: mandataire ? mandataire.telephone_portable : "",
      tis: mandataire ? mandataire.tis : "",
      zipcode: mandataire ? mandataire.code_postal : "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const location = await getLocation(client, {
        address: values.address,
        city: values.city,
        zipcode: values.zipcode,
      });
      if (!location || !location.department) {
        setErrors({
          code_postal: "Merci de renseigner un code postal valide",
        });
      } else if (await isSiretExists(client, values.siret)) {
        setErrors({ siret: "Ce SIRET existe déjà" });
      } else {
        const { department, geolocation } = location;
        const body = {
          mandataire: {
            adresse: values.address,
            code_postal: values.zipcode,
            department_id: department.id,
            dispo_max: parseInt(values.dispo_max),
            etablissement: "",
            genre: values.genre.value,
            latitude: geolocation ? geolocation.latitude : null,
            longitude: geolocation ? geolocation.longitude : null,
            siret: values.siret,
            telephone: values.telephone,
            telephone_portable: values.telephone_portable,
            ville: values.city.toUpperCase(),
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
      <Heading1 px="1">
        {user.type === "individuel"
          ? `Création d'un compte de mandataire individuel`
          : `Création d'un compte de mandataire préposé d'établissement`}
      </Heading1>
      <Card m="1" mt="5" p="0">
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px">
              <Heading4>{`Tribunaux`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Sélectionner l'ensemble des tribunaux sur lesquels vous êtes agréés`}
              </Text>
            </Box>
            <Box height="80px">
              <Heading4>{`Civilité`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Votre civilité`}
              </Text>
            </Box>
            <Box height="220px">
              <Heading4>{`Informations professionelles`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Votre SIRET sera utilisé pour vous identifier en cas d'échanges de données avec
                d'autres systèmes (OCMI par exemple)`}
              </Text>
            </Box>
            <Box height="200px">
              <Heading4>{`Adresse professionelle`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`L'adresse de votre siège social`}
              </Text>
            </Box>
            <Box height="80px">
              <Heading4>{`Activité`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                Nombre de mesures souhaité
              </Text>
            </Box>
          </Box>

          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <form onSubmit={formik.handleSubmit}>
                <SignupGeneralError errors={formik.errors} />
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
                <Field>
                  <Select
                    id="genre"
                    name="genre"
                    placeholder="Titre de civilité"
                    value={formik.values.genre}
                    hasError={formik.errors.genre && formik.touched.genre}
                    onChange={(option) => formik.setFieldValue("genre", option)}
                    options={GENDER_OPTIONS}
                  />
                  {formik.touched.genre && (
                    <InlineError
                      message={formik.errors.genre}
                      fieldId="genre"
                    />
                  )}
                </Field>
                <Field>
                  <Input
                    value={formik.values.siret}
                    id="siret"
                    name="siret"
                    hasError={formik.errors.siret && formik.touched.siret}
                    onChange={formik.handleChange}
                    placeholder="SIRET"
                  />
                  {formik.touched.siret && (
                    <InlineError
                      message={formik.errors.siret}
                      fieldId="siret"
                    />
                  )}
                </Field>
                <Field>
                  <Input
                    value={formik.values.telephone}
                    id="telephone"
                    name="telephone"
                    hasError={
                      formik.errors.telephone && formik.touched.telephone
                    }
                    onChange={formik.handleChange}
                    placeholder="Téléphone"
                  />
                  {formik.touched.telephone && (
                    <InlineError
                      message={formik.errors.telephone}
                      fieldId="telephone"
                    />
                  )}
                </Field>
                <Field>
                  <Input
                    value={formik.values.telephone_portable}
                    id="telephone_portable"
                    name="telephone_portable"
                    onChange={formik.handleChange}
                    placeholder="Téléphone portable"
                  />
                </Field>

                <Field>
                  <Input
                    value={formik.values.address}
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    placeholder="Adresse"
                  />
                  <InlineError
                    message={formik.errors.address}
                    fieldId="address"
                  />
                </Field>
                <Flex justifyContent="space-between">
                  <Box mr={1} flex={1 / 2}>
                    <Field>
                      <Input
                        value={formik.values.zipcode}
                        id="zipcode"
                        name="zipcode"
                        onChange={async (e) => {
                          const { value } = e.target;
                          await formik.setFieldValue("zipcode", value);
                          await formik.setFieldValue("city", "");
                        }}
                        placeholder="Code postal"
                      />
                      <InlineError
                        message={formik.errors.zipcode}
                        fieldId="zipcode"
                      />
                    </Field>
                  </Box>
                  <Box ml={1} flex={1 / 2}>
                    <Field>
                      <GeocodeCities
                        placeholder="Ville"
                        name="city"
                        id="city"
                        zipcode={formik.values.zipcode}
                        onChange={(value) =>
                          formik.setFieldValue("city", value)
                        }
                        value={formik.values.city}
                      />
                      <InlineError
                        message={formik.errors.city}
                        fieldId="city"
                      />
                    </Field>
                  </Box>
                </Flex>
                <Field>
                  <Input
                    value={formik.values.dispo_max}
                    id="dispo_max"
                    name="dispo_max"
                    hasError={
                      formik.errors.dispo_max && formik.touched.dispo_max
                    }
                    onChange={formik.handleChange}
                    placeholder="Nombre de mesures souhaité"
                  />
                  {formik.touched.dispo_max && (
                    <InlineError
                      message={formik.errors.dispo_max}
                      fieldId="dispo_max"
                    />
                  )}
                </Field>
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
            </Box>
          </Box>
        </Flex>
      </Card>
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
