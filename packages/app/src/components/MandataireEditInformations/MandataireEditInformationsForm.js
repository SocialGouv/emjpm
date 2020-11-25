import {
  Button,
  Field,
  Heading4,
  InlineError,
  Select,
  Textarea,
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { findOptions } from "../../util/option/OptionUtil";
import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "../AppForm";
import { Geocode, geocodeInitialValue } from "../Geocode";

const MandataireEditInformationsForm = (props) => {
  const {
    cancelLink,
    mandataire,
    handleSubmit,
    user,
    isAdmin = false,
    errorMessage,
  } = props;

  const { lb_user = {}, mandataire_tis = [] } = mandataire;
  const { lb_departements = [] } = lb_user || {};

  const { tiOptions } = useMemo(() => {
    const tiOptions = [];
    lb_departements.forEach((lbd) => {
      lbd.tis.forEach((ti) => {
        tiOptions.push({
          label: ti.etablissement,
          value: ti.id,
        });
      });
    });
    return { tiOptions };
  }, [lb_departements]);

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
      tis: mandataire_tis.map((mti) => mti.ti_id),
    },
    onSubmit: handleSubmit,
    validationSchema: mandataireEditSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Informations personnelles"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
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
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>{`Adresse`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Cette adresse permettra de vous localiser sur la carte des mesures`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Geocode
              resource={mandataire}
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
            />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
          </Field>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>{`Tribunaux`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Liste des tribunaux dans lesquels vous souhaitez être visible par les magistrats`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Select
              id="tis"
              name="tis"
              placeholder="Tribunaux dans lesquels vous exercez"
              value={findOptions(tiOptions, formik.values.tis)}
              hasError={formik.errors.tis && formik.touched.tis}
              onChange={(options) => {
                formik.setFieldValue(
                  "tis",
                  options.map((o) => o.value)
                );
              }}
              options={tiOptions}
              isMulti
            />
            {formik.touched.tis && (
              <InlineError message={formik.errors.tis} fieldId="tis" />
            )}
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
        </FormInputBox>
      </Flex>
      {isAdmin && (
        <Flex>
          <FormGrayBox>
            <Heading4 mb={1}>{"Administrateur"}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Information uniquement accessible par l'administrateur`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              placeholder="SIRET"
              id="siret"
              formik={formik}
              validationSchema={mandataireEditSchema}
            />
          </FormInputBox>
        </Flex>
      )}
      {errorMessage && <InlineError message={`${errorMessage}`} />}
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
