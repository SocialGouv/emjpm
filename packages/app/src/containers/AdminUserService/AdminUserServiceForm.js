import { useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
  FormGroupSelect,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import { adminUserServiceSchema } from "~/validation-schemas";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import {
  Button,
  Field,
  Heading,
  InlineError,
  Select,
  Textarea,
  CheckBox,
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

      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Informations personnelles"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Prénom"
            id="user_prenom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeFirstName]}
          />
          <FormGroupInput
            placeholder="NOM"
            id="user_nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeLastName]}
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="user_email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Nom du service"
            id="etablissement"
            formik={formik}
            validationSchema={adminUserServiceSchema}
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
            />
          )}
          <FormGroupInput
            placeholder="Complément d'adresse"
            label="Complément d'adresse"
            id="adresse_complement"
            formik={formik}
            validationSchema={adminUserServiceSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
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
          />

          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeFirstName]}
            autoComplete="given-name"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeLastName]}
            autoComplete="family-name"
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            autoComplete="email"
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={adminUserServiceSchema}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>{"Tribunaux"}</Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Liste des tribunaux préférentiels"}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Select
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
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
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
          />
          {formik.values.suspendActivity && (
            <FormGroupInput
              placeholder="Nombre de mesures en cours"
              id="currentMesures"
              formik={formik}
              readOnly
              value={service.mesures_in_progress}
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
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link to={cancelLink}>
            <Button variant="outline">Annuler</Button>
          </Link>
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

export { AdminUserServiceForm };
