import { useCallback, useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { Box, Flex, Text } from "rebass";

import { useApolloClient } from "@apollo/client";

import { checkDuplicateListeBlancheSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";
import yup, {
  FORM_REQUIRED_MESSAGE,
  CODE_POSTAL_NOT_VALID,
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  TELEPHONE_NOT_VALID,
  SIRET_NOT_VALID,
} from "~/validation-schemas/yup";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import useUser from "~/hooks/useUser";
import {
  Button,
  Heading,
  Field,
  InlineError,
  Input,
  SrOnly,
} from "~/components";
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

import ListeBlancheDpfiFormDepartementsSelection from "./ListeBlancheDpfiFormDepartementsSelection";
import ListeBlancheDpfiFormDepartementsSelector from "./ListeBlancheDpfiFormDepartementsSelector";

const lbSchema = ({ apolloClient, isCreate }) =>
  yup.object().shape({
    adresse: yup.string().required().nullable(),
    adresse_complement: yup.string().optional().nullable(),
    code_postal: yup
      .string()
      .matches(/^[0-9]{5}$/, CODE_POSTAL_NOT_VALID)
      .required(CODE_POSTAL_NOT_VALID),
    genre: yup.string().required(),
    email: yup.string().required(EMAIL_NOT_VALID),
    nom: yup.string().required(NOM_NOT_VALID),
    prenom: yup.string().required(PRENOM_NOT_VALID),
    telephone: yup.string().nullable(TELEPHONE_NOT_VALID),
    siret: yup
      .string()
      .nullable()
      .matches(/^[0-9]{14}$/, SIRET_NOT_VALID)
      .required(SIRET_NOT_VALID)
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà dans la liste blanche sur eMJPM.",
        (value, { parent }) => {
          if (!value || value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateListeBlancheSIRET(apolloClient, value);
        }
      ),
    ville: yup.string().required(),
    departements: yup
      .array()
      .test(
        "required-oncreate-orif-present-onupdate",
        FORM_REQUIRED_MESSAGE,
        (value, { parent }) => {
          if (
            !isCreate &&
            (!parent.initialDepartements ||
              parent.initialDepartements.length === 0)
          ) {
            return true;
          }
          return value && value.length > 0;
        }
      )
      .test(
        "required-financeur",
        "Veuillez sélectionner un département financeur",
        (value, { parent }) => {
          if (
            !isCreate &&
            (!parent.initialDepartements ||
              parent.initialDepartements.length === 0)
          ) {
            return true;
          }
          return (
            value &&
            value.length > 0 &&
            value.some((v) => v.departement_financeur)
          );
        }
      ),
  });

export function ListeBlancheDpfiForm(props) {
  const { handleCancel, data, editMode = false } = props;
  const isCreate = !data;
  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => lbSchema({ apolloClient, isCreate }),
    [apolloClient, isCreate]
  );

  const departements =
    data && data.dpfi_departements
      ? data.dpfi_departements.map((item) => {
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
      nom: normalizeLastName(data?.nom || ""),
      prenom: normalizeFirstName(data?.prenom || ""),
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

  const mandataire = data?.dpfi;

  const isAdmin = user.type === "admin";

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex role="group" aria-labelledby="informations_individuelles">
        <FormGrayBox>
          <Heading size={4} mb={1} id="informations_individuelles">
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
            ariaLabel="Votre civilité"
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeFirstName]}
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeLastName]}
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={validationSchema}
            ariaLabel="Votre email"
            ariaDescribedBy="email_format_attendu"
          />
          <SrOnly id="email_format_attendu">
            format attendu : nom@justice.fr
          </SrOnly>
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={validationSchema}
              ariaLabel="Votre téléphone"
              ariaDescribedBy="telephone_format_attendu"
            />
            <SrOnly id="email_format_attendu">
              format attendu : 0601020304
            </SrOnly>
          </Box>
        </FormInputBox>
      </Flex>
      <Flex role="group" aria-labelledby="structure_juridique">
        <FormGrayBox>
          <Heading size={4} mb={1} id="structure_juridique">
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
            aria-label="Numéro de siret"
          />
          <SelectAdresse
            placeholder="Adresse 1"
            id="adresse"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
            aria-label="Votre adresse"
          />
          <FormGroupInput
            placeholder="Complément"
            id="adresse_complement"
            formik={formik}
            validationSchema={validationSchema}
            autoComplete="address-line2"
            ariaLabel="Complément d'adresse"
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
                autoComplete="postal-code"
                ariaLabel="Code postal"
                ariaDescribedBy="code_postal_format_attendu"
              />
              <SrOnly id="code_postal_format_attendu">
                format attendu : 75001.
              </SrOnly>
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
                  aria-label="Votre ville"
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
      <Flex role="group" aria-labelledby="liste_des_agrements">
        <FormGrayBox>
          <Heading size={4} mb={1} id="mandataire">
            {"Liste des agréments"}
          </Heading>
          <Text mt={2} mb={1}>
            {
              "Ajouter les départements dans lesquels ce mandataire a un agrément, et sélectionner son département financeur."
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <ListeBlancheDpfiFormDepartementsSelection
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
            <ListeBlancheDpfiFormDepartementsSelector
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
              onBlur={() => {
                formik.setTouched({
                  ...formik.touched,
                  ["departements"]: true,
                });
              }}
              hasError={
                formik.errors.departements &&
                (formik.touched.departements || formik.submitCount > 0)
              }
              required
            />
          </div>
          <div id="msg-departements-agrements">
            {(formik.touched.departements || formik.submitCount > 0) && (
              <InlineError
                message={formik.errors.departements}
                fieldId="departements"
              />
            )}
          </div>
        </FormInputBox>
      </Flex>
      {!isCreate && (
        <Flex role="group" aria-labelledby="informations_mandataire">
          <FormGrayBox>
            <Heading size={4} mb={1} id="informations_mandataire">
              {"Informations données par le DPF individuel"}
            </Heading>
            <Text mt={2} mb={1}>
              {"Ces informations sont modifables uniquement par le mandataire"}
            </Text>
            {isAdmin && mandataire && (
              <Button
                as="a"
                type={null}
                href={`/admin/users/${mandataire.user.id}`}
                title="Profil de l'utilisateur"
                aria-label="Profil de l'utilisateur"
              >
                <span role="img" aria-labelledby="user-profile-link">
                  🧑
                </span>
                <span id="user-profile-link"> Profil de l'utilisateur</span>
              </Button>
            )}
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
                  aria-describedby="siret_format_attendu"
                />
                <SrOnly id="siret_format_attendu">
                  format attendu : 82254321300027.
                </SrOnly>
                <Input
                  label="Civilité"
                  placeholder=""
                  value={
                    mandataire.user.genre
                      ? GENDER_OPTIONS.find(
                          ({ value }) => value === mandataire.user.genre
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
                  aria-describedby="email_format_attendu"
                />
                <SrOnly id="email_format_attendu">
                  format attendu : nom@justice.fr
                </SrOnly>
                <Input
                  placeholder="Téléphone"
                  value={mandataire.telephone}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                  aria-describedby="telephone_format_attendu"
                />
                <SrOnly id="telephone_format_attendu">
                  format attendu : 0601020304
                </SrOnly>
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
        {editMode && isAdmin && (
          <Box>
            <Button
              mr="2"
              bg="red"
              as="a"
              type={null}
              href={`/admin/liste-blanche/${data.id}/delete`}
              title="Supprimer la liste blanche"
              aria-label="Supprimer la liste blanche"
            >
              Supprimer
            </Button>
          </Box>
        )}
        {handleCancel && (
          <Box>
            <Button
              type="button"
              mr="2"
              variant="outline"
              onClick={handleCancel}
              title={
                editMode
                  ? "Annuler la jour les informations du mandataire"
                  : "Annuler l'enregistrement des informations du mandataire"
              }
              aria-label={
                editMode
                  ? "Annuler la jour les informations du mandataire"
                  : "Annuler l'enregistrement des informations du mandataire"
              }
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
            title={
              editMode
                ? "Mettre à jour les informations du mandataire"
                : "Enregistrer les informations du mandataire"
            }
            aria-label={
              editMode
                ? "Mettre à jour les informations du mandataire"
                : "Enregistrer les informations du mandataire"
            }
          >
            {editMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlancheDpfiForm;
