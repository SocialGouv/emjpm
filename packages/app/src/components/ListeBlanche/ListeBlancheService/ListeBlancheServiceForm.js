import { useState, useEffect } from "react";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { adminServiceSchema as validationSchema } from "~/lib/validationSchemas/adminServiceSchema";
import { Button, Heading4, Text } from "~/ui";
import { useDepartementsOptions } from "~/util/departements";
import { getDepartementByCodePostal } from "~/util/codePostal";
import SelectSIREN from "~/components/SelectSIREN";
import SelectAdresse from "~/components/SelectAdresse";
import SelectVille from "~/components/SelectVille";

export function ListeBlancheServiceForm(props) {
  const { handleCancel, handleSubmit, service } = props;
  const { departementsOptions } = useDepartementsOptions();

  const formik = useFormik({
    initialValues: {
      departement: service ? "" + service.departement.code : "",
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
      siren: service ? service.siren || "" : "",
      telephone: service ? service.telephone : "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const { setFieldValue } = formik;

  useDebouncedEffect(
    () => {
      let { siren } = formik.values;
      if (!siren) {
        siren = "";
      }
      siren = siren.replace(/\s/g, "");
      siren = siren.substr(0, 9);
      formik.setFieldValue("siren", siren);
    },
    500,
    [formik.values["siren"]]
  );
  useDebouncedEffect(
    () => {
      let codePostal = formik.values["lb_code_postal"];
      if (!codePostal) {
        codePostal = "";
      }
      codePostal = codePostal.replace(/\s/g, "");
      getDepartementByCodePostal(codePostal).then((departement) => {
        if (!departement) return;
        formik.setFieldValue("departement", departement.toString());
      });
      formik.setFieldValue("lb_code_postal", codePostal);
    },
    500,
    [formik.values["lb_code_postal"]]
  );

  const [selectedSirenData, setSelectedSirenData] = useState();
  useEffect(() => {
    if (!selectedSirenData) {
      return;
    }
    const {
      nom_raison_sociale,
      l4_declaree,
      code_postal,
      libelle_commune,
      departement,
    } = selectedSirenData;
    formik.setValues({
      ...formik.values,
      etablissement: nom_raison_sociale || "", // https://sirene.fr/sirene/public/variable/l4-declaree
      lb_adresse: l4_declaree || "", // https://sirene.fr/sirene/public/variable/l4-declaree
      lb_code_postal: code_postal || "",
      lb_ville: libelle_commune || "",
      departement: departement || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSirenData]);

  const [selectedAdresseData, setSelectedAdresseData] = useState(() => ({}));
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
          <Heading4 mb={1}>{"Service tutelaire"}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {"Renseignez le département qui finance le service tutelaire."}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <SelectSIREN
            id="siren"
            formik={formik}
            validationSchema={validationSchema}
            dataSetter={setSelectedSirenData}
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
            dataSetter={setSelectedAdresseData}
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
          <Heading4 mb={1}>{"Contact"}</Heading4>
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
          <Heading4 mb={1}>{"Organisme gestionnaire"}</Heading4>
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
              setFieldValue("org_gestionnaire", value);
              setFieldValue("org_nom", "");
              setFieldValue("org_adresse", "");
              setFieldValue("org_code_postal", "");
              setFieldValue("org_ville", "");
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
