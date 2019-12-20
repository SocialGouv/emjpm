import { useMutation } from "@apollo/react-hooks";
import { AsyncSelect, Button, Heading3, Heading5, Input, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { debouncedGeocode } from "../../util/geocode";
import { formatAntenneOptions } from "../../util/services";
import { EDIT_MESURE, UPDATE_ANTENNE_COUTERS } from "../ServiceMesures/mutations";

export const ServiceMesureEditForm = props => {
  const {
    mesure: {
      age,
      antenneId,
      civilite,
      codePostal,
      dateOuverture,
      numeroRg,
      numeroDossier,
      residence,
      type,
      ville,
      tribunal,
      tiId,
      latitude,
      longitude
    },
    departementsData,
    mesureId,
    tribunalList,
    user_antennes
  } = props;

  const geocode = {
    city: ville,
    postcode: codePostal,
    lat: latitude,
    lng: longitude
  };

  const [editMesure] = useMutation(EDIT_MESURE);
  const [updateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS, {
    onCompleted: () => Router.push(`/services/mesures/${mesureId}`)
  });

  const ANTENNE_OPTIONS = formatAntenneOptions(user_antennes);

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);
      if (!departement) {
        setErrors({
          codePostal: `Aucun département trouvé pour le code postal ${values.geocode.postcode}`
        });
      } else {
        editMesure({
          awaitRefetchQueries: true,
          variables: {
            annee: values.annee,
            antenne_id: values.antenne_id ? values.antenne_id.value : null,
            civilite: values.civilite.value,
            code_postal: values.geocode.postcode,
            date_ouverture: values.date_ouverture,
            department_id: departement.id,
            id: mesureId,
            numero_dossier: values.numero_dossier,
            numero_rg: values.numero_rg,
            residence: values.residence.value,
            ti_id: values.tribunal.value,
            type: values.type.value,
            ville: values.geocode.city,
            latitude: values.geocode.lat,
            longitude: values.geocode.lng
          }
        });

        if (values.antenne_id) {
          updateAntenneCounters({
            variables: {
              antenne_id: values.antenne_id.value,
              inc_mesures_awaiting: 0,
              inc_mesures_in_progress: 1
            }
          });
        }

        if (antenneId) {
          updateAntenneCounters({
            variables: {
              antenne_id: antenneId,
              inc_mesures_awaiting: 0,
              inc_mesures_in_progress: -1
            }
          });
        }
      }

      setSubmitting(false);
    },
    validationSchema: serviceMesureSchema,
    initialValues: {
      annee: age,
      antenne_id: antenneId ? ANTENNE_OPTIONS.find(o => o.value === antenneId) : null,
      civilite: { label: civilite === "F" ? "Femme" : "Homme", value: civilite },
      date_ouverture: dateOuverture,
      numero_dossier: numeroDossier,
      numero_rg: numeroRg,
      residence: { label: residence, value: residence },
      tribunal: { label: tribunal, value: tiId },
      type: { label: type, value: type },
      geocode: {
        city: ville,
        postcode: codePostal,
        lat: latitude,
        lng: longitude
      }
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
          <Box sx={{ position: "relative", zIndex: "10" }} mb="2">
            <Input
              value={formik.values.numero_rg}
              id="numero_rg"
              name="numero_rg"
              hasError={formik.errors.numero_rg && formik.touched.numero_rg}
              onChange={formik.handleChange}
              placeholder="numero rg"
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "9" }} mb="2">
            <Select
              id="tribunal"
              name="tribunal"
              placeholder="Tribunal"
              value={formik.values.tribunal}
              options={tribunalList}
              hasError={formik.errors.tribunal && formik.touched.tribunal}
              onChange={option => formik.setFieldValue("tribunal", option)}
            />
            {formik.errors.tribunal && formik.touched.tribunal && (
              <Text>{formik.errors.tribunal}</Text>
            )}
          </Box>
          <Box sx={{ position: "relative", zIndex: "8" }} mb="2">
            <Input
              value={formik.values.numero_dossier}
              id="numero_dossier"
              name="numero_dossier"
              hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
              onChange={formik.handleChange}
              placeholder="numero de dossier"
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "7" }} mb="2">
            <Input
              value={formik.values.date_ouverture}
              id="date_ouverture"
              type="date"
              name="date_ouverture"
              hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
              onChange={formik.handleChange}
              placeholder="Date d'ouverture"
            />
          </Box>
          {user_antennes.length >= 2 && (
            <Box sx={{ position: "relative", zIndex: "6" }} mb="2">
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={option => formik.setFieldValue("antenne_id", option)}
                options={ANTENNE_OPTIONS}
              />
            </Box>
          )}
          <Box sx={{ position: "relative", zIndex: "5" }} mb="2">
            <Select
              id="type"
              name="type"
              placeholder="Type de mesure"
              value={formik.values.type}
              hasError={formik.errors.type && formik.touched.type}
              onChange={option => formik.setFieldValue("type", option)}
              options={MESURE_TYPE_LABEL_VALUE}
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "4" }} mb="2">
            <Select
              id="civilite"
              name="civilite"
              placeholder="civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={option => formik.setFieldValue("civilite", option)}
              options={CIVILITY}
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "3" }} mb="2">
            <Input
              value={formik.values.annee}
              id="annee"
              name="annee"
              hasError={formik.errors.annee && formik.touched.annee}
              onChange={formik.handleChange}
              placeholder="année"
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "2" }} mb="2">
            <Select
              id="residence"
              name="residence"
              placeholder="Type de residence"
              value={formik.values.residence}
              hasError={formik.errors.residence && formik.touched.residence}
              onChange={option => formik.setFieldValue("residence", option)}
              options={RESIDENCE}
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <AsyncSelect
              name="geocode"
              cacheOptions
              defaultValue={{ value: geocode, label: geocode.city }}
              hasError={formik.errors.geocode && formik.touched.geocode}
              isClearable
              loadOptions={debouncedGeocode}
              placeholder="Ville, code postal, ..."
              noOptionsMessage={() => "Pas de résultats"}
              onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
            />
            {formik.errors.geocode && formik.touched.geocode && (
              <Text>{formik.errors.geocode}</Text>
            )}
            {formik.errors.code_postal && <Text>{formik.errors.codePostal}</Text>}
          </Box>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(`/services/mesures/${mesureId}`);
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
