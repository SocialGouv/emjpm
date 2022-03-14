import { useMemo } from "react";
import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";
import { useApolloClient } from "@apollo/client";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormGroupInputDate,
  FormGroupInputYear,
  FormInputBox,
} from "~/components/AppForm";
import { GeocodeCities } from "~/components/Geocode";
import TribunalAutoComplete from "~/containers/TribunalAutoComplete";
import { mesureCreateSchema } from "~/validation-schemas";
import { Button, Field, Heading, InlineError, SrOnly } from "~/components";

function initialValues() {
  return {
    annee_naissance: "",
    antenne: "",
    cabinet: "",
    champ_mesure: "",
    civilite: "",
    code_postal: "",
    date_nomination: "",
    lieu_vie: "",
    nature_mesure: "",
    numero_dossier: "",
    numero_rg: "",
    pays: "FR",
    ti_id: "",
    ville: "",
  };
}

export function MesureCreateForm(props) {
  const { tribunaux, antenneOptions, handleSubmit, handleCancel } = props;

  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => mesureCreateSchema({ apolloClient }),
    [apolloClient]
  );

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex id="mesure_create">
        <FormGrayBox>
          <Heading size={4} id="majeur_a_protger_heading">
            Majeur protégé
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="majeur_a_protger_heading">
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <FormGroupInput
                label="Numéro RG"
                placeholder="8 chiffres ou lettres"
                forceActive
                id="numero_rg"
                aria-label="Numéro RG"
                formik={formik}
                size="small"
                validationSchema={validationSchema}
                onInput={(e) => {
                  let value = e.target.value || "";
                  value = value.toUpperCase().trim();
                  formik.setFieldValue("numero_rg", value);
                  if (!/^[a-z0-9]+$/i.test(value)) {
                    formik.setFieldTouched("numero_rg");
                  }
                }}
                errorMessage={formik.errors.numero_rg}
                aria-describedby="format_rg_attendu"
              />
              <SrOnly id="format_rg_attendu">
                Format : 8 chiffres ou lettres. Exemple : 12A34567
              </SrOnly>
            </Box>
            <Box style={{ minWidth: "200px" }} pl="1px">
              <FormGroupInput
                placeholder="Numéro de dossier"
                id="numero_dossier"
                formik={formik}
                size="small"
                validationSchema={validationSchema}
                aria-label="Numéro de dossier"
              />
            </Box>
          </Flex>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <TribunalAutoComplete
                id="ti_id"
                defaultOptions={tribunaux}
                placeholder="Tribunal"
                size="small"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Box>
            <Box style={{ minWidth: "200px" }} pl="1px">
              <FormGroupInput
                placeholder="Cabinet"
                id="cabinet"
                formik={formik}
                size="small"
                validationSchema={validationSchema}
                placeholder="Cabinet du tribunal"
                aria-label="Cabinet du tribunal"
              />
            </Box>
          </Flex>
          <FormGroupSelect
            id="civilite"
            options={MESURE_PROTECTION.CIVILITE.options}
            placeholder="Civilité"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />

          <FormGroupInputYear
            label="Année de naissance"
            placeholder="aaaa"
            title="Format: aaaa. Exemple: 2021"
            id="annee_naissance"
            formik={formik}
            validationSchema={validationSchema}
            aria-label="Année de naissance"
          />
          <FormGroupInputDate
            label="Date de première mise sous protection"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            id="date_premier_mesure"
            formik={formik}
            validationSchema={validationSchema}
            aria-label="Date de première mise sous protection"
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} id="mesure_de_protection_heading">
            Mesure de protection
          </Heading>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="mesure_de_protection_heading"
        >
          <FormGroupInputDate
            placeholder="Date de nomination"
            id="date_nomination"
            formik={formik}
            validationSchema={validationSchema}
            aria-label="Date de nomination"
          />
          <FormGroupSelect
            id="nature_mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            placeholder="Nature de la mesure"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />

          <FormGroupSelect
            id="champ_mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            placeholder="Champ de la mesure"
            formik={formik}
            isClearable
            size="small"
            validationSchema={validationSchema}
          />

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={validationSchema}
            onChange={(option) => {
              formik.setFieldValue("lieu_vie", option.value);
              formik.setFieldValue("type_etablissement", null);
            }}
          />

          {isTypeEtablissementRequired(formik.values.lieu_vie) && (
            <FormGroupSelect
              id="type_etablissement"
              options={MESURE_PROTECTION.TYPE_ETABLISSEMENT.options}
              placeholder="Type d'établissement"
              formik={formik}
              validationSchema={validationSchema}
            />
          )}

          <FormGroupSelect
            id="pays"
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
            placeholder="Pays"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  size="small"
                  validationSchema={validationSchema}
                  required={formik.values.pays == "FR"}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
                  aria-label="Code postal"
                />
              </Box>
              <Box ml={1} flex={1 / 2}>
                <Field>
                  <GeocodeCities
                    placeholder="Ville"
                    name="ville"
                    id="ville"
                    zipcode={formik.values.code_postal}
                    onChange={(value) => formik.setFieldValue("ville", value)}
                    value={formik.values.ville}
                    hasError={formik.touched.ville && formik.errors.ville}
                    size="small"
                    required
                    aria-describedby="msg-ville"
                  />
                  <div id="msg-ville">
                    {formik.touched.ville && (
                      <InlineError
                        message={formik.errors.ville}
                        fieldId="ville"
                      />
                    )}
                  </div>
                </Field>
              </Box>
            </Flex>
          )}
        </FormInputBox>
      </Flex>
      {antenneOptions.length > 0 && (
        <Flex>
          <FormGrayBox>
            <Heading size={4}>Antenne de gestion de la mesure</Heading>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              size="small"
              validationSchema={validationSchema}
            />
          </FormInputBox>
        </Flex>
      )}

      <Flex justifyContent="flex-end" py={2}>
        <Box>
          <Button mr="2" variant="outline" onClick={handleCancel}>
            Annuler
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
  );
}
