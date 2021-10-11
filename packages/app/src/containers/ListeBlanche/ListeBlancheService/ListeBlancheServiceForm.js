import { useState, useEffect, useCallback, useMemo } from "react";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { adminServiceSchema as validationSchema } from "~/validation-schemas/adminServiceSchema";
import {
  Button,
  Heading,
  Select,
  Text,
  InlineError,
  Field,
} from "~/components";
import { GeocodeCities } from "~/components/Geocode";

import { createDepartementOptions, departementList } from "~/utils/geodata";

import SelectSIRET from "~/containers/SelectSIRET";
import SelectAdresse from "~/containers/SelectAdresse";

const findOptionsDepartements = (options, values) => {
  if (!values) {
    return [];
  }
  const codes = values.map(({ departement_code }) => departement_code);
  return options.filter((opt) => codes.includes(opt.value));
};

export function ListeBlancheServiceForm(props) {
  const { handleCancel, handleSubmit, service } = props;
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
      email: service ? service.email : "",
      etablissement: service ? service.etablissement : "",
      lb_adresse: service ? service.lb_adresse : "",
      lb_code_postal: service ? service.lb_code_postal : "",
      lb_ville: service ? service.lb_ville : "",
      org_adresse: service ? service.org_adresse : "",
      org_code_postal: service ? service.org_code_postal : "",
      org_gestionnaire: service ? service.org_gestionnaire : "",
      org_nom: service ? service.org_nom : "",
      org_ville: service ? service.org_ville : "",
      siret: service ? service.siret || "" : "",
      telephone: service ? service.telephone : "",
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

  const lbVilleDepartement = formik.values["lb_ville_departement"];
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
    setFieldValue("lb_adresse", l4_declaree || "");
    setFieldValue("lb_code_postal", code_postal || "");
    setFieldValue("lb_ville", libelle_commune || "");
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
    const { postcode, city } = selectedAdresseData;
    setFieldValue("lb_code_postal", postcode || "");
    setFieldValue("lb_ville", city || "");
  }, [selectedAdresseData, setFieldValue]);

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Service tutelaire"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Renseignez le département qui finance le service tutelaire."}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
          />
          <FormGroupInput
            placeholder="Nom du service"
            id="etablissement"
            formik={formik}
            validationSchema={validationSchema}
          />
          <SelectAdresse
            placeholder="Adresse"
            id="lb_adresse"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
          />
          <Flex justifyContent="space-between">
            <Box mr={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="lb_code_postal"
                formik={formik}
                required
                validationSchema={validationSchema}
                onChange={(e) => {
                  const { value } = e.target;
                  formik.setFieldValue("lb_code_postal", value);
                  formik.setFieldValue("lb_ville", "");
                  formik.setFieldValue("lb_ville_departement", "");
                }}
                hasError={
                  formik.touched.lb_code_postal && formik.errors.lb_code_postal
                }
                size="small"
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <GeocodeCities
                  placeholder="Ville"
                  id="lb_ville"
                  required
                  zipcode={formik.values.lb_code_postal}
                  onChange={(value) => formik.setFieldValue("lb_ville", value)}
                  value={formik.values.lb_ville}
                  hasError={formik.touched.lb_ville && formik.errors.lb_ville}
                  size="small"
                  departementFieldId="lb_ville_departement"
                  formik={formik}
                  aria-describedby="msg-lb_ville"
                />
                <div id="msg-lb_ville">
                  {formik.touched.lb_ville && formik.errors.lb_ville && (
                    <InlineError
                      message={formik.errors.lb_ville}
                      fieldId="lb_ville"
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
            {"Contact"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Email"
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
