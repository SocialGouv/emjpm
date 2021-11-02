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

function buildTiOptions(lb_departements, lb_user_etablissements) {
  const tiList = [];
  lb_user_etablissements.forEach(({ etablissement: { tis } }) => {
    tiList.push.apply(tiList, tis);
  });
  lb_departements.forEach(({ tis }) => {
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

  const { lb_user = {}, mandataire_tis = [] } = mandataire;
  const { lb_departements = [], lb_user_etablissements = [] } = lb_user || {};

  const { tiOptions } = useMemo(() => {
    return buildTiOptions(lb_departements, lb_user_etablissements);
  }, [lb_departements, lb_user_etablissements]);

  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => mandataireEditSchema({ apolloClient }),
    [apolloClient]
  );

  const formik = useFormik({
    initialValues: {
      competences: mandataire.competences || "",
      dispo_max: parseInt(mandataire.dispo_max),
      email: user.email || "",
      genre: mandataire.genre,
      geocode: geocodeInitialValue(mandataire),
      nom: user.nom || "",
      prenom: user.prenom || "",
      siret: lb_user.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      tis: mandataire_tis.map((mti) => mti.ti_id),
      suspendActivity: mandataire.suspend_activity,
      suspendActivityReason: mandataire.suspend_activity_reason,
      initialSiret: lb_user.siret || "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Informations personnelles"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="genre"
              options={GENDER_OPTIONS}
              placeholder="Genre"
              value={formik.values.genre}
              formik={formik}
              validationSchema={validationSchema}
            />
            <FormGroupInput
              placeholder="Prénom"
              id="prenom"
              formik={formik}
              validationSchema={validationSchema}
            />
            <FormGroupInput
              placeholder="Nom"
              id="nom"
              formik={formik}
              validationSchema={validationSchema}
            />
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
              placeholder="Email"
              id="email"
              formik={formik}
              validationSchema={validationSchema}
            />
            <Flex justifyContent="space-between">
              <Box flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone"
                  id="telephone"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Box>
              <Box ml={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Téléphone portable"
                  id="telephone_portable"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Box>
            </Flex>
          </FormInputBox>
        </Flex>
        <Flex>
          <FormGrayBox>
            <Heading size={4}>{"Adresse"}</Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {
                "Cette adresse permettra de vous localiser sur la carte des mesures"
              }
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Field>
              <Geocode
                resource={mandataire}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
                aria-describedby="msg-geocode"
              />
              <div id="msg-geocode">
                <InlineError
                  message={formik.errors.geocode}
                  fieldId="geocode"
                />
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
            <Heading size={4} mb={1}>
              {"Activité"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Ces informations seront visibles par les magistrats"}
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
                validationSchema={validationSchema}
              />
            )}
            <FormGroupInput
              placeholder={
                "Nombre de mesures souhaitées" +
                (formik.values.suspendActivity ? " (suspendu)" : "")
              }
              id="dispo_max"
              formik={formik}
              readOnly={formik.values.suspendActivity}
              validationSchema={validationSchema}
            />
            {formik.values.suspendActivity && (
              <FormGroupInput
                placeholder="Nombre de mesures en cours"
                id="currentMesures"
                formik={formik}
                readOnly
                value={mandataire.mesures_en_cours}
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
            <FormGroupInput
              placeholder="SIRET"
              id="siret"
              formik={formik}
              validationSchema={validationSchema}
            />
          </FormInputBox>
        </Flex>
        {errorMessage && <InlineError message={`${errorMessage}`} />}
        <Flex p={2} alignItems="center" justifyContent="flex-end">
          <Box mr="2">
            <Link to={cancelLink}>
              <Button variant="outline">Annuler</Button>
            </Link>
          </Box>
          <Box mr="2">
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
    </FormikProvider>
  );
}

export { MandataireEditInformationsForm };
