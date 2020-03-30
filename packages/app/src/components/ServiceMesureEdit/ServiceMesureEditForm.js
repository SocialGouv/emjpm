import { useMutation } from "@apollo/react-hooks";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { CIVILITY, COUNTRIES, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { formatAntenneOptions } from "../../util/services";
import { Geocode, geocodeInitialValue } from "../Geocode";
import { EDIT_MESURE, UPDATE_ANTENNE_COUTERS } from "../ServiceMesures/mutations";
import TribunalAutoComplete from "../TribunalAutoComplete";

export const ServiceMesureEditForm = props => {
  const {
    mesure: {
      age,
      antenneId,
      civilite,
      dateOuverture,
      id,
      numeroRg,
      numeroDossier,
      residence,
      type,
      tribunal,
      tiId,
      pays,
      cabinet
    },
    departementsData,
    tribunalList,
    service_antennes
  } = props;

  const geocode = geocodeInitialValue(props.mesure);

  const [editMesure] = useMutation(EDIT_MESURE);
  const [updateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);

  const antenneOptions = formatAntenneOptions(service_antennes);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const variables = {};

      if (values.country.value === "FR") {
        const regionCode = getRegionCode(values.geocode.postcode);
        const departements = departementsData.departements;
        const departement = departements.find(dep => dep.code === regionCode);

        if (!departement) {
          setErrors({
            codePostal: `Aucun département trouvé pour le code postal ${values.geocode.postcode}`
          });

          return setSubmitting(false);
        } else {
          variables.department_id = departement.id;
          variables.code_postal = values.geocode.postcode;
          variables.ville = values.geocode.city;
          variables.latitude = values.geocode.latitude;
          variables.longitude = values.geocode.longitude;
        }
      }

      await editMesure({
        awaitRefetchQueries: true,
        variables: {
          ...variables,
          annee: values.annee,
          antenne_id: values.antenne_id ? values.antenne_id.value : null,
          civilite: values.civilite.value,
          date_ouverture: values.date_ouverture,
          id: id,
          numero_dossier: values.numero_dossier,
          numero_rg: values.numero_rg,
          residence: values.residence.value,
          ti_id: values.tribunal.value,
          type: values.type.value,
          pays: values.country.value,
          cabinet: values.cabinet
        }
      });

      if (values.antenne_id) {
        await updateAntenneCounters({
          variables: {
            antenne_id: values.antenne_id.value,
            inc_mesures_awaiting: 0,
            inc_mesures_in_progress: 1
          }
        });
      }

      if (antenneId) {
        await updateAntenneCounters({
          variables: {
            antenne_id: antenneId,
            inc_mesures_awaiting: 0,
            inc_mesures_in_progress: -1
          }
        });
      }

      setSubmitting(false);
      Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
        shallow: true
      });
    },
    validationSchema: serviceMesureSchema,
    initialValues: {
      annee: age,
      antenne_id: antenneId ? antenneOptions.find(o => o.value === antenneId) : null,
      civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
      date_ouverture: dateOuverture,
      numero_dossier: numeroDossier,
      numero_rg: numeroRg,
      residence: { label: residence, value: residence },
      tribunal: { label: tribunal, value: tiId },
      type: { label: type, value: type },
      geocode,
      country: { value: pays, label: COUNTRIES[pays] },
      address: geocode.label,
      cabinet
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
              placeholder="Numéro RG"
            />
          </Field>
          <Field>
            <TribunalAutoComplete
              id="tribunal"
              value={formik.values.tribunal}
              name="tribunal"
              hasError={formik.errors.tribunal && formik.touched.tribunal}
              onChange={option => formik.setFieldValue("tribunal", option)}
              defaultOptions={tribunalList}
            />
            <InlineError message={formik.errors.tribunal} fieldId="tribunal" />
          </Field>
          <Field>
            <Input
              value={formik.values.cabinet}
              id="cabinet"
              name="cabinet"
              hasError={formik.errors.cabinet && formik.touched.cabinet}
              onChange={formik.handleChange}
              placeholder="Cabinet -"
            />
            <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
          </Field>
          <Field>
            <Input
              value={formik.values.numero_dossier}
              id="numero_dossier"
              name="numero_dossier"
              hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
              onChange={formik.handleChange}
              placeholder="Numéro de dossier"
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
          {service_antennes.length >= 2 && (
            <Field>
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={option => formik.setFieldValue("antenne_id", option)}
                options={antenneOptions}
              />
              <InlineError message={formik.errors.antenne_id} fieldId="antenne_id" />
            </Field>
          )}
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
              placeholder="Année de naissance"
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
            <Select
              id="country"
              name="country"
              placeholder="Pays"
              value={formik.values.country}
              hasError={formik.errors.country && formik.touched.country}
              onChange={option => formik.setFieldValue("country", option)}
              options={[
                {
                  label: "France",
                  value: "FR"
                },
                {
                  label: "Belgique",
                  value: "BE"
                }
              ]}
            />
            {formik.errors.country && formik.touched.country && (
              <Text>{formik.errors.country}</Text>
            )}
          </Field>
          {formik.values.country && formik.values.country.value === "FR" && (
            <Field>
              <Geocode
                resource={props.mesure}
                onChange={async geocode => {
                  await formik.setFieldValue("geocode", geocode);
                  await formik.setFieldValue("address", geocode ? geocode.label : "");
                }}
              />
              <InlineError message={formik.errors.address} fieldId="address" />
            </Field>
          )}

          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
                    shallow: true
                  });
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
