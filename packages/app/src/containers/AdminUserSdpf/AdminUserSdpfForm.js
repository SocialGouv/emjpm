import { useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
  FormGroupSelect,
} from "~/components/AppForm";
import { adminUserSdpfSchema as adminUserServiceSchema } from "~/validation-schemas";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import {
  Button,
  Field,
  Heading,
  InlineError,
  CheckBox,
  SrOnly,
} from "~/components";

import { GENDER_OPTIONS } from "~/constants/user";

import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function buildTiOptions(tis) {
  const tiOptions = tis.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));
  return { tiOptions };
}

function AdminUserSdpfForm(props) {
  const { cancelLink, user, handleSubmit } = props;

  const { sdpf_members: service_members } = user;

  const [serviceMember] = service_members;
  const { sdpf: service } = serviceMember;

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
      suspendActivity: service.suspend_activity,
      suspendActivityReason: service.suspend_activity_reason,
      useLocationAdresse: service.use_location_adresse,
    },
    onSubmit: handleSubmit,
    validationSchema: adminUserServiceSchema,
  });

  console.log("===> formik.errors", formik.errors);

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

export { AdminUserSdpfForm };
