import { useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
  FormGroupSelect,
} from "~/components/AppForm";
import { adminUserServiceSchema } from "~/validation-schemas";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import {
  Button,
  Field,
  Heading,
  InlineError,
  AccessibleSelect,
  Textarea,
  CheckBox,
  SrOnly,
} from "~/components";
import { findOptions } from "~/utils/form";
import { GENDER_OPTIONS } from "~/constants/user";

import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function buildTiOptions(tis) {
  const tiOptions = tis.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));
  return { tiOptions };
}

function AdminUserServiceForm(props) {
  const { cancelLink, user, handleSubmit } = props;

  const { service_members } = user;

  const [serviceMember] = service_members;
  const { service } = serviceMember;

  const { departements, service_tis } = service;

  const tis = departements.reduce((acc, { tis }) => {
    acc.push(...tis);
    return acc;
  }, []);

  const { tiOptions } = useMemo(() => {
    return buildTiOptions(tis);
  }, [tis]);

  const {
    count: antennes_count,
    sum: { mesures_max: antennes_mesures_max },
  } = service.service_antennes_aggregate.aggregate;

  const geocodeResource = useMemo(
    () => ({
      latitude: service.latitude,
      longitude: service.longitude,
      adresse: service.location_adresse,
      ville: service.ville,
      code_postal: service.code_postal,
      departement_code: service.departement_code,
    }),
    [service]
  );

  const geocodeInitValue = useMemo(
    () => geocodeInitialValue(geocodeResource),
    [geocodeResource]
  );

  const formik = useFormik({
    initialValues: {
      user_email: user.email || "",
      user_nom: user.nom || "",
      user_prenom: user.prenom || "",
      user_genre: user.genre || "",
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      adresse: service.adresse || "",
      adresse_complement: service.adresse_complement || "",
      location_adresse: service.location_adresse || "",
      code_postal: service.code_postal || "",
      ville: service.ville || "",
      geocode: geocodeInitValue,
      information: service.information || "",
      etablissement: service.etablissement || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      genre: service.genre || "",
      telephone: service.telephone || "",
      tis: service_tis.map(({ ti }) => ti.id),
      antennes_count,
      antennes_mesures_max,
      suspendActivity: service.suspend_activity,
      suspendActivityReason: service.suspend_activity_reason,
      useLocationAdresse: service.use_location_adresse,
    },
    onSubmit: handleSubmit,
    validationSchema: adminUserServiceSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            Service
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <Heading size={4} mb={1}>
            {service.etablissement}
          </Heading>
        </FormInputBox>
      </Flex>

      <Flex role="group" aria-labelledby="informations_personelles">
        <FormGrayBox>
          <Heading size={4} mb={1} id="informations_personelles">
            {"Informations personnelles"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="user_genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.user_genre}
            formik={formik}
            validationSchema={adminUserServiceSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="user_prenom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeFirstName]}
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="user_nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeLastName]}
            ariaLabel="Votre nom"
          />

          <FormGroupInput
            placeholder="Adresse e-mail"
            id="user_email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            ariaLabel="Votre adresse e-mail"
            aria-describedby={
              formik.errors.user_email && formik.touched.user_email
                ? "msg-user_email"
                : "user_email_format_attendu"
            }
          />
          <SrOnly id="user_email_format_attendu">
            format attendu : nom@justice.fr
          </SrOnly>
        </FormInputBox>
      </Flex>
      <Flex role="group" aria-labelledby="structure_juridique">
        <FormGrayBox>
          <Heading size={4} mb={1} id="structure_juridique">
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Nom du service"
            id="etablissement"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            ariaLabel="Nom du service"
          />
          <Field>
            <Geocode
              label={
                "Localisation, cette adresse permettra au magistrat/greffier de vous visualiser sur la carte"
              }
              id="geocode"
              resource={geocodeResource}
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              aria-describedby="msg-geocode"
            />
            <div id="msg-geocode">
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
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
              validationSchema={adminUserServiceSchema}
              ariaLabel="Votre adresse, cette adresse sera celle visible pour le magistrat/greffier"
            />
          )}
          <FormGroupInput
            placeholder="Complément d'adresse"
            label="Complément d'adresse"
            id="adresse_complement"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            ariaLabel="Complément d'adresse"
          />
        </FormInputBox>
      </Flex>
      <Flex role="group" aria-labelledby="informations_du_responsable">
        <FormGrayBox>
          <Heading size={4} mb={1} id="informations_du_responsable">
            {"Informations du responsable"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-label="Informations personnelles">
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={adminUserServiceSchema}
            aria-label="Votre civilité"
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeFirstName]}
            autoComplete="given-name"
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeLastName]}
            autoComplete="family-name"
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            autoComplete="email"
            ariaLabel="Votre email"
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={adminUserServiceSchema}
              ariaLabel="Votre téléphone"
            />
          </Box>
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
            <AccessibleSelect
              instanceId={"tis-filter"}
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
      <Flex role="group" aria-labelledby="activite">
        <FormGrayBox>
          <Heading size={4} mb={1} id="activite">
            {"Activité"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Ces informations seront visibles par les magistrats."}
          </Text>
        </FormGrayBox>
        <FormInputBox>
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
              validationSchema={adminUserServiceSchema}
              ariaLabel="Rraisons de suspension de l'activité"
              required
            />
          )}
          <FormGroupInput
            placeholder={
              "Nombre de mesures souhaité" +
              (formik.values.suspendActivity ? " (interrompu)" : "")
            }
            readOnly={formik.values.suspendActivity}
            id="dispo_max"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            ariaLabel="Nombre de mesures souhaité"
          />
          {formik.values.suspendActivity && (
            <FormGroupInput
              placeholder="Nombre de mesures en cours"
              id="currentMesures"
              formik={formik}
              readOnly
              value={service.mesures_in_progress}
              ariaLabel="Nombre de mesures en cours"
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
              aria-label="Vos préférences géographiques, compétences, langues parlées"
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
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            type={null}
            href={cancelLink}
            as="a"
            variant="outline"
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
          >
            Annuler
          </Button>
        </Box>
        <Box>
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
  );
}

export { AdminUserServiceForm };
