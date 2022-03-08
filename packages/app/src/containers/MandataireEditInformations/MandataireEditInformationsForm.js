import { useMemo } from "react";
import { useFormik, FormikProvider } from "formik";
import { uniq } from "lodash";
import { Box, Flex, Text } from "rebass";

import { useApolloClient } from "@apollo/client";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { Link } from "~/components/Link";
import {
  CheckBox,
  Button,
  Field,
  Heading,
  InlineError,
  Select,
  Textarea,
} from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";
import { mandataireEditSchema } from "~/validation-schemas";
import { findOptions } from "~/utils/form";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function buildTiOptions(
  mandataire_individuel_departements,
  mandataire_prepose_etablissements
) {
  const tiList = [];
  mandataire_prepose_etablissements.forEach(({ etablissement: { tis } }) => {
    tiList.push.apply(tiList, tis);
  });
  mandataire_individuel_departements.forEach(({ tis }) => {
    tiList.push.apply(tiList, tis);
  });
  const tis = uniq(tiList);
  const tiOptions = tis.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));
  return { tiOptions };
}

function MandataireEditInformationsForm(props) {
  const { cancelLink, mandataire, handleSubmit, user, errorMessage } = props;

  const { liste_blanche, mandataire_tis = [] } = mandataire;
  const {
    mandataire_individuel_departements = [],
    mandataire_prepose_etablissements = [],
  } = liste_blanche || {};

  const { tiOptions } = useMemo(() => {
    return buildTiOptions(
      mandataire_individuel_departements,
      mandataire_prepose_etablissements
    );
  }, [mandataire_individuel_departements, mandataire_prepose_etablissements]);

  const apolloClient = useApolloClient();

  const { type } = user;
  const validationSchema = useMemo(
    () => mandataireEditSchema({ type, apolloClient }),
    [apolloClient, type]
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
      competences: mandataire.competences || "",
      dispo_max: parseInt(mandataire.dispo_max),
      email: user.email || "",
      genre: user.genre,
      location_adresse: mandataire.location_adresse,
      adresse: mandataire.adresse,
      adresse_complement: mandataire.adresse_complement,
      geocode: geocodeInitValue,
      nom: user.nom || "",
      prenom: user.prenom || "",
      siret: liste_blanche?.siret || mandataire?.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      tis: mandataire_tis.map((mti) => mti.ti_id),
      suspendActivity: mandataire.suspend_activity,
      suspendActivityReason: mandataire.suspend_activity_reason,
      initialSiret: liste_blanche?.siret || mandataire?.siret || "",
      useLocationAdresse: mandataire.use_location_adresse,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={formik.handleSubmit}>
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
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={validationSchema}
              normalizers={[normalizeFirstName]}
              autoComplete="given-name"
              aria-label="Votre prénom"
            />
            <FormGroupInput
              placeholder="NOM"
              id="nom"
              formik={formik}
              validationSchema={validationSchema}
              normalizers={[normalizeLastName]}
              autoComplete="family-name"
              aria-label="Votre nom"
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
              aria-label="Votre email"
            />
            <Flex justifyContent="space-between">
              <Box flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone"
                  id="telephone"
                  formik={formik}
                  validationSchema={validationSchema}
                  autoComplete="tel"
                  aria-label="Votre téléphone"
                />
              </Box>
              <Box ml={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone portable"
                  id="telephone_portable"
                  formik={formik}
                  validationSchema={validationSchema}
                  autoComplete="tel"
                  aria-label="Votre téléphone"
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
                aria-label="Siret"
              />
            )}

            <Field>
              <Geocode
                label={
                  "Localisation, cette adresse permettra au magistrat/greffier de vous visualiser sur la carte"
                }
                required
                resource={geocodeResource}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
                aria-describedby="msg-geocode"
                hasError={formik.errors.geocode}
              />
              <div id="msg-geocode">
                <InlineError
                  message={formik.errors.geocode}
                  fieldId="geocode"
                />
              </div>
            </Field>

            <Box mb={2}>
              <CheckBox
                isChecked={!formik.values.useLocationAdresse}
                onChange={() => {
                  formik.setFieldValue(
                    "useLocationAdresse",
                    !formik.values.useLocationAdresse
                  );
                }}
                label="Afficher une adresse différente pour le magistrat/greffier"
              />
            </Box>
            {!formik.values.useLocationAdresse && (
              <FormGroupInput
                placeholder="Adresse"
                label="Adresse, cette adresse sera celle visible pour le magistrat/greffier"
                id="adresse"
                required
                formik={formik}
                validationSchema={validationSchema}
                aria-label="Votre adresse, cette adresse sera celle visible pour le magistrat/greffier"
              />
            )}
            <FormGroupInput
              placeholder="Complément d'adresse"
              label="Complément d'adresse"
              id="adresse_complement"
              formik={formik}
              validationSchema={validationSchema}
              aria-label="Complément d'adresse"
            />
          </FormInputBox>
        </Flex>
        <Flex role="group" aria-labelledby="tribunaux">
          <FormGrayBox>
            <Heading size={4} id="tribunaux">
              {"Tribunaux"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Liste des tribunaux préférentiels"}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Field>
              <Select
                instanceId={"tis-select"}
                id="tis"
                name="tis"
                placeholder="Tribunaux dans lesquels vous exercez"
                value={findOptions(tiOptions, formik.values.tis)}
                hasError={formik.errors.tis && formik.touched.tis}
                onChange={(options) => {
                  formik.setFieldValue(
                    "tis",
                    (options || []).map((o) => o.value)
                  );
                }}
                options={tiOptions}
                isMulti
                aria-describedby="msg-tis"
              />
              <div id="msg-tis">
                {formik.touched.tis && (
                  <InlineError message={formik.errors.tis} fieldId="tis" />
                )}
              </div>
            </Field>
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1} id="activite_heading">
              {"Activité"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Ces informations seront visibles par les magistrats"}
            </Text>
          </FormGrayBox>
          <FormInputBox role="group" aria-labelledby="activite_heading">
            <Box mb={2}>
              <CheckBox
                isChecked={formik.values.suspendActivity}
                onChange={() => {
                  formik.setFieldValue(
                    "suspendActivity",
                    !formik.values.suspendActivity
                  );
                }}
                label="Je ne souhaite plus recevoir de nouvelles mesures pour le moment"
              />
            </Box>
            {formik.values.suspendActivity && (
              <FormGroupInput
                placeholder={"Motif de l'absence"}
                id="suspendActivityReason"
                formik={formik}
                validationSchema={validationSchema}
                aria-label="Motif de l'absence"
                required
              />
            )}
            <FormGroupInput
              placeholder={
                "Nombre de mesures souhaitées" +
                (formik.values.suspendActivity ? " (interrompu)" : "")
              }
              id="dispo_max"
              formik={formik}
              readOnly={formik.values.suspendActivity}
              validationSchema={validationSchema}
              aria-label="Nombre de mesures souhaitées"
            />
            {formik.values.suspendActivity && (
              <FormGroupInput
                placeholder="Nombre de mesures en cours"
                id="currentMesures"
                formik={formik}
                readOnly
                value={mandataire.mesures_en_cours}
                aria-label="Nombre de mesures en cours"
              />
            )}
            <Box>
              <Textarea
                value={formik.values.competences}
                id="competences"
                name="competences"
                error={formik.errors.competences}
                onChange={formik.handleChange}
                label="Informations à destination du magistrat"
                placeholder="Préférences géographiques, compétences, langues parlées, ..."
                aria-describedby="msg-competences"
              />
              <div id="msg-competences">
                <InlineError
                  message={formik.errors.competences}
                  fieldId="competences"
                />
              </div>
            </Box>
          </FormInputBox>
        </Flex>
        {errorMessage && <InlineError message={`${errorMessage}`} />}
        <Flex p={2} alignItems="center" justifyContent="flex-end">
          <Box mr="2">
            <Link
              to={cancelLink}
              title="Annuler la modification de vos informations"
              aria-label="Annuler la modification de vos informations"
            >
              <Button variant="outline">Annuler</Button>
            </Link>
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

export { MandataireEditInformationsForm };
