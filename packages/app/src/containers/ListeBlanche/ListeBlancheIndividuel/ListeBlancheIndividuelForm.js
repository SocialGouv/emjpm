import { useCallback, useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { Box, Flex, Text } from "rebass";
import { isAdmin } from "@emjpm/biz";

import { useApolloClient } from "@apollo/client";

import { checkDuplicateMandataireSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";
import yup, { FORM_REQUIRED_MESSAGE } from "~/validation-schemas/yup";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Button, Heading, Field, InlineError, Input } from "~/components";
import { DepartementFormUtil } from "~/utils/departements";

import SelectSIRET from "~/containers/SelectSIRET";
import SelectAdresse from "~/containers/SelectAdresse";
import { GeocodeCities } from "~/components/Geocode";

import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

import {
  readOnlyContainerStyle,
  readOnlyInputStyle,
} from "~/containers/ListeBlanche/style";

import { ListeBlancheIndividuelFormDepartementsSelection } from "./ListeBlancheIndividuelFormDepartementsSelection";
import { ListeBlancheIndividuelFormDepartementsSelector } from "./ListeBlancheIndividuelFormDepartementsSelector";

const lbSchema = ({ apolloClient, isCreate }) =>
  yup.object().shape({
    adresse: yup.string().required().nullable(),
    adresse_complement: yup.string().optional().nullable(),
    code_postal: yup
      .string()
      .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
      .required(),
    genre: yup.string().required(),
    email: yup.string().required(),
    nom: yup.string().required(),
    prenom: yup.string().required(),
    telephone: yup.string().nullable(),
    siret: yup
      .string()
      .matches(/^[0-9]{14}$/, "Le SIRET doit être composé de 14 chiffres.")
      .required()
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà pour un mandataire sur eMJPM.",
        (value, { parent }) => {
          if (value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateMandataireSIRET(apolloClient, value);
        }
      ),
    ville: yup.string().required(),
    departements: yup
      .array()
      .test(
        "required-oncreate-orif-present-onupdate",
        FORM_REQUIRED_MESSAGE,
        (value, { parent }) => {
          if (isCreate) {
            return true;
          }
          if (
            !parent.initialDepartements ||
            parent.initialDepartements.length === 0
          ) {
            return true;
          }
          return value && value.length > 0;
        }
      ),
  });

export function ListeBlancheIndividuelForm(props) {
  const { handleCancel, data, editMode = false } = props;
  const isCreate = !data;
  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => lbSchema({ apolloClient, isCreate }),
    [apolloClient, isCreate]
  );

  const departements =
    data && data.mandataire_individuel_departements
      ? data.mandataire_individuel_departements.map((item) => {
          return {
            departement_financeur: item.departement_financeur,
            id: item.departement_code,
            nom: DepartementFormUtil.formatDepartementLabel(item.departement),
          };
        })
      : [];

  const formik = useFormik({
    initialValues: {
      adresse: data?.adresse || "",
      adresse_complement: data?.adresse_complement || "",
      code_postal: data?.code_postal || "",
      departements,
      email: data?.email || "",
      telephone: data?.telephone || "",
      nom: data?.nom || "",
      prenom: data?.prenom || "",
      genre: data?.genre || "",
      siret: data?.siret || "",
      ville: data?.ville || "",
      initialSiret: data?.siret || "",
      initialDepartements: departements,
    },
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        props.handleSubmit(values);
        setSubmitting(false);
      } catch (err) {
        if (err.message.includes("liste_blanche_siret_unique")) {
          setFieldError("siret", "Le siret renseigné est déjà existant");
        }

        if (err.message.includes("liste_blanche_email_unique")) {
          setFieldError("email", "L'email renseigné est déjà existant");
        }
      }
    },
    validationSchema,
  });

  const user = useUser();

  useDebouncedEffect(
    () => {
      let { siret } = formik.values;
      if (!siret) {
        siret = "";
      }
      siret = siret.replace(/\s/g, "");
      siret = siret.substr(0, 14);
      formik.setFieldValue("siret", siret);
    },
    500,
    [formik.values["siret"]]
  );

  const { setFieldValue } = formik;

  const [selectedSiretData, setSelectedSiretData] = useState();
  const setSelectedSiretDataCallback = useCallback(
    ({ data }) => setSelectedSiretData(data),
    [setSelectedSiretData]
  );
  useEffect(() => {
    if (!selectedSiretData) {
      return;
    }
    const {
      nom_raison_sociale,
      l4_declaree,
      l5_declaree,
      code_postal,
      libelle_commune,
      departement,
    } = selectedSiretData;

    setFieldValue("etablissement", nom_raison_sociale || "");
    setFieldValue("adresse", l4_declaree || "");
    setFieldValue("adresse_complement", l5_declaree || "");
    setFieldValue("code_postal", code_postal || "");
    setFieldValue("ville", libelle_commune || "");
    setFieldValue("departement", departement || "");
  }, [selectedSiretData, setFieldValue]);

  const [selectedAdresseData, setSelectedAdresseData] = useState();
  const setSelectedAdresseDataCallback = useCallback(
    ({ data }) => setSelectedAdresseData(data),
    [setSelectedAdresseData]
  );
  useEffect(() => {
    if (!selectedAdresseData) {
      return;
    }
    const { postcode, city } = selectedAdresseData;
    setFieldValue("code_postal", postcode || "");
    setFieldValue("ville", city || "");
  }, [selectedAdresseData, setFieldValue]);

  const mandataire = data?.mandataire;

  return (
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
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeFirstName]}
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeLastName]}
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={validationSchema}
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={validationSchema}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
          />
          <SelectAdresse
            placeholder="Adresse 1"
            id="adresse"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
          />
          <FormGroupInput
            placeholder="Complément"
            id="adresse_complement"
            formik={formik}
            validationSchema={validationSchema}
          />
          <Flex justifyContent="space-between">
            <Box mr={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="code_postal"
                formik={formik}
                required
                validationSchema={validationSchema}
                onChange={(e) => {
                  const { value } = e.target;
                  formik.setFieldValue("code_postal", value);
                  formik.setFieldValue("ville", "");
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
                  required
                  zipcode={formik.values.code_postal}
                  onChange={(value) => formik.setFieldValue("ville", value)}
                  value={formik.values.ville}
                  hasError={formik.touched.ville && formik.errors.ville}
                  size="small"
                  departementFieldId="departement"
                  formik={formik}
                  aria-describedby="msg-ville"
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
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Liste des agréments"}
          </Heading>
          <Text mt={2} mb={1}>
            {
              "Ajouter les départements dans lesquels ce mandataire a un agrément, et sélectionner son département financeur."
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <ListeBlancheIndividuelFormDepartementsSelection
            departements={formik.values.departements}
            editMode={editMode}
            onRemove={(id) => {
              formik.setFieldValue(
                "departements",
                formik.values.departements.filter((d) => d.id !== id)
              );
            }}
            setDepartementFinanceur={(id) => {
              formik.setFieldValue(
                "departements",
                formik.values.departements.map((d) => {
                  return {
                    ...d,
                    departement_financeur: id === d.id,
                  };
                })
              );
            }}
          />

          <div aria-describedby="msg-departements-agrements">
            <ListeBlancheIndividuelFormDepartementsSelector
              departements={formik.values.departements}
              onAdd={(departement) =>
                formik.setFieldValue(
                  "departements",
                  formik.values.departements.concat({
                    ...departement,
                    departement_financeur: false,
                  })
                )
              }
            />
          </div>
          <div id="msg-departements-agrements">
            {(formik.touched.departements || formik.submitCount > 1) && (
              <InlineError
                message={formik.errors.departements}
                fieldId="departements"
              />
            )}
          </div>
        </FormInputBox>
      </Flex>

      {!isCreate && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Informations données par le mandataire individuel"}
            </Heading>
            <Text mt={2} mb={1}>
              {"Ces information sont modifables uniquement par le mandataire"}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            {!mandataire && <Text>Aucun utilisateur associé</Text>}
            {mandataire && (
              <>
                <Input
                  label="SIRET"
                  placeholder=""
                  value={mandataire.siret}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="Civilité"
                  placeholder=""
                  value={
                    mandataire.genre
                      ? GENDER_OPTIONS.find(
                          ({ value }) => value === mandataire.genre
                        ).label
                      : ""
                  }
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="Prénom"
                  placeholder=""
                  value={mandataire.user.prenom}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="NOM"
                  placeholder=""
                  value={mandataire.user.nom}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="Adresse e-mail"
                  placeholder=""
                  value={mandataire.user.email}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  placeholder="Téléphone"
                  value={mandataire.telephone}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  placeholder="Adresse"
                  value={mandataire.adresse}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
              </>
            )}
          </FormInputBox>
        </Flex>
      )}

      <Flex mt={4} justifyContent="flex-end">
        {editMode && isAdmin(user) && (
          <Box>
            <Link to={`/admin/liste-blanche/${data.id}/delete`}>
              <Button mr="2" bg="red">
                Supprimer
              </Button>
            </Link>
          </Box>
        )}
        {handleCancel && (
          <Box>
            <Button
              type="button"
              mr="2"
              variant="outline"
              onClick={handleCancel}
            >
              Annuler
            </Button>
          </Box>
        )}
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            {editMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlancheIndividuelForm;
