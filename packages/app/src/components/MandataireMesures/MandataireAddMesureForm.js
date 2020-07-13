import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Card, Field, Heading4, InlineError, Input, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Box, Flex } from "rebass";

import { COUNTRIES } from "../../constants/mesures";
import { mandataireMesureSchema } from "../../lib/validationSchemas";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

export const MandataireAddMesureForm = (props) => {
  const { onSubmit, tribunaux } = props;

  const formik = useFormik({
    onSubmit,
    validationSchema: mandataireMesureSchema,
    initialValues: {
      annee_naissance: "",
      civilite: "",
      date_nomination: "",
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
                  value={formik.values.date_nomination}
                  id="date_nomination"
                  type="date"
                  name="date_nomination"
                  hasError={formik.errors.date_nomination && formik.touched.date_nomination}
                  onChange={formik.handleChange}
                  placeholder="Date de jugement ou ordonnance de nomination"
                />
                {formik.errors.date_nomination && formik.touched.date_nomination && (
                  <Text>{formik.errors.date_nomination}</Text>
                )}
              </Field>
              <Field>
                <Select
                  instanceId={"nature_mesure"}
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
                  instanceId={"champ_protection"}
                  id="champ_protection"
                  name="champ_protection"
                  placeholder="Champ de la protection"
                  value={formik.values.champ_protection}
                  hasError={formik.errors.champ_protection && formik.touched.champ_protection}
                  onChange={(option) => formik.setFieldValue("champ_protection", option)}
                  options={MESURE_PROTECTION.CHAMP_PROTECTION.options}
                />
                <InlineError message={formik.errors.champ_protection} fieldId="champ_protection" />
              </Field>
              <Field>
                <Select
                  id="civilite"
                  name="civilite"
                  placeholder="Civilité"
                  value={formik.values.civilite}
                  hasError={formik.errors.civilite && formik.touched.civilite}
                  onChange={(option) => formik.setFieldValue("civilite", option)}
                  options={MESURE_PROTECTION.CIVILITE.options}
                />
                {formik.errors.civilite && formik.touched.civilite && (
                  <Text>{formik.errors.civilite}</Text>
                )}
              </Field>

              <Field>
                <Input
                  value={formik.values.annee_naissance}
                  id="annee_naissance"
                  name="annee_naissance"
                  type="number"
                  hasError={formik.errors.annee_naissance && formik.touched.annee_naissance}
                  onChange={formik.handleChange}
                  placeholder="Année de naissance"
                />
                {formik.errors.annee_naissance && formik.touched.annee_naissance && (
                  <Text>{formik.errors.annee_naissance}</Text>
                )}
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
