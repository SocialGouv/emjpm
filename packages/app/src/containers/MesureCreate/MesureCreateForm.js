import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

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
import { Button, Field, Heading, InlineError } from "~/components";

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

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: handleSubmit,
    validationSchema: mesureCreateSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Majeur protégé</Heading>
        </FormGrayBox>
        <FormInputBox>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <FormGroupInput
                placeholder="Numéro RG"
                id="numero_rg"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
              />
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Numéro de dossier (optionnel)"
                id="numero_dossier"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
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
                validationSchema={mesureCreateSchema}
              />
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Cabinet (optionnel)"
                id="cabinet"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
              />
            </Box>
          </Flex>
          <FormGroupSelect
            id="civilite"
            options={MESURE_PROTECTION.CIVILITE.options}
            placeholder="Civilité"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupInputYear
            label="Année de naissance"
            placeholder="aaaa"
            id="annee_naissance"
            formik={formik}
            validationSchema={mesureCreateSchema}
          />
          <FormGroupInputDate
            label="Date de première mise sous protection (optionnel)"
            placeholder="jj/mm/aaaa"
            id="date_premier_mesure"
            formik={formik}
            validationSchema={mesureCreateSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Mesure de protection</Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInputDate
            placeholder="Date de nomination"
            id="date_nomination"
            formik={formik}
            validationSchema={mesureCreateSchema}
          />
          <FormGroupSelect
            id="nature_mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            placeholder="Nature de la mesure"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupSelect
            id="champ_mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            placeholder="Champs de la mesure"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureCreateSchema}
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
              validationSchema={mesureCreateSchema}
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
            validationSchema={mesureCreateSchema}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  size="small"
                  validationSchema={mesureCreateSchema}
                  required={formik.values.pays == "FR"}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
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
                    hasError={!!formik.errors.ville}
                    size="small"
                    required
                  />
                  <InlineError message={formik.errors.ville} fieldId="ville" />
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
              validationSchema={mesureCreateSchema}
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
