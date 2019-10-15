import { Button, Card, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";
import { SignupContext } from "./context";
import { SignupDatas } from "./SignupDatas";

const SignupServiceForm = ({ tiDatas, departementDatas, serviceDatas }) => {
  const { validateStepOne } = useContext(SignupContext);

  const [serviceOptions, setServiceOptions] = useState([]);

  const tiOptions = tiDatas.map(ti => ({
    value: ti.id,
    label: ti.etablissement
  }));

  const departementOptions = departementDatas.map(departement => ({
    value: departement.id,
    label: departement.nom
  }));

  const selectDepartement = option => {
    const selectedDepartement = departementDatas.find(data => data.id === option.value);
    const departementalServices = serviceDatas.filter(data => {
      const code = data.code_postal.substring(0, 2);
      return code === selectedDepartement.code;
    });
    setServiceOptions(
      departementalServices.map(data => ({
        value: data.id,
        label: data.etablissement
      }))
    );
  };

  return (
    <Card>
      <Flex>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
            <Formik
              validationSchema={Yup.object().shape({
                tis: Yup.mixed().required("Le champs obligatoire"),
                departement: Yup.mixed().required("Le champs obligatoire"),
                service: Yup.mixed().required("Le champs obligatoire")
              })}
              initialValues={{
                tis: null,
                departement: null,
                service: null
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
                    <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
                      <Select
                        id="departement"
                        name="departement"
                        placeholder="Département de votre service"
                        value={values.departement}
                        hasError={errors.departement && touched.departement}
                        onChange={option => {
                          selectDepartement(option);
                          setFieldValue("departement", option);
                        }}
                        options={departementOptions}
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
                        options={serviceOptions}
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

const SignupService = props => (
  <SignupDatas {...props} Component={props => <SignupServiceForm {...props} />} />
);

export { SignupService };
