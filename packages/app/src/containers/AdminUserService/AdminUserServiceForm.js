import { useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
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

  const formik = useFormik({
    initialValues: {
      user_email: user.email || "",
      user_nom: user.nom || "",
      user_prenom: user.prenom || "",
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      geocode: geocodeInitialValue(service),
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
      tis: service_tis.map(({ ti }) => ti.id),
      antennes_count,
      antennes_mesures_max,
      suspendActivity: service.suspend_activity,
      suspendActivityReason: service.suspend_activity_reason,
    },
    onSubmit: handleSubmit,
    validationSchema: adminUserServiceSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>{`${service.etablissement}`}</Heading>
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
            {"Responsable"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
            normalizers={[normalizeLastName]}
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={adminUserServiceSchema}
              normalizers={[normalizeFirstName]}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Coordonnées"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
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
          <Heading size={4}>{"Adresse"}</Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {
              "Cette adresse permettra de localiser le service sur la carte des mesures"
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Geocode
              id="geocode"
              resource={service}
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              aria-describedby="msg-geocode"
            />
            <div id="msg-geocode">
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
            </div>
          </Field>
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
