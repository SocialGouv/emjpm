import { Button, Field, Heading4, InlineError, Textarea } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Card, Flex, Text } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { FormGroupInput, FormGroupSelect } from "../AppForm";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { grayBox } from "./style";

const MandataireEditInformationsForm = (props) => {
  const { cancelLink, mandataire, handleSubmit, user } = props;

  const formik = useFormik({
    initialValues: {
      competences: mandataire.competences || "",
      dispo_max: mandataire.dispo_max || "",
      email: user.email || "",
      genre: mandataire.genre,
      geocode: geocodeInitialValue(mandataire),
      nom: user.nom || "",
      prenom: user.prenom || "",
      siret: mandataire.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
    },
    onSubmit: handleSubmit,
    validationSchema: mandataireEditSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <Box sx={grayBox} width={[1, 2 / 5]}>
          <Heading4 mb={1}>{"Informations personnelles"}</Heading4>
        </Box>
        <Card width={[1, 3 / 5]}>
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Genre"
            value={formik.values.genre}
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
          <FormGroupInput
            placeholder="Nom"
            id="nom"
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
        </Card>
      </Flex>
      <Flex>
        <Box sx={grayBox} width={[1, 2 / 5]}>
          <Heading4 mb={1}>{"Coordonnées"}</Heading4>
        </Box>
        <Card width={[1, 3 / 5]}>
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
          <Flex justifyContent="space-between">
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Téléphone"
                id="telephone"
                formik={formik}
                validationSchema={mandataireEditSchema}
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Téléphone portable"
                id="telephone_portable"
                formik={formik}
                validationSchema={mandataireEditSchema}
              />
            </Box>
          </Flex>
        </Card>
      </Flex>
      <Flex>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Heading4>{`Adresse`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Cette adresse permettra de vous localiser sur la carte des mesures`}
          </Text>
        </Box>
        <Card width={[1, 3 / 5]}>
          <Field>
            <Geocode
              resource={mandataire}
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
            />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
          </Field>
        </Card>
      </Flex>
      <Flex>
        <Box sx={grayBox} width={[1, 2 / 5]}>
          <Heading4 mb={1}>{"Activité"}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Ces informations seront visibles par les magistrats.`}
          </Text>
        </Box>
        <Card width={[1, 3 / 5]}>
          <FormGroupInput
            placeholder="Nombre de mesures souhaité"
            id="dispo_max"
            formik={formik}
            validationSchema={mandataireEditSchema}
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
        </Card>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link href={cancelLink}>
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

export { MandataireEditInformationsForm };
