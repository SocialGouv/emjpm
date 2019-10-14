import { Button, Card, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";

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

export const SignupMandataire = props => {
  const { validateStepOne } = useContext(SignupContext);

  return (
    <Card>
      <Flex {...props}>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              validationSchema={Yup.object().shape({
                tis: Yup.string().required("Le champs obligatoire"),
                genre: Yup.string().required("Le champs obligatoire"),
                telephone: Yup.string().required("Le champs obligatoire"),
                telephone_portable: Yup.string(),
                adresse: Yup.string().required("Le champs obligatoire"),
                code_postal: Yup.string().required("Le champs obligatoire"),
                ville: Yup.string().required("Le champs obligatoire"),
                dispo_max: Yup.number("Le champs doit être en nombre").required(
                  "Le champs obligatoire"
                )
              })}
              initialValues={{
                tis: "",
                genre: "",
                telephone: "",
                telephone_portable: "",
                adresse: "",
                code_postal: "",
                ville: "",
                dispo_max: ""
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
                    <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
                      <Select
                        id="tis"
                        name="tis"
                        placeholder="Tribunaux dans lesquels vous exercez"
                        value={values.tis}
                        hasError={errors.tis && touched.tis}
                        onChange={option => setFieldValue("tis", option)}
                        options={[]}
                      />
                      {errors.tis && touched.tis && <Text>{errors.tis}</Text>}
                    </Box>
                    <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
                      <Select
                        id="genre"
                        name="genre"
                        placeholder="Genre"
                        value={values.genre}
                        hasError={errors.genre && touched.genre}
                        onChange={option => setFieldValue("genre", option)}
                        options={GENDER_OPTIONS}
                      />
                      {errors.genre && touched.genre && <Text>{errors.genre}</Text>}
                    </Box>
                    <Box mb="2">
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
                    <Box mb="2">
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
                    <Box mb="2">
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
                        <Button mr="2" variant="outline" onClick={() => validateStepOne(false)}>
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
  );
};
