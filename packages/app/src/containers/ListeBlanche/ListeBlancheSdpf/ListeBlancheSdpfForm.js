import { useState, useEffect, useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { useFormik } from "formik";
import { Box, Flex } from "rebass";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { adminSdpfSchema as adminServiceSchema } from "~/validation-schemas/adminSdpfSchema";
import {
  Button,
  Heading,
  Text,
  InlineError,
  Field,
  Input,
  AccessibleSelect,
  SrOnly,
} from "~/components";

import { GeocodeCities } from "~/components/Geocode";
import { CITY_DEPARTEMENT } from "./queries";

import { createDepartementOptions, departementList } from "~/utils/geodata";

import SelectSIRET from "~/containers/SelectSIRET";
import SelectAdresse from "~/containers/SelectAdresse";

import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

import {
  readOnlyContainerStyle,
  readOnlyInputStyle,
} from "~/containers/ListeBlanche/style";
import useUser from "../../../hooks/useUser";

const findOptionsDepartements = (options, value) => {
  if (!value) {
    return null;
  }

  return options.find((op) => op.value === value);
};

export function ListeBlancheSdpfForm(props) {
  const { handleCancel, handleSubmit, lbService, originalSiret } = props;

  const isCreate = !lbService;

  const service = lbService?.sdpf;

  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => adminServiceSchema({ apolloClient }),
    [apolloClient]
  );

  const departementsOptions = useMemo(
    () =>
      createDepartementOptions(departementList, {
        all: false,
      }),
    []
  );

  function generateSiret(lbService) {
    if (!lbService) {
      return "";
    }
    if (lbService.siret && lbService.siret.startsWith("sdpf_")) {
      return lbService.siret.split("sdpf_")[1];
    }
    return lbService.siret;
  }

  const formik = useFormik({
    initialValues: {
      departement: service?.departement || null,
      genre: lbService ? lbService.genre : "",
      nom: normalizeLastName(lbService ? lbService.nom : ""),
      prenom: normalizeFirstName(lbService ? lbService.prenom : ""),
      email: lbService ? lbService.email : "",
      etablissement: lbService ? lbService.etablissement : "",
      adresse: lbService ? lbService.adresse : "",
      code_postal: lbService ? lbService.code_postal : "",
      ville: lbService ? lbService.ville : "",
      org_adresse: lbService ? lbService.org_adresse : "",
      org_code_postal: lbService ? lbService.org_code_postal : "",
      org_gestionnaire: lbService ? !!lbService.org_gestionnaire : false,
      org_nom: lbService ? lbService.org_nom : "",
      org_ville: lbService ? lbService.org_ville : "",

      siret: generateSiret(lbService),

      telephone: lbService ? lbService.telephone : "",
      initialSiret: lbService ? lbService.siret || "" : "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    setFieldValue("initialSiret", originalSiret);
  }, [originalSiret, setFieldValue]);

  const departements = formik.values.departements;
  const addDepartementToCurrents = useCallback(
    (departement) => {
      const newDepartementsList = departements || [];
      if (
        departement &&
        !newDepartementsList
          .map(({ departement_code }) => departement_code)
          .includes(departement)
      ) {
        newDepartementsList.push({ departement_code: departement });
      }
      return newDepartementsList;
    },
    [departements]
  );

  useDebouncedEffect(
    () => {
      let { siret } = formik.values;
      if (!siret) {
        siret = "";
      }
      siret = siret.replace(/\s/g, "");
      siret = siret.substr(0, 14);
      setFieldValue("siret", siret);
    },
    500,
    [formik.values["siret"]]
  );

  const [selectedSiretData, setSelectedSiretData] = useState();
  const setSelectedSiretDataCallback = useCallback(
    ({ data }) => setSelectedSiretData(data),
    [setSelectedSiretData]
  );

  const lbVilleDepartement = formik.values["ville_departement"];
  useEffect(() => {
    const departements = addDepartementToCurrents(lbVilleDepartement);
    if (departements) setFieldValue("departements", departements);
  }, [lbVilleDepartement, setFieldValue, addDepartementToCurrents]);

  useEffect(() => {
    if (!selectedSiretData) {
      return;
    }
    const {
      nom_raison_sociale,
      l4_declaree,
      code_postal,
      libelle_commune,
      departement,
    } = selectedSiretData;

    const departements = addDepartementToCurrents(departement);

    setFieldValue("etablissement", nom_raison_sociale || "");
    setFieldValue("adresse", l4_declaree || "");
    setFieldValue("code_postal", code_postal || "");
    setFieldValue("ville", libelle_commune || "");
    setFieldValue("departements", departements || []);
  }, [selectedSiretData, setFieldValue, addDepartementToCurrents]);

  const [selectedAdresseData, setSelectedAdresseData] = useState();
  const setSelectedAdresseDataCallback = useCallback(
    ({ data }) => setSelectedAdresseData(data),
    [setSelectedAdresseData]
  );

  useEffect(() => {
    if (!selectedAdresseData) {
      return;
    }
    const { postcode, city, context } = selectedAdresseData;
    setFieldValue("code_postal", postcode || "");
    setFieldValue("ville", city ? city.toUpperCase() : "");
    if (context) {
      const [departement] = context.split(",");
      const departements = addDepartementToCurrents(departement);
      setFieldValue("departements", departements);
    }
  }, [selectedAdresseData, setFieldValue, addDepartementToCurrents]);

  useEffect(() => {
    (async () => {
      const ville = formik.values.ville;
      if (!ville) {
        return;
      }
      const { data } = await apolloClient.query({
        query: CITY_DEPARTEMENT,
        variables: {
          city: ville.replace(/-/g, " ").toUpperCase(),
        },
      });
      if (
        data.geolocalisation_code_postal.length &&
        data.geolocalisation_code_postal[0].departement_code
      ) {
        setFieldValue(
          "ville_departement",
          data.geolocalisation_code_postal[0].departement_code
        );
      }
    })();
  }, [formik.values.ville, setFieldValue, apolloClient]);

  const user = useUser();
  const isAdmin = user.type === "admin";

  console.log(service);
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="structure_juridique_heading">
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="structure_juridique_heading"
        >
          <FormGroupInput
            placeholder="Nom du service"
            id="etablissement"
            formik={formik}
            validationSchema={validationSchema}
            autoComplete="organization"
            ariaLabel="Nom du service"
          />
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
            aria-label="Numéro de siret"
          />
          <SelectAdresse
            placeholder="Adresse"
            id="adresse"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
            aria-label="Votre adresse"
          />
          <Flex justifyContent="space-between">
            <Box mr={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="code_postal"
                formik={formik}
                required
                validationSchema={validationSchema}
                onInput={(e) => {
                  const { value } = e.target;
                  formik.setFieldValue("code_postal", value);
                  formik.setFieldValue("ville", "");
                  formik.setFieldValue("ville_departement", "");
                }}
                hasError={
                  formik.touched.code_postal && formik.errors.code_postal
                }
                size="small"
                autoComplete="postal-code"
                ariaLabel="Code postal"
                ariaDescribedBy={"code_postal_format_attendu"}
              />
              <SrOnly id="code_postal_format_attendu">
                format attendu : 75001
              </SrOnly>
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <GeocodeCities
                  placeholder="Ville"
                  id="ville"
                  required
                  zipcode={formik.values.code_postal}
                  onChange={(value) => formik.setFieldValue("ville", value)}
                  value={formik.values.ville}
                  hasError={formik.touched.ville && formik.errors.ville}
                  size="small"
                  departementFieldId="ville_departement"
                  formik={formik}
                  aria-describedby="msg-ville-select"
                />
                <div id="msg-ville">
                  {formik.touched.ville && formik.errors.ville && (
                    <InlineError
                      message={formik.errors.ville}
                      fieldId="ville"
                    />
                  )}
                </div>
              </Field>
            </Box>
          </Flex>
          <Box>
            <AccessibleSelect
              id="departements"
              validationSchema={validationSchema}
              formik={formik}
              placeholder="Départements de votre service"
              options={departementsOptions}
              value={findOptionsDepartements(
                departementsOptions,
                formik.values.departement
              )}
              hasError={
                formik.errors.departements && formik.touched.departements
              }
              onChange={(selected) => {
                formik.setFieldValue("departement", selected.value);
              }}
              aria-describedby="msg-departements"
            />
            <div id="msg-departements">
              {formik.touched.departements && (
                <InlineError
                  message={formik.errors.departements}
                  fieldId="departements"
                />
              )}
            </div>
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="organisme_gestionnaire_heading">
            {"Organisme gestionnaire"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"L'organisme gestionnaire est-il différent du service?"}
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="organisme_gestionnaire_heading"
        >
          <FormGroupSelect
            id="org_gestionnaire"
            options={[
              {
                label: "L'organisme gestionnaire est identique",
                value: false,
              },
              {
                label: "L'organisme gestionnaire est différent",
                value: true,
              },
            ]}
            placeholder="L'organisme gestionnaire est-il différent du service?"
            value={formik.values.org_gestionnaire}
            formik={formik}
            validationSchema={validationSchema}
            onChange={({ value }) => {
              formik.setValues({
                ...formik.values,
                org_gestionnaire: value,
                org_nom: "",
                org_adresse: "",
                org_code_postal: "",
                org_ville: "",
              });
            }}
          />
          {formik.values.org_gestionnaire === true && (
            <>
              <FormGroupInput
                placeholder="Nom"
                id="org_nom"
                formik={formik}
                validationSchema={validationSchema}
                autoComplete="organization"
                ariaLabel="Votre nom"
              />
              <FormGroupInput
                placeholder="Adresse"
                id="org_adresse"
                formik={formik}
                validationSchema={validationSchema}
                autoComplete="address-line1"
                ariaLabel="Adresse"
              />
              <Flex>
                <Box flex={1 / 2}>
                  <FormGroupInput
                    placeholder="Code postal"
                    id="org_code_postal"
                    formik={formik}
                    validationSchema={validationSchema}
                    autoComplete="postal-code"
                    ariaLabel="Code postal"
                  />
                </Box>
                <Box flex={1 / 2} pl={1}>
                  <FormGroupInput
                    placeholder="Ville"
                    id="org_ville"
                    formik={formik}
                    validationSchema={validationSchema}
                    ariaLabel="Ville"
                  />
                </Box>
              </Flex>
            </>
          )}
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="infos_responsable">
            {"Informations du responsable"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="infos_responsable">
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
          />
          <FormGroupInput
            placeholder="Téléphone"
            id="telephone"
            formik={formik}
            validationSchema={validationSchema}
            ariaLabel="Votre téléphone"
          />
        </FormInputBox>
      </Flex>
      {!isCreate && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1} id="infos_service">
              {"Informations données par le service"}
            </Heading>
            <Text mt={2} mb={1}>
              {"Ces informations sont modifables uniquement par le service"}
            </Text>
            {isAdmin &&
              service &&
              service.sdpf_members.map(({ user }) => {
                return (
                  <Button
                    style={{ marginBottom: "10px" }}
                    as="a"
                    type={null}
                    href={`/admin/users/${user.id}`}
                  >
                    <span role="img" aria-labelledby="user-profile-link">
                      🧑
                    </span>
                    <span id="user-profile-link">
                      {" "}
                      Profil de l'utilisateur {user.prenom} {user.nom}
                    </span>
                  </Button>
                );
              })}
          </FormGrayBox>
          <FormInputBox role="group" aria-labelledby="infos_service">
            <Input
              label="Nom du service"
              placeholder=""
              value={service.etablissement}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Nom du service"
            />
            <Input
              label="SIRET"
              placeholder=""
              value={
                service.siret.startsWith("sdpf_")
                  ? service.siret.split("sdpf_")[1]
                  : service.siret
              }
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
            <Input
              placeholder="Adresse"
              value={service.adresse}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Adresse"
            />
            <Input
              label="Code postal"
              placeholder=""
              value={service.code_postal}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Code postal"
            />

            <Input
              label="Civilité"
              placeholder=""
              value={
                service.genre
                  ? GENDER_OPTIONS.find(({ value }) => value === service.genre)
                      .label
                  : ""
              }
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Civilité"
            />
            <Input
              label="Prénom"
              placeholder=""
              value={service.prenom}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Votre prénom"
            />
            <Input
              label="NOM"
              placeholder=""
              value={service.nom}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Votre nom"
            />
            <Input
              label="Adresse e-mail"
              placeholder=""
              value={service.email}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Votre adresse e-mail"
            />
            <Input
              placeholder="Téléphone"
              value={service.telephone}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
              ariaLabel="Votre téléphone"
            />
          </FormInputBox>
        </Flex>
      )}
      <Flex justifyContent="flex-end" p={1}>
        {handleCancel && (
          <Box>
            <Button
              role="link"
              mr="2"
              variant="outline"
              onClick={handleCancel}
              title="Annuler l'enregistrement des informations du service"
              aria-label="Annuler l'enregistrement des informations du service"
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
            title="Enregistrer les informations du service"
            aria-label="Enregistrer les informations du service"
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlancheSdpfForm;
