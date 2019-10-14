import { Button, Card, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";

export const SignupService = props => {
  const { validateStepOne } = useContext(SignupContext);

  return (
    <Card>
      <Flex {...props}>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              validationSchema={Yup.object().shape({
                region: Yup.string().required("Le champs obligatoire"),
                departement: Yup.string().required("Le champs obligatoire"),
                service: Yup.string().required("Le champs obligatoire")
              })}
              initialValues={{
                region: "",
                departement: "",
                service: ""
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleSubmit,
                  setFieldValue
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ zIndex: "110", position: "relative" }} mb="2">
                      <Select
                        id="region"
                        name="region"
                        placeholder="Région de votre service"
                        value={values.region}
                        hasError={errors.region && touched.region}
                        onChange={option => setFieldValue("region", option)}
                        options={[]}
                      />
                      {errors.region && touched.region && <Text>{errors.region}</Text>}
                    </Box>
                    <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
                      <Select
                        id="departement"
                        name="departement"
                        placeholder="Département de votre service"
                        value={values.departement}
                        hasError={errors.departement && touched.departement}
                        onChange={option => setFieldValue("departement", option)}
                        options={[]}
                      />
                      {errors.departement && touched.departement && (
                        <Text>{errors.departement}</Text>
                      )}
                    </Box>
                    <Box sx={{ zIndex: "90", position: "relative" }} mb="2">
                      <Select
                        id="service"
                        name="service"
                        placeholder="Votre service"
                        value={values.service}
                        hasError={errors.service && touched.service}
                        onChange={option => setFieldValue("service", option)}
                        options={[]}
                      />
                      {errors.service && touched.service && <Text>{errors.service}</Text>}
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
