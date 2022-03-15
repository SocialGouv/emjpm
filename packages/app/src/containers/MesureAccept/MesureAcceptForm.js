import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGroupInput,
  FormGroupSelect,
  FormGroupInputDate,
} from "~/components/AppForm";
import { GeocodeCities } from "~/components/Geocode";
import { mesureAcceptSchema } from "~/validation-schemas";
import { Button, Field, Heading, InlineError, SrOnly } from "~/components";

export function MesureAcceptForm(props) {
  const { mesure, handleSubmit, handleCancel, antenneOptions } = props;

  const formik = useFormik({
    initialValues: {
      code_postal: mesure.code_postal,
      date_nomination: mesure.judgmentDate || "",
      lieu_vie: "",
      pays: "FR",
      ville: mesure.ville,
    },
    onSubmit: handleSubmit,
    validationSchema: mesureAcceptSchema,
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading size={5} mb="1">
          Accepter la mesure
        </Heading>
        <Text lineHeight="1.5">
          {
            "A reception de la notification de la decision du juge par courrier, le formulaire ci-contre vous permet de valider que cette mesure vous a ete attribuee."
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Afin de rendre cette mesure active, vous devez imperativement remplir tous les champs de ce formulaire, puis cliquer sur "Valider la mesure".'
          }
        </Text>
      </Box>
      <Box
        p="5"
        width={[1, 3 / 5]}
        role="group"
        aria-labelledby="accepter_mesure"
      >
        <Box mb="3">
          <Heading size={3} id="accepter_mesure">
            Accepter la mesure
          </Heading>
        </Box>

        <form noValidate onSubmit={formik.handleSubmit}>
          <SrOnly id="instructions">
            {"Tous les champs marqués d'un astérisque * sont obligatoires"}
          </SrOnly>
          <FormGroupInputDate
            label="Date de nomination"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            id="date_nomination"
            formik={formik}
            validationSchema={mesureAcceptSchema}
            aria-label="Date de nomination"
            ariaDescribedBy="date_nomination_format_attendu"
          />
          <SrOnly id="date_nomination_format_attendu">
            format attendu : jj/mm/aaaa. Exemple 01/01/2021
          </SrOnly>

          {antenneOptions.length > 0 && (
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              validationSchema={mesureAcceptSchema}
            />
          )}

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureAcceptSchema}
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
              validationSchema={mesureAcceptSchema}
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
            validationSchema={mesureAcceptSchema}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  validationSchema={mesureAcceptSchema}
                  required
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
                  ariaLabel="Code postal"
                  ariaDescribedBy="code_postal_format_attendu"
                />
                <SrOnly id="code_postal_format_attendu">
                  format attendu : 75001
                </SrOnly>
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
                    aria-describedby="msg-ville"
                    required
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
                Valider la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}

export default MesureAcceptForm;
