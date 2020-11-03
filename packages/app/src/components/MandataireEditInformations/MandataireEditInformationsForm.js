import { Button, Heading4, InlineError, Textarea } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Card, Flex } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { FormGroupInput, FormGroupSelect } from "../AppForm";
import { Link } from "../Commons";
import { GeocodeCities } from "../Geocode";

const MandataireEditInformationsForm = (props) => {
  const { cancelLink, mandataire, handleSubmit, user } = props;

  const formik = useFormik({
    initialValues: {
      address: mandataire.adresse || "",
      city: mandataire.ville || "",
      competences: mandataire.competences || "",
      dispo_max: mandataire.dispo_max || "",
      email: user.email || "",
      genre: mandataire.genre,
      nom: user.nom || "",
      prenom: user.prenom || "",
      siret: mandataire.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      zipcode: mandataire.code_postal || "",
    },
    onSubmit: handleSubmit,
    validationSchema: mandataireEditSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <Card p={1} m={1} flex={1 / 2}>
          <Heading4 mb={1}>{"Personne physique"}</Heading4>
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
        <Card p={1} m={1} flex={1 / 2}>
          <Heading4 mb={1}>{"Personne morale"}</Heading4>
          <FormGroupInput
            placeholder="SIRET"
            id="siret"
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
          <FormGroupInput
            placeholder="Adresse"
            id="address"
            formik={formik}
            validationSchema={mandataireEditSchema}
          />
          <Flex justifyContent="space-between">
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="zipcode"
                formik={formik}
                validationSchema={mandataireEditSchema}
                onChange={async (e) => {
                  const { value } = e.target;
                  await formik.setFieldValue("zipcode", value);
                  await formik.setFieldValue("city", "");
                }}
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <GeocodeCities
                name="city"
                id="city"
                zipcode={formik.values.zipcode}
                onChange={(value) => formik.setFieldValue("city", value)}
                value={formik.values.city}
                hasError={!!formik.errors.city}
              />
              <InlineError message={formik.errors.city} fieldId="city" />
            </Box>
          </Flex>
        </Card>
      </Flex>
      <Card p={1} m={1}>
        <Heading4 mb={1}>{"Coordonnées"}</Heading4>
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
      <Card p={1} m={1}>
        <Heading4 mb={1}>{"Votre activité"}</Heading4>
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
      <Flex alignItems="center" justifyContent="center">
        <Box mr="2">
          <Link href={cancelLink}>Annuler</Link>
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
