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
import { Button, Heading, Text } from "~/components";
import {
  createDepartementOptions,
  departementList,
  getDepartementByCodePostal,
} from "~/utils/geodata";

import SelectSIRET from "~/containers/SelectSIRET";
import SelectAdresse from "~/containers/SelectAdresse";
import SelectVille from "~/containers/SelectVille";

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
      departement: service ? "" + service.departement.id : "",
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
  useDebouncedEffect(
    () => {
      let codePostal = formik.values["lb_code_postal"];
      if (!codePostal) {
        codePostal = "";
      }
      codePostal = codePostal.replace(/\s/g, "");
      getDepartementByCodePostal(codePostal).then((departement) => {
        if (!departement) {
          setFieldValue("lb_code_postal", codePostal);
          return;
        }
        formik.setValues({
          ...formik.values,
          departement: departement,
          lb_code_postal: codePostal,
        });
      });
    },
    500,
    [formik.values["lb_code_postal"]]
  );

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
      code_postal,
      libelle_commune,
      departement,
    } = selectedSiretData;

    formik.setValues({
      ...formik.values,
      etablissement: nom_raison_sociale || "",
      lb_adresse: l4_declaree || "",
      lb_code_postal: code_postal || "",
      lb_ville: libelle_commune || "",
      departement: departement || "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSiretData]);

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
    formik.setValues({
      ...formik.values,
      lb_code_postal: postcode || "",
      lb_ville: city || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAdresseData]);

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <Flex>
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="lb_code_postal"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Box>
            <Box flex={1 / 2} pl={1}>
              <SelectVille
                placeholder="Ville"
                id="lb_ville"
                formik={formik}
                validationSchema={validationSchema}
                codePostal={formik.values["lb_code_postal"]}
              />
            </Box>
          </Flex>
          <Box>
            <FormGroupSelect
              id="departement"
              options={departementsOptions}
              placeholder="Département du service"
              formik={formik}
              validationSchema={validationSchema}
            />
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
