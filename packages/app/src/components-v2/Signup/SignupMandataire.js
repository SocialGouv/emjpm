import { useApolloClient } from "@apollo/react-hooks";
import { Button, Card, Heading1, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { getRegionCode } from "../../util/departements";
import { SignupContext } from "./context";
import { CHECK_SIRET_UNICITY } from "./queries";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

const GENDER_OPTIONS = [
  {
    label: "Femme",
    value: "F"
  },
  {
    label: "Homme",
    value: "H"
  }
];

const SignupMandataireForm = ({ tiDatas, departementDatas }) => {
  const { user, mandataire, setMandataire, validateStepOne } = useContext(SignupContext);

  const tiOptions = tiDatas.map(ti => ({
    label: ti.etablissement,
    value: ti.id
  }));

  const client = useApolloClient();

  const isSiretExists = async siret => {
    const checkSiret = await client.query({
      context: {
        headers: {
          "X-Hasura-Siret": siret
        }
      },
      fetchPolicy: "network-only",
      query: CHECK_SIRET_UNICITY,
      variables: {
        siret
      }
    });
    return checkSiret.data.mandataires.length > 0;
  };

  return (
    <Fragment>
      <Heading1 px="1">
        {user.type === "individuel"
          ? `Création d'un compte de mandataire individuel`
          : `Création d'un compte de mandataire préposé d'établissement`}
      </Heading1>
      <Card sx={cardStyle}>
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
              <Formik
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const regionCode = getRegionCode(values.code_postal);
                  const department = departementDatas.find(data => data.code === regionCode);
                  if (!department) {
                    setErrors({
                      code_postal: "Merci de renseigner un code postal valide"
                    });
                  } else if (await isSiretExists(values.siret)) {
                    setErrors({
                      siret: "Ce SIRET existe déjà"
                    });
                  } else {
                    const body = {
                      mandataire: {
                        adresse: values.adresse,
                        code_postal: values.code_postal,
                        department_id: department.id,
                        dispo_max: parseInt(values.dispo_max),
                        etablissement: "",
                        genre: values.genre.value,
                        siret: values.siret,
                        telephone: values.telephone,
                        telephone_portable: values.telephone_portable,
                        ville: values.ville
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
                }}
                validationSchema={Yup.object().shape({
                  adresse: Yup.string().required("Champ obligatoire"),
                  code_postal: Yup.string().required("Champ obligatoire"),
                  dispo_max: Yup.number("Le champs doit être en nombre").required(
                    "Champ obligatoire"
                  ),
                  genre: Yup.string().required("Champ obligatoire"),
                  siret: Yup.string()
                    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
                    .required("Champ obligatoire"),
                  telephone: Yup.string().required("Champ obligatoire"),
                  telephone_portable: Yup.string(),
                  tis: Yup.mixed().required("Champ obligatoire"),
                  ville: Yup.string().required("Champ obligatoire")
                })}
                initialValues={{
                  adresse: mandataire ? mandataire.adresse : "",
                  code_postal: mandataire ? mandataire.code_postal : "",
                  dispo_max: mandataire ? mandataire.dispo_max : "",
                  genre: mandataire ? mandataire.genre : "",
                  siret: mandataire ? mandataire.siret : "",
                  telephone: mandataire ? mandataire.telephone : "",
                  telephone_portable: mandataire ? mandataire.telephone_portable : "",
                  tis: mandataire ? mandataire.tis : "",
                  ville: mandataire ? mandataire.ville : ""
                }}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <SignupGeneralError errors={props.errors} />
                      <Box sx={{ position: "relative", zIndex: "110" }} mb="2">
                        <Select
                          id="tis"
                          name="tis"
                          placeholder="Tribunaux dans lesquels vous exercez"
                          value={values.tis}
                          hasError={errors.tis && touched.tis}
                          onChange={option => setFieldValue("tis", option)}
                          options={tiOptions}
                          isMulti
                        />
                        {errors.tis && touched.tis && <Text>{errors.tis}</Text>}
                      </Box>
                      <Box sx={{ position: "relative", zIndex: "100" }} mb="2" pt="2">
                        <Select
                          id="genre"
                          name="genre"
                          placeholder="Titre de civilité"
                          value={values.genre}
                          hasError={errors.genre && touched.genre}
                          onChange={option => setFieldValue("genre", option)}
                          options={GENDER_OPTIONS}
                        />
                        {errors.genre && touched.genre && <Text>{errors.genre}</Text>}
                      </Box>
                      <Box mb="2" pt="2">
                        <Input
                          value={values.siret}
                          id="siret"
                          name="siret"
                          hasError={errors.siret && touched.siret}
                          onChange={handleChange}
                          placeholder="SIRET"
                        />
                        {errors.siret && touched.siret && <Text>{errors.siret}</Text>}
                      </Box>
                      <Box mb="2" pt="2">
                        <Input
                          value={values.telephone}
                          id="telephone"
                          name="telephone"
                          hasError={errors.telephone && touched.telephone}
                          onChange={handleChange}
                          placeholder="Téléphone"
                        />
                        {errors.telephone && touched.telephone && <Text>{errors.telephone}</Text>}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.telephone_portable}
                          id="telephone_portable"
                          name="telephone_portable"
                          onChange={handleChange}
                          placeholder="Téléphone portable"
                        />
                      </Box>
                      <Box mb="2" pt="2">
                        <Input
                          value={values.adresse}
                          id="adresse"
                          name="adresse"
                          hasError={errors.adresse && touched.adresse}
                          onChange={handleChange}
                          placeholder="Adresse"
                        />
                        {errors.adresse && touched.adresse && <Text>{errors.adresse}</Text>}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.code_postal}
                          id="code_postal"
                          name="code_postal"
                          hasError={errors.code_postal && touched.code_postal}
                          onChange={handleChange}
                          placeholder="Code postal"
                        />
                        {errors.code_postal && touched.code_postal && (
                          <Text>{errors.code_postal}</Text>
                        )}
                      </Box>
                      <Box mb="2">
                        <Input
                          value={values.ville}
                          id="ville"
                          name="ville"
                          hasError={errors.ville && touched.ville}
                          onChange={handleChange}
                          placeholder="Ville"
                        />
                        {errors.ville && touched.ville && <Text>{errors.ville}</Text>}
                      </Box>
                      <Box mb="2" pt="2">
                        <Input
                          value={values.dispo_max}
                          id="dispo_max"
                          name="dispo_max"
                          hasError={errors.dispo_max && touched.dispo_max}
                          onChange={handleChange}
                          placeholder="Nombre de mesures souhaité"
                        />
                        {errors.dispo_max && touched.dispo_max && <Text>{errors.dispo_max}</Text>}
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
                              setMandataire(values);
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

const SignupMandataire = props => (
  <SignupDatas {...props} Component={props => <SignupMandataireForm {...props} />} />
);

export { SignupMandataire };
