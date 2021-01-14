import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { GeocodeCities } from "~/components/Geocode";
import { mesureEtatSchema } from "~/lib/validationSchemas";
import { Button, Field, Heading4, InlineError, Text } from "~/ui";

function initialValues(mesureEtat) {
  return {
    champ_mesure: mesureEtat ? mesureEtat.champMesure : "",
    code_postal: mesureEtat ? mesureEtat.codePostal : "",
    date_changement_etat: mesureEtat ? mesureEtat.dateChangementEtat : "",
    lieu_vie: mesureEtat ? mesureEtat.lieuVie : "",
    nature_mesure: mesureEtat ? mesureEtat.natureMesure : "",
    pays: mesureEtat ? mesureEtat.pays : "FR",
    type_etablissement: mesureEtat ? mesureEtat.typeEtablissement : "",
    ville: mesureEtat ? mesureEtat.ville : "",
  };
}

export function MesureEtatCreateOrEditForm(props) {
  const {
    handleSubmit,
    handleDelete,
    handleCancel,
    mesureEtatToEdit,
    isDeletable,
  } = props;

  const formik = useFormik({
    initialValues: initialValues(mesureEtatToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureEtatSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          {mesureEtatToEdit?.id && (
            <Heading4 mb={1}>{"Modification de l'état"}</Heading4>
          )}
          {!mesureEtatToEdit && <Heading4 mb={1}>{"Ajout d'un état"}</Heading4>}
          <Text lineHeight="1.5" color="textSecondary">
            {
              "Merci de renseigner les informations de l'état de la mesure de la protection"
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Date de changement d'état"
            type="date"
            id="date_changement_etat"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="nature_mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            placeholder="Nature de la mesure"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="champ_mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            placeholder="Champs de la mesure"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
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
              validationSchema={mesureEtatSchema}
              size="small"
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
            validationSchema={mesureEtatSchema}
            size="small"
            onChange={(option) => {
              formik.setFieldValue("pays", option.value);
              formik.setFieldValue("code_postal", null);
              formik.setFieldValue("ville", null);
            }}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  validationSchema={mesureEtatSchema}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
                  size="small"
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
                  />
                  <InlineError message={formik.errors.ville} fieldId="ville" />
                </Field>
              </Box>
            </Flex>
          )}
        </FormInputBox>
      </Flex>

      <Flex justifyContent="space-between" py={2}>
        {isDeletable ? (
          <Box>
            <Button bg="error" onClick={handleDelete}>
              Supprimer
            </Button>
          </Box>
        ) : (
          <Box />
        )}
        <Flex justifyContent="flex-end">
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
      </Flex>
    </form>
  );
}
