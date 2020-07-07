import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Card, Field, Heading4, InlineError, Input, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex } from "rebass";

import { CIVILITY, COUNTRIES, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { mandataireMesureSchema } from "../../lib/validationSchemas";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

export const MandataireAddMesureForm = (props) => {
  const { onSubmit, tribunaux } = props;

  const formik = useFormik({
    onSubmit,
    validationSchema: mandataireMesureSchema,
    initialValues: {
      annee: "",
      civilite: "",
      date_ouverture: "",
      numero_dossier: "",
      numero_rg: "",
      tribunal: undefined,
      zipcode: "",
      city: "",
      country: { value: "FR", label: COUNTRIES["FR"] },
      cabinet: "",
    },
  });

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap" {...props}>
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="280px">
            <Heading4>{`Informations générales`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre mesure`}
            </Text>
          </Box>
          <Box height="280px">
            <Heading4>{`Caractéristique de la mesure`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations nous permettent de vous présenter les mesures de mandataires les plus
              adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
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
                {formik.errors.numero_rg && formik.touched.numero_rg && (
                  <Text>{formik.errors.numero_rg}</Text>
                )}
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
                {formik.errors.tribunal && formik.touched.tribunal && (
                  <Text>{formik.errors.tribunal}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.cabinet}
                  id="cabinet"
                  name="cabinet"
                  hasError={formik.errors.cabinet && formik.touched.cabinet}
                  onChange={formik.handleChange}
                  placeholder="Cabinet"
                />
                {formik.errors.cabinet && formik.touched.cabinet && (
                  <Text>{formik.errors.cabinet}</Text>
                )}
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
                {formik.errors.numero_dossier && formik.touched.numero_dossier && (
                  <Text>{formik.errors.numero_dossier}</Text>
                )}
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
                {formik.errors.date_ouverture && formik.touched.date_ouverture && (
                  <Text>{formik.errors.date_ouverture}</Text>
                )}
              </Field>
              <Field>
                <Select
                  id="type"
                  name="type"
                  placeholder="Type de mesure"
                  value={formik.values.type}
                  hasError={formik.errors.type && formik.touched.type}
                  onChange={(option) => formik.setFieldValue("type", option)}
                  options={MESURE_TYPE_LABEL_VALUE}
                />
                {formik.errors.type && formik.touched.type && <Text>{formik.errors.type}</Text>}
              </Field>
              <Field>
                <Select
                  id="civilite"
                  name="civilite"
                  placeholder="Civilité"
                  value={formik.values.civilite}
                  hasError={formik.errors.civilite && formik.touched.civilite}
                  onChange={(option) => formik.setFieldValue("civilite", option)}
                  options={CIVILITY}
                />
                {formik.errors.civilite && formik.touched.civilite && (
                  <Text>{formik.errors.civilite}</Text>
                )}
              </Field>

              <Field>
                <Input
                  value={formik.values.annee}
                  id="annee"
                  name="annee"
                  type="number"
                  hasError={formik.errors.annee && formik.touched.annee}
                  onChange={formik.handleChange}
                  placeholder="Année de naissance"
                />
                {formik.errors.annee && formik.touched.annee && <Text>{formik.errors.annee}</Text>}
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
                {formik.errors.lieu_vie && formik.touched.lieu_vie && (
                  <Text>{formik.errors.lieu_vie}</Text>
                )}
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
                        hasError={formik.errors.city && formik.touched.city}
                      />
                      <InlineError message={formik.errors.city} fieldId="city" />
                    </Field>
                  </Box>
                </Flex>
              )}
              <Flex justifyContent="flex-end">
                <Box>
                  <Button mr="2" variant="outline">
                    <Link href="/mandataires">
                      <a>Annuler</a>
                    </Link>
                  </Button>
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
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export default MandataireAddMesureForm;
