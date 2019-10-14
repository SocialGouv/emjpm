import { Button, Card, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";
import { MAGISTRAT_CABINET_LABEL_VALUE } from "../../constants/magistrat";

export const SignupDirection = props => {
  const { validateStepOne } = useContext(SignupContext);

  return (
    <Card>
      <Flex {...props}>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              validationSchema={Yup.object().shape({
                cabinet: Yup.string().required("Le champs obligatoire")
              })}
              initialValues={{
                cabinet: ""
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
                        id="cabinet"
                        name="cabinet"
                        placeholder="Cabinet"
                        value={values.cabinet}
                        hasError={errors.cabinet && touched.cabinet}
                        onChange={option => setFieldValue("cabinet", option)}
                        options={MAGISTRAT_CABINET_LABEL_VALUE}
                      />
                      {errors.cabinet && touched.cabinet && <Text>{errors.cabinet}</Text>}
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
