import { Button, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { adminServiceSchema } from "../../lib/validationSchemas/adminServiceSchema";
import { useDepartementsOptions } from "../../util/departements";
import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "../AppForm";

export const ServiceForm = (props) => {
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
      siret: service ? service.siret || "" : "",
      telephone: service ? service.telephone : "",
    },
    onSubmit: handleSubmit,
    validationSchema: adminServiceSchema,
  });

  const { setFieldValue } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{`Service tutellaire`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Renseignez le département qui finance le service tutellaire.`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Box>
            <FormGroupSelect
              id="departement"
              options={departementsOptions}
              placeholder="Département du service"
              value={formik.values.departement}
              formik={formik}
              validationSchema={adminServiceSchema}
            />
          </Box>
          <FormGroupInput
            placeholder="Siret"
            id="siret"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
          <FormGroupInput
            placeholder="Nom du service"
            id="etablissement"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
          <FormGroupInput
            placeholder="Adresse"
            id="lb_adresse"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
          <Flex>
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="lb_code_postal"
                formik={formik}
                validationSchema={adminServiceSchema}
              />
            </Box>
            <Box flex={1 / 2} pl={1}>
              <FormGroupInput
                placeholder="Ville"
                id="lb_ville"
                formik={formik}
                validationSchema={adminServiceSchema}
              />
            </Box>
          </Flex>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{`Contact`}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
          <FormGroupInput
            placeholder="Téléphone"
            id="telephone"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{`Organisme gestionnaire`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`L'organisme gestionnaire est-il différent du service?`}
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
            validationSchema={adminServiceSchema}
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
                validationSchema={adminServiceSchema}
              />
              <FormGroupInput
                placeholder="Adresse"
                id="org_adresse"
                formik={formik}
                validationSchema={adminServiceSchema}
              />
              <Flex>
                <Box flex={1 / 2}>
                  <FormGroupInput
                    placeholder="Code postal"
                    id="org_code_postal"
                    formik={formik}
                    validationSchema={adminServiceSchema}
                  />
                </Box>
                <Box flex={1 / 2} pl={1}>
                  <FormGroupInput
                    placeholder="Ville"
                    id="org_ville"
                    formik={formik}
                    validationSchema={adminServiceSchema}
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
};

export default ServiceForm;
