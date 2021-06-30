import { useFormik, FieldArray, FormikProvider } from "formik";
import { useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { Link } from "~/components/Link";
import { serviceSchema } from "~/validation-schemas/serviceSchema";
import {
  Button,
  Field,
  Heading,
  InlineError,
  Select,
  Textarea,
} from "~/components";
import { findOptions } from "~/utils/form";

function buildTiOptions(tis) {
  const tiOptions = tis.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));
  return { tiOptions };
}

function ServiceEditInformationsForm(props) {
  const { handleSubmit, cancelLink, service, errorMessage } = props;

  const {
    departements,
    service_tis,
    service_departements,
    dispo_departements,
  } = service;

  const tis = departements.reduce((acc, { tis }) => {
    acc.push(...tis);
    return acc;
  }, []);

  const { tiOptions } = useMemo(() => {
    return buildTiOptions(tis);
  }, [tis]);

  const formik = useFormik({
    initialValues: {
      competences: service.competences || "",
      dispo_max: service.dispo_max || "",
      email: service.email || "",
      geocode: geocodeInitialValue(service),
      information: service.information || "",
      nom: service.nom || "",
      prenom: service.prenom || "",
      telephone: service.telephone || "",
      tis: service_tis.map(({ ti }) => ti.id),
      dispo_departements: service_departements.map(({ departement_code }) => ({
        departement_code,
        dispo:
          dispo_departements.find(
            (row) => row.departement_code === departement_code
          )?.dispo || null,
      })),
    },
    onSubmit: handleSubmit,
    validationSchema: serviceSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Responsable"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              placeholder="Nom"
              id="nom"
              formik={formik}
              validationSchema={serviceSchema}
            />
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Prénom"
                id="prenom"
                formik={formik}
                validationSchema={serviceSchema}
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
              placeholder="Email"
              id="email"
              formik={formik}
              validationSchema={serviceSchema}
            />
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Téléphone"
                id="telephone"
                formik={formik}
                validationSchema={serviceSchema}
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
                resource={service}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              />
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
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
              />
              {formik.touched.tis && (
                <InlineError message={formik.errors.tis} fieldId="tis" />
              )}
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
            <FormGroupInput
              placeholder="Nombre de mesures souhaité"
              id="dispo_max"
              formik={formik}
              validationSchema={serviceSchema}
            />
            <Box>
              <FieldArray
                name="dispo_departements"
                render={() => (
                  <Box>
                    <Heading size={5} mb={1}>
                      {"Disponibilités par département"}
                    </Heading>
                    <Box>
                      {formik.values.dispo_departements.map((row, index) => (
                        <Box key={row.departement_code}>
                          <FormGroupInput
                            placeholder={`Nombre de mesures souhaitées dans le ${row.departement_code}`}
                            id={`dispo_departements[${index}].dispo`}
                            value={row.dispo}
                            formik={formik}
                            validationSchema={serviceSchema}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              />
            </Box>
            <Box>
              <Textarea
                value={formik.values.competences}
                id="competences"
                name="competences"
                error={formik.errors.competences}
                onChange={formik.handleChange}
                label="Informations à destination du magistrat"
                placeholder="Préférences géographiques, compétences, langues parlées, ..."
              />
              <InlineError
                message={formik.errors.competences}
                fieldId="competences"
              />
            </Box>
          </FormInputBox>
        </Flex>
        {errorMessage && <InlineError message={`${errorMessage}`} />}
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
    </FormikProvider>
  );
}

export { ServiceEditInformationsForm };
