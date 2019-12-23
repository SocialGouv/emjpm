import { useApolloClient } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Field,
  Heading1,
  Heading4,
  Input,
  Select,
  Text
} from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireSignupSchema } from "../../lib/validationSchemas";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { findDepartement } from "../../util/departements/DepartementUtil";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { grayBox } from "./style";

const SignupMandataireForm = ({ tiDatas, departementDatas }) => {
  const { user, mandataire, setMandataire, validateStepOne } = useContext(SignupContext);

  const tiOptions = tiDatas.map(ti => ({
    label: ti.etablissement,
    value: ti.id
  }));

  const client = useApolloClient();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const department = findDepartement(values.geocode.postcode, departementDatas);

      if (!department) {
        setErrors({ code_postal: "Merci de renseigner un code postal valide" });
      } else if (await isSiretExists(client, values.siret)) {
        setErrors({ siret: "Ce SIRET existe déjà" });
      } else {
        const body = {
          mandataire: {
            adresse: values.geocode.label,
            code_postal: values.geocode.postcode,
            department_id: department.id,
            dispo_max: parseInt(values.dispo_max),
            etablissement: "",
            genre: values.genre.value,
            siret: values.siret,
            telephone: values.telephone,
            telephone_portable: values.telephone_portable,
            ville: values.geocode.city,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude
          },
          tis: values.tis.map(ti => ti.value),
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
      }
      setSubmitting(false);
    },
    validationSchema: mandataireSignupSchema,
    initialValues: {
      adresse: mandataire ? mandataire.adresse : "",
      dispo_max: mandataire ? mandataire.dispo_max : "",
      genre: mandataire ? mandataire.genre : "",
      geocode: geocodeInitialValue(),
      siret: mandataire ? mandataire.siret : "",
      telephone: mandataire ? mandataire.telephone : "",
      telephone_portable: mandataire ? mandataire.telephone_portable : "",
      tis: mandataire ? mandataire.tis : ""
    }
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
                    onChange={option => formik.setFieldValue("tis", option)}
                    options={tiOptions}
                    isMulti
                  />
                  {formik.errors.tis && formik.touched.tis && <Text>{formik.errors.tis}</Text>}
                </Field>
                <Field>
                  <Select
                    id="genre"
                    name="genre"
                    placeholder="Titre de civilité"
                    value={formik.values.genre}
                    hasError={formik.errors.genre && formik.touched.genre}
                    onChange={option => formik.setFieldValue("genre", option)}
                    options={GENDER_OPTIONS}
                  />
                  {formik.errors.genre && formik.touched.genre && (
                    <Text>{formik.errors.genre}</Text>
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
                  {formik.errors.siret && formik.touched.siret && (
                    <Text>{formik.errors.siret}</Text>
                  )}
                </Field>
                <Field>
                  <Input
                    value={formik.values.telephone}
                    id="telephone"
                    name="telephone"
                    hasError={formik.errors.telephone && formik.touched.telephone}
                    onChange={formik.handleChange}
                    placeholder="Téléphone"
                  />
                  {formik.errors.telephone && formik.touched.telephone && (
                    <Text>{formik.errors.telephone}</Text>
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
                  <Geocode onChange={geocode => formik.setFieldValue("geocode", geocode)} />
                  {formik.errors.geocode && formik.touched.geocode && (
                    <Text>{formik.errors.geocode}</Text>
                  )}
                </Field>
                <Field>
                  <Input
                    value={formik.values.dispo_max}
                    id="dispo_max"
                    name="dispo_max"
                    hasError={formik.errors.dispo_max && formik.touched.dispo_max}
                    onChange={formik.handleChange}
                    placeholder="Nombre de mesures souhaité"
                  />
                  {formik.errors.dispo_max && formik.touched.dispo_max && (
                    <Text>{formik.errors.dispo_max}</Text>
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
                        // TODO: ask help
                        setMandataire(formik.values);
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
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};

const SignupMandataire = props => (
  <SignupDatas {...props} Component={props => <SignupMandataireForm {...props} />} />
);

export { SignupMandataire };
