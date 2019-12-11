import { Button, Card, Heading1, Heading4, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext, useState } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { getRegionCode } from "../../util/departements";
import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

const SignupServiceForm = ({ departementDatas, serviceDatas }) => {
  const { user, service, setService, validateStepOne } = useContext(SignupContext);

  const [serviceOptions, setServiceOptions] = useState([]);

  const departementOptions = departementDatas.map(departement => ({
    label: departement.nom,
    value: departement.id
  }));

  const selectDepartement = option => {
    const selectedDepartement = departementDatas.find(data => data.id === option.value);
    const departementalServices = serviceDatas.filter(data => {
      const regionCode = getRegionCode(data.code_postal);
      return regionCode === selectedDepartement.code;
    });
    setServiceOptions(
      departementalServices.map(data => ({
        label: data.etablissement,
        value: data.id
      }))
    );
  };

  return (
    <Fragment>
      <Heading1 px="1">{`Création d'un compte de service mandataire`}</Heading1>
      <Card sx={cardStyle}>
        <Flex mt="3">
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px" pt={1}>
              <Heading4>{`Votre service`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Sélectionnez le département dans lequel se situe le siège social du service mandataire pour lequel vous travaillez.`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <Formik
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  const body = {
                    service: {
                      service_id: values.service.value
                    },
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
                }}
                validationSchema={Yup.object().shape({
                  departement: Yup.mixed().required("Champ obligatoire"),
                  service: Yup.mixed().required("Champ obligatoire")
                })}
                initialValues={{
                  departement: service ? service.departement : null,
                  service: service ? service.service : null
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
                      <SignupGeneralError errors={props.errors} />
                      <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
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
                      <Box sx={{ position: "relative", zIndex: "90" }} mb="2">
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
                          <Button
                            mr="2"
                            variant="outline"
                            onClick={() => {
                              setService(values);
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

const SignupService = props => (
  <SignupDatas {...props} Component={props => <SignupServiceForm {...props} />} />
);

export { SignupService };
