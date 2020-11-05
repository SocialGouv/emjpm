import { Button, Field, Heading4, InlineError, Textarea } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { serviceSchema } from "../../lib/validationSchemas/serviceSchema";
import { FormGrayBox, FormGroupInput, FormInputBox } from "../AppForm";
import { Geocode, geocodeInitialValue } from "../Geocode";

const ServiceEditForm = (props) => {
  const { handleSubmit, service } = props;

  const formik = useFormik({
    initialValues: {
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      geocode: geocodeInitialValue(service),
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
    },
    onSubmit: handleSubmit,
    validationSchema: serviceSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Responsable"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Nom"
            id="nom"
            formik={formik}
            validationSchema={serviceSchema}
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={serviceSchema}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Coordonnées"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={serviceSchema}
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={serviceSchema}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>{`Adresse`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Cette adresse permettra de localiser le service sur la carte des mesures`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Geocode
              resource={service}
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
            />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
          </Field>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Activité"}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Ces informations seront visibles par les magistrats.`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Nombre de mesures souhaité"
            id="dispo_max"
            formik={formik}
            validationSchema={serviceSchema}
          />
          <Box>
            <Textarea
              value={formik.values.competences}
              id="competences"
              name="competences"
              error={formik.errors.competences}
              onChange={formik.handleChange}
              label="Informations à destination du magistrat"
              placeholder="Préférences géographiques, compétences, langues parlées, ..."
            />
            <InlineError
              message={formik.errors.competences}
              fieldId="competences"
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link href="/services/informations">
            <Button variant="outline">Annuler</Button>
          </Link>
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
  );
};

export { ServiceEditForm };
