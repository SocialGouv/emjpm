import { Heading1, Heading4, Button, Card, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { grayBox, cardStyle } from "./style";

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
    value: ti.id,
    label: ti.etablissement
  }));

  return (
    <Card sx={cardStyle}>
      <Flex flexDirection="column">
        <Box pl={5} pb={3}>
          <Heading1>
            {user.type === "individuel"
              ? `Création d'un compte de mandataire individuel`
              : `Création d'un compte de mandataire préposé d'établissement`}
          </Heading1>
        </Box>
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
            <Box height="140px">
              <Heading4>{`Numéro de téléphone professionel`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                Vos numéros de téléphone profesionnels fixe et portable
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
            <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
              <Formik
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const department_id = departementDatas.find(
                    data => data.code === values.code_postal.substring(0, 2)
                  ).id;
                  if (!department_id) {
                    setErrors({
                      code_postal: "Merci de renseigner un code postal valide"
                    });
                    setSubmitting(false);
                  } else {
                    const body = {
                      mandataire: {
                        adresse: values.adresse,
                        code_postal: values.code_postal,
                        genre: values.genre.value,
                        telephone: values.telephone,
                        telephone_portable: values.telephone_portable,
                        ville: values.ville,
                        department_id,
                        etablissement: "",
                        dispo_max: parseInt(values.dispo_max)
                      },
                      user: {
                        username: user.email,
                        ...user
                      },
                      tis: values.tis.map(ti => ti.value)
                    };
                    signup({
                      body,
                      onSuccess: () => Router.push("/signup/congratulation"),
                      onError: errors => setErrors(errors),
                      onComplete: () => setSubmitting(false)
                    });
                  }
                }}
                validationSchema={Yup.object().shape({
                  tis: Yup.mixed().required("Champs obligatoire"),
                  genre: Yup.string().required("Champs obligatoire"),
                  telephone: Yup.string().required("Champs obligatoire"),
                  telephone_portable: Yup.string(),
                  adresse: Yup.string().required("Champs obligatoire"),
                  code_postal: Yup.string().required("Champs obligatoire"),
                  ville: Yup.string().required("Champs obligatoire"),
                  dispo_max: Yup.number("Le champs doit être en nombre").required(
                    "Champs obligatoire"
                  )
                })}
                initialValues={{
                  tis: mandataire ? mandataire.tis : "",
                  genre: mandataire ? mandataire.genre : "",
                  telephone: mandataire ? mandataire.telephone : "",
                  telephone_portable: mandataire ? mandataire.telephone_portable : "",
                  adresse: mandataire ? mandataire.adresse : "",
                  code_postal: mandataire ? mandataire.code_postal : "",
                  ville: mandataire ? mandataire.ville : "",
                  dispo_max: mandataire ? mandataire.dispo_max : ""
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
                      <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
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
                      <Box sx={{ zIndex: "100", position: "relative" }} mb="2" pt="2">
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
      </Flex>
    </Card>
  );
};

const SignupMandataire = props => (
  <SignupDatas {...props} Component={props => <SignupMandataireForm {...props} />} />
);

export { SignupMandataire };
