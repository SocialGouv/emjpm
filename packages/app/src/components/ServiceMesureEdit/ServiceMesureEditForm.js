import { GLOBAL, MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { serviceMesureSchema } from "../../lib/validationSchemas";
import { findOption } from "../../util/option/OptionUtil";
import { Datepicker } from "../Datepicker";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

export const ServiceMesureEditForm = (props) => {
  const {
    onSubmit,
    mesure: {
      age,
      antenneId,
      civilite,
      dateNomination,
      id,
      numeroRg,
      numeroDossier,
      lieuVie,
      natureMesure,
      champMesure,
      tribunal,
      tiId,
      pays,
      cabinet,
      codePostal,
      ville,
    },
    tribunaux,
    service_antennes,
  } = props;

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  const formik = useFormik({
    onSubmit,
    validationSchema: serviceMesureSchema,
    initialValues: {
      annee_naissance: age,
      antenne_id: antenneId ? antenneOptions.find((o) => o.value === antenneId) : null,
      civilite: findOption(MESURE_PROTECTION.CIVILITE.options, civilite),
      date_nomination: dateNomination,
      numero_dossier: numeroDossier,
      numero_rg: numeroRg,
      lieu_vie: findOption(MESURE_PROTECTION.LIEU_VIE_MAJEUR.options, lieuVie),
      tribunal: { label: tribunal, value: tiId },
      nature_mesure: findOption(MESURE_PROTECTION.NATURE_MESURE.options, natureMesure),
      champ_mesure: findOption(MESURE_PROTECTION.CHAMP_MESURE.options, champMesure),
      country: GLOBAL.COUNTRIES.options.find((elm) => elm.value === pays),
      city: ville,
      zipcode: codePostal,
      cabinet,
    },
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
              onChange={(option) => formik.setFieldValue("tribunal", option)}
              defaultOptions={tribunaux}
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

          <Box mb={4}>
            <Label mb={2} sx={{ fontSize: "12px", fontWeight: 600 }}>
              Date de jugement ou ordonnance de nomination
            </Label>
            <Datepicker
              id="date_nomination"
              selected={formik.values.date_nomination}
              hasError={formik.touched.date_nomination && formik.errors.date_nomination}
              onBlur={formik.onBlur}
              onChange={(date) => formik.setFieldValue("date_nomination", date)}
            />
            {formik.touched.date_nomination && formik.errors.date_nomination && (
              <InlineError message={formik.errors.date_nomination} fieldId="date_nomination" />
            )}
          </Box>

          {service_antennes.length >= 2 && (
            <Field>
              <Select
                id="antenne_id"
                name="antenne_id"
                placeholder="Antenne"
                value={formik.values.antenne_id}
                hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                onChange={(option) => formik.setFieldValue("antenne_id", option)}
                options={antenneOptions}
              />
              <InlineError message={formik.errors.antenne_id} fieldId="antenne_id" />
            </Field>
          )}
          <Field>
            <Select
              id="nature_mesure"
              name="nature_mesure"
              placeholder="Nature de la mesure"
              value={formik.values.nature_mesure}
              hasError={formik.errors.nature_mesure && formik.touched.nature_mesure}
              onChange={(option) => formik.setFieldValue("nature_mesure", option)}
              options={MESURE_PROTECTION.NATURE_MESURE.options}
            />
            <InlineError message={formik.errors.nature_mesure} fieldId="nature_mesure" />
          </Field>
          <Field>
            <Select
              id="champ_mesure"
              name="champ_mesure"
              placeholder="Nature de la mesure"
              value={formik.values.champ_mesure}
              hasError={formik.errors.champ_mesure && formik.touched.champ_mesure}
              onChange={(option) => formik.setFieldValue("champ_mesure", option)}
              isClearable={true}
              options={MESURE_PROTECTION.CHAMP_MESURE.options}
            />
            <InlineError message={formik.errors.champ_mesure} fieldId="champ_mesure" />
          </Field>
          <Field>
            <Select
              id="civilite"
              name="civilite"
              placeholder="civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={(option) => formik.setFieldValue("civilite", option)}
              options={MESURE_PROTECTION.CIVILITE.options}
            />
            <InlineError message={formik.errors.civilite} fieldId="civilite" />
          </Field>
          <Field>
            <Input
              value={formik.values.annee_naissance}
              id="annee_naissance"
              name="annee_naissance"
              hasError={formik.errors.annee_naissance && formik.touched.annee_naissance}
              onChange={formik.handleChange}
              placeholder="Année de naissance"
            />
            <InlineError message={formik.errors.annee_naissance} fieldId="annee_naissance" />
          </Field>
          <Field>
            <Select
              id="lieu_vie"
              name="lieu_vie"
              placeholder="Lieu de vie du majeur"
              value={formik.values.lieu_vie}
              hasError={formik.errors.lieu_vie && formik.touched.lieu_vie}
              onChange={(option) => formik.setFieldValue("lieu_vie", option)}
              options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            />
            <InlineError message={formik.errors.lieu_vie} fieldId="lieu_vie" />
          </Field>

          <Field>
            <Select
              id="country"
              name="country"
              placeholder="Pays"
              value={formik.values.country}
              hasError={formik.errors.country && formik.touched.country}
              onChange={(option) => formik.setFieldValue("country", option)}
              options={[
                {
                  label: "France",
                  value: "FR",
                },
                {
                  label: "Belgique",
                  value: "BE",
                },
              ]}
            />
            {formik.errors.country && formik.touched.country && (
              <Text>{formik.errors.country}</Text>
            )}
          </Field>
          {formik.values.country && formik.values.country.value === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <Field>
                  <Input
                    value={formik.values.zipcode}
                    id="zipcode"
                    name="zipcode"
                    onChange={async (e) => {
                      const { value } = e.target;
                      await formik.setFieldValue("zipcode", value);
                      await formik.setFieldValue("city", "");
                    }}
                    placeholder="Code postal"
                  />
                  <InlineError message={formik.errors.zipcode} fieldId="zipcode" />
                </Field>
              </Box>
              <Box ml={1} flex={1 / 2}>
                <Field>
                  <GeocodeCities
                    placeholder="Ville"
                    name="city"
                    id="city"
                    zipcode={formik.values.zipcode}
                    onChange={(value) => formik.setFieldValue("city", value)}
                    value={formik.values.city}
                  />
                  <InlineError message={formik.errors.city} fieldId="city" />
                </Field>
              </Box>
            </Flex>
          )}

          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
                    shallow: true,
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
