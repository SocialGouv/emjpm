import { Button, Heading4 } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Card, Flex } from "rebass";

import { adminServiceSchema } from "../../lib/validationSchemas/adminServiceSchema";
import { useDepartementsOptions } from "../../util/departements";
import { FormGroupInput, FormGroupSelect } from "../AppForm";

export const ServiceForm = (props) => {
  const { handleCancel, handleSubmit, service } = props;
  const { departementsOptions } = useDepartementsOptions();

  const formik = useFormik({
    initialValues: {
      adresse: service ? service.adresse : "",
      code_postal: service ? service.code_postal : "",
      departement: service ? "" + service.departement.code : "",
      email: service ? service.email : "",
      etablissement: service ? service.etablissement : "",
      siret: service ? service.siret || "" : "",
      telephone: service ? service.telephone : "",
      ville: service ? service.ville : "",
    },
    onSubmit: handleSubmit,
    validationSchema: adminServiceSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card m={1}>
        <Heading4 mb={1}>{`Service tutellaire`}</Heading4>
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
        <FormGroupSelect
          id="departement"
          options={departementsOptions}
          placeholder="Département du service"
          value={formik.values.departement}
          formik={formik}
          validationSchema={adminServiceSchema}
        />
      </Card>
      <Flex flexDirection={["column", "row", "row"]}>
        <Card m={1} flex={[1, 1 / 3, 1 / 3]}>
          <Heading4 mb={1}>{`Contact`}</Heading4>
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
        </Card>
        <Card m={1} flex={[1, 2 / 3, 2 / 3]}>
          <Heading4 mb={1}>{`Adresse postale`}</Heading4>
          <FormGroupInput
            placeholder="Adresse"
            id="adresse"
            formik={formik}
            validationSchema={adminServiceSchema}
          />
          <Flex>
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="code_postal"
                formik={formik}
                validationSchema={adminServiceSchema}
              />
            </Box>
            <Box flex={1 / 2} pl={1}>
              <FormGroupInput
                placeholder="Ville"
                id="ville"
                formik={formik}
                validationSchema={adminServiceSchema}
              />
            </Box>
          </Flex>
        </Card>
      </Flex>
      <Flex justifyContent="flex-end">
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
