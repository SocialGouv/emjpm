import { Button, Card, Heading4, Input, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { cardStyle } from "./style";

const AdminTribunalFormStyle = {
  flexWrap: "wrap"
};

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

export const AdminTribunalForm = ({ tribunal, onSubmit, onCancel }) => {
  return (
    <Card sx={cardStyle} width="100%">
      <Flex sx={AdminTribunalFormStyle}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="230px">
            <Heading4>{`Information du tribunal`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives au tribunal`}
            </Text>
          </Box>
          <Box height="150px">
            <Heading4>{`Contact du tribunal`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Contact du tribunal
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box mb="2">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                code_postal: Yup.string().required("Champ obligatoire"),
                email: Yup.string().email("Le format de votre email n'est pas correct"),
                etablissement: Yup.string().required("Champ obligatoire"),
                siret: Yup.string().required("Champ obligatoire"),
                telephone: Yup.string(),
                ville: Yup.string().required("Champ obligatoire")
              })}
              initialValues={{
                code_postal: tribunal ? tribunal.code_postal : "",
                email: tribunal && tribunal.email ? tribunal.email : "",
                etablissement: tribunal ? tribunal.etablissement : "",
                siret: tribunal && tribunal.siret ? tribunal.siret : "",
                telephone: tribunal && tribunal.telephone ? tribunal.telephone : "",
                ville: tribunal ? tribunal.ville : ""
              }}
            >
              {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box mb="2">
                      <Input
                        value={values.etablissement}
                        id="etablissement"
                        name="etablissement"
                        hasError={errors.etablissement && touched.etablissement}
                        onChange={handleChange}
                        placeholder="Nom du tribunal"
                      />
                      {errors.etablissement && touched.etablissement && (
                        <Text>{errors.etablissement}</Text>
                      )}
                    </Box>
                    <Box mb="2">
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
                    <Box mb="2" mt="5">
                      <Input
                        value={values.email}
                        id="email"
                        name="email"
                        hasError={errors.email && touched.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      {errors.email && touched.email && <Text>{errors.email}</Text>}
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
                    <Flex justifyContent="flex-end">
                      <Box>
                        <Button mr="2" variant="outline" onClick={onCancel}>
                          Annuler
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
