import { useState, useEffect, useCallback, useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";

import { useApolloClient } from "@apollo/client";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { adminServiceSchema } from "~/validation-schemas/adminServiceSchema";
import {
  Button,
  Heading,
  Select,
  Text,
  InlineError,
  Field,
  Input,
} from "~/components";

import { Link } from "~/containers/Commons";
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

const findOptionsDepartements = (options, values) => {
  if (!values) {
    return [];
  }
  const codes = values.map(({ departement_code }) => departement_code);
  return options.filter((opt) => codes.includes(opt.value));
};

export function ListeBlancheServiceForm(props) {
  const { handleCancel, handleSubmit, lbService } = props;

  const isCreate = !lbService;

  const service = lbService?.service;

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

  const formik = useFormik({
    initialValues: {
      departements:
        service && service.departements
          ? service.departements.map(({ departement }) => ({
              departement_code: departement.id,
            }))
          : "",
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
      siret: lbService ? lbService.siret || "" : "",
      telephone: lbService ? lbService.telephone : "",
      initialSiret: lbService ? lbService.siret || "" : "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const { setFieldValue } = formik;

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

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
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
            validationSchema={validationSchema}
          />
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
          />
          <SelectAdresse
            placeholder="Adresse"
            id="adresse"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
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
              />
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
                  aria-describedby="msg-ville"
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
            <Select
              id="departements"
              validationSchema={validationSchema}
              formik={formik}
              placeholder="Départements de votre service"
              options={departementsOptions}
              isMulti
              value={findOptionsDepartements(
                departementsOptions,
                formik.values.departements
              )}
              hasError={
                formik.errors.departements && formik.touched.departements
              }
              onChange={(options) => {
                formik.setFieldValue(
                  "departements",
                  (options || []).map((o) => ({ departement_code: o.value }))
                );
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
          <Heading size={4} mb={1}>
            {"Organisme gestionnaire"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"L'organisme gestionnaire est-il différent du service?"}
          </Text>
        </FormGrayBox>
        <FormInputBox>
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
              />
              <FormGroupInput
                placeholder="Adresse"
                id="org_adresse"
                formik={formik}
                validationSchema={validationSchema}
              />
              <Flex>
                <Box flex={1 / 2}>
                  <FormGroupInput
                    placeholder="Code postal"
                    id="org_code_postal"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Box>
                <Box flex={1 / 2} pl={1}>
                  <FormGroupInput
                    placeholder="Ville"
                    id="org_ville"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Box>
              </Flex>
            </>
          )}
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Informations du responsable"}
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
          <FormGroupInput
            placeholder="Téléphone"
            id="telephone"
            formik={formik}
            validationSchema={validationSchema}
          />
        </FormInputBox>
      </Flex>

      {!isCreate && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Informations données par le service"}
            </Heading>
            <Text mt={2} mb={1}>
              {"Ces informations sont modifables uniquement par le service"}
            </Text>
            {isAdmin &&
              service &&
              service.service_members.map(({ user }) => {
                return (
                  <Link to={`/admin/users/${user.id}`}>
                    <Button style={{ marginBottom: "10px" }}>
                      <span role="img" aria-labelledby="user-profile-link">
                        🧑
                      </span>
                      <span id="user-profile-link">
                        {" "}
                        Profil de l'utilisateur {user.prenom} {user.nom}
                      </span>
                    </Button>
                  </Link>
                );
              })}
          </FormGrayBox>
          <FormInputBox>
            <Input
              label="Nom du service"
              placeholder=""
              value={service.etablissement}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
            <Input
              label="SIRET"
              placeholder=""
              value={service.siret}
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
            />
            <Input
              label="Code postal"
              placeholder=""
              value={service.code_postal}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
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
            />
            <Input
              label="Prénom"
              placeholder=""
              value={service.prenom}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
            <Input
              label="NOM"
              placeholder=""
              value={service.nom}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
            <Input
              label="Adresse e-mail"
              placeholder=""
              value={service.email}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
            <Input
              placeholder="Téléphone"
              value={service.telephone}
              forceActive
              readOnly
              containerStyle={readOnlyContainerStyle}
              style={readOnlyInputStyle}
            />
          </FormInputBox>
        </Flex>
      )}

      <Flex justifyContent="flex-end" p={1}>
        {handleCancel && (
          <Box>
            <Button mr="2" variant="outline" onClick={handleCancel}>
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
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlancheServiceForm;
