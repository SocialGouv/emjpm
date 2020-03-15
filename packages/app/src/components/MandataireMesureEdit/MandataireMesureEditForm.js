import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Field,
  Heading3,
  Heading5,
  InlineError,
  Input,
  Select
} from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { mandataireMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { EDIT_MESURE } from "./mutations";

export const MandataireMesureEditForm = props => {
  const { mesure } = props;
  const {
    departementsData,
    tribunalList,
    mesure: {
      id,
      age,
      civilite,
      dateOuverture,
      numeroRg,
      numeroDossier,
      residence,
      type,
      tribunal,
      tiId
    }
  } = props;

  const geocode = geocodeInitialValue(mesure);

  const [editMesure] = useMutation(EDIT_MESURE);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);

      if (!departement) {
        setErrors({
          code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
        });
      } else {
        await editMesure({
          awaitRefetchQueries: true,
          refetchQueries: ["mesures", "mesures_aggregate", "user_tis", "ti"],
          variables: {
            annee: values.annee,
            civilite: values.civilite.value,
            code_postal: values.geocode.postcode,
            date_ouverture: values.date_ouverture,
            department_id: departement.id,
            id,
            numero_dossier: values.numero_dossier,
            numero_rg: values.numero_rg,
            residence: values.residence.value,
            ti_id: values.tribunal.value,
            type: values.type.value,
            ville: values.geocode.city,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude
          }
        });
      }

      setSubmitting(false);
      Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${id}`, {
        shallow: true
      });
    },
    validationSchema: mandataireMesureSchema,
    initialValues: {
      annee: age,
      civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
      date_ouverture: dateOuverture,
      numero_dossier: numeroDossier,
      numero_rg: numeroRg,
      residence: { label: residence, value: residence },
      tribunal: tiId ? { label: tribunal, value: tiId } : "",
      type: { label: type, value: type },
      geocode
    }
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Modifier la mesure</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de modifier l'ensemble des informations relatives a une mesure en cours.
          `}
        </Text>
        <Text lineHeight="1.5">
          {`Les cases qui presentent une fleche sur la droite vous proposent de selectionner une valeur dans un menu deroulant, les autres cases sont des champs a remplir librement.
          `}
        </Text>
        <Text lineHeight="1.5">
          {`Cliquez sur le bouton "enregitrer" en bas a droite de la fenetre pour que vos modifications soient prises en compte.
          `}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Modifier la mesure</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Input
              value={formik.values.numero_rg}
              id="numero_rg"
              name="numero_rg"
              hasError={formik.errors.numero_rg && formik.touched.numero_rg}
              onChange={formik.handleChange}
              placeholder="numero rg"
            />
            <InlineError message={formik.errors.numero_rg} fieldId="numero_rg" />
          </Field>
          <Field>
            <Select
              id="tribunal"
              name="tribunal"
              placeholder="Tribunal"
              value={formik.values.tribunal}
              options={tribunalList}
              hasError={formik.errors.tribunal && formik.touched.tribunal}
              onChange={option => formik.setFieldValue("tribunal", option)}
            />
            <InlineError message={formik.errors.tribunal} fieldId="tribunal" />
          </Field>
          <Field>
            <Input
              value={formik.values.numero_dossier}
              id="numero_dossier"
              name="numero_dossier"
              hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
              onChange={formik.handleChange}
              placeholder="numero de dossier"
            />
            <InlineError message={formik.errors.numero_dossier} fieldId="numero_dossier" />
          </Field>
          <Field>
            <Input
              value={formik.values.date_ouverture}
              id="date_ouverture"
              type="date"
              name="date_ouverture"
              hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
              onChange={formik.handleChange}
              placeholder="Date d'ordonnance"
            />
            <InlineError message={formik.errors.date_ouverture} fieldId="date_ouverture" />
          </Field>
          <Field>
            <Select
              id="type"
              name="type"
              placeholder="Type de mesure"
              value={formik.values.type}
              hasError={formik.errors.type && formik.touched.type}
              onChange={option => formik.setFieldValue("type", option)}
              options={MESURE_TYPE_LABEL_VALUE}
            />
            <InlineError message={formik.errors.type} fieldId="type" />
          </Field>
          <Field>
            <Select
              id="civilite"
              name="civilite"
              placeholder="civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={option => formik.setFieldValue("civilite", option)}
              options={CIVILITY}
            />
            <InlineError message={formik.errors.civilite} fieldId="civilite" />
          </Field>
          <Field>
            <Input
              value={formik.values.annee}
              id="annee"
              name="annee"
              hasError={formik.errors.annee && formik.touched.annee}
              onChange={formik.handleChange}
              placeholder="année de naissance"
            />
            <InlineError message={formik.errors.annee} fieldId="annee" />
          </Field>
          <Field>
            <Select
              id="residence"
              name="residence"
              placeholder="Type de residence"
              value={formik.values.residence}
              hasError={formik.errors.residence && formik.touched.residence}
              onChange={option => formik.setFieldValue("residence", option)}
              options={RESIDENCE}
            />
            <InlineError message={formik.errors.residence} fieldId="residence" />
          </Field>

          <Field>
            <Geocode
              resource={mesure}
              onChange={geocode => formik.setFieldValue("geocode", geocode)}
            />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
          </Field>

          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(
                    "/mandataires/mesures/[mesure_id]",
                    `/mandataires/mesures/${id}`,
                    {
                      shallow: true
                    }
                  );
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Enregistrer
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

MandataireMesureEditForm.propTypes = {
  mesure: PropTypes.object.isRequired
};
