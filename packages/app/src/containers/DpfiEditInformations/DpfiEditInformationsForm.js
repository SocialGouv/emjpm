import { useMemo } from "react";
import { useFormik, FormikProvider } from "formik";
import { Box, Flex } from "rebass";

import { useApolloClient } from "@apollo/client";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { Button, Field, Heading, InlineError, SrOnly } from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";
import { dpfiEditSchema } from "~/validation-schemas";

import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function DpfiEditInformationsForm(props) {
  const { cancelLink, mandataire, handleSubmit, user, errorMessage } = props;

  const { liste_blanche } = mandataire;

  const apolloClient = useApolloClient();

  const { type } = user;
  const validationSchema = useMemo(
    () => dpfiEditSchema({ apolloClient }),
    [apolloClient]
  );

  const geocodeResource = useMemo(
    () => ({
      latitude: mandataire.latitude,
      longitude: mandataire.longitude,
      adresse: mandataire.location_adresse,
      ville: mandataire.ville,
      code_postal: mandataire.code_postal,
      departement_code: mandataire.departement_code,
    }),
    [mandataire]
  );

  const geocodeInitValue = useMemo(
    () => geocodeInitialValue(geocodeResource),
    [geocodeResource]
  );

  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      genre: user.genre,
      location_adresse: mandataire.location_adresse,
      adresse_complement: mandataire.adresse_complement,
      geocode: geocodeInitValue,
      nom: user.nom || "",
      prenom: user.prenom || "",
      siret: liste_blanche?.siret || mandataire?.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      suspendActivity: mandataire.suspend_activity,
      suspendActivityReason: mandataire.suspend_activity_reason,
      initialSiret: liste_blanche?.siret || mandataire?.siret || "",
    },
    onSubmit: handleSubmit,

    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1} id="Informations_personnelles_heading">
              {"Informations personnelles"}
            </Heading>
          </FormGrayBox>
          <FormInputBox
            role="group"
            aria-labelledby="Informations_personnelles_heading"
          >
            <FormGroupSelect
              id="genre"
              options={GENDER_OPTIONS}
              placeholder="Civilité"
              value={formik.values.genre}
              formik={formik}
              validationSchema={validationSchema}
              autoComplete="sex"
              aria-label="votre civilité"
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={validationSchema}
              normalizers={[normalizeFirstName]}
              autoComplete="given-name"
              ariaLabel="Votre prénom"
            />
            <FormGroupInput
              placeholder="NOM"
              id="nom"
              formik={formik}
              validationSchema={validationSchema}
              normalizers={[normalizeLastName]}
              autoComplete="family-name"
              ariaLabel="Votre nom"
            />
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1} id="coordonnes_heading">
              {"Coordonnées"}
            </Heading>
          </FormGrayBox>
          <FormInputBox role="group" aria-labelledby="coordonnes_heading">
            <FormGroupInput
              placeholder="Adresse e-mail"
              id="email"
              formik={formik}
              validationSchema={validationSchema}
              autoComplete="email"
              ariaLabel="Votre email"
              ariaDescribedBy="email_format_attendu"
            />
            <SrOnly id="email_format_attendu">
              format attendu : nom@justice.fr
            </SrOnly>
            <Flex justifyContent="space-between">
              <Box flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone"
                  id="telephone"
                  formik={formik}
                  validationSchema={validationSchema}
                  autoComplete="tel"
                  ariaLabel="Votre téléphone"
                  ariaDescribedBy="telephone_format_attendu"
                />
                <SrOnly id="telephone_format_attendu">
                  format attendu : 0601020304
                </SrOnly>
              </Box>
              <Box ml={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone portable"
                  id="telephone_portable"
                  formik={formik}
                  validationSchema={validationSchema}
                  autoComplete="tel"
                  ariaLabel="Votre téléphone"
                  ariaDescribedBy="telephone_format_attendu"
                />
              </Box>
            </Flex>
          </FormInputBox>
        </Flex>
        <Flex role="group" aria-labelledby="structure_juridique">
          <FormGrayBox>
            <Heading size={4} id="structure_juridique">
              {"Structure juridique"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            {type !== "prepose" && (
              <FormGroupInput
                placeholder="SIRET"
                id="siret"
                formik={formik}
                validationSchema={validationSchema}
                ariaLabel="Numéro siret"
                ariaDescribedBy="siret_format_attendu"
              />
            )}
            <SrOnly id="siret_format_attendu">
              format attendu : 82254321300027
            </SrOnly>
            <Field>
              <Geocode
                label={
                  "Localisation, cette adresse permettra au magistrat/greffier de vous visualiser sur la carte"
                }
                required
                resource={geocodeResource}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
                aria-describedby="msg-geocode"
                instanceId="localisation"
                hasError={formik.errors.geocode}
              />
              <div id="msg-geocode">
                <InlineError
                  message={formik.errors.geocode}
                  fieldId="geocode"
                />
              </div>
            </Field>

            <FormGroupInput
              placeholder="Complément d'adresse"
              label="Complément d'adresse"
              id="adresse_complement"
              formik={formik}
              validationSchema={validationSchema}
              ariaLabel="Complément d'adresse"
            />
          </FormInputBox>
        </Flex>

        {errorMessage && <InlineError message={`${errorMessage}`} />}
        <Flex p={2} alignItems="center" justifyContent="flex-end">
          <Box mr="2">
            <Button
              variant="outline"
              as="a"
              type={null}
              href={cancelLink}
              title="Annuler la modification de vos informations"
              aria-label="Annuler la modification de vos informations"
            >
              Annuler
            </Button>
          </Box>
          <Box mr="2">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
              title="Enregistrer la modification de vos informations"
              aria-label="Enregistrer la modification de vos informations"
            >
              Enregistrer
            </Button>
          </Box>
        </Flex>
      </form>
    </FormikProvider>
  );
}

export { DpfiEditInformationsForm };
