import { Button, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { Box, Flex, Text } from "rebass";

export const ListeBlancheAjoutPreposeForm = (props) => {
  const { searchEtablissements, handleSubmit } = props;
  const [etablissements, setEtablissements] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      searchEtablissement: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (handleSubmit) {
        await handleSubmit(values);
      }
      setSubmitting(false);
    },
  });

  const etablissementIds = etablissements.map((e) => e.id);

  return (
    <form onSubmit={formik.onSubmit}>
      <Flex>
        <Box mr={1} flex={1 / 2}>
          <Input
            value={formik.values.firstname}
            id="firstname"
            name="firstname"
            hasError={formik.errors.firstname && formik.touched.firstname}
            onChange={formik.handleChange}
            placeholder="Prénom"
          />
          <InlineError message={formik.errors.firstname} fieldId="firstname" />
        </Box>
        <Box ml={1} flex={1 / 2}>
          <Input
            value={formik.values.lastname}
            id="lastname"
            name="lastname"
            hasError={formik.errors.lastname && formik.touched.lastname}
            onChange={formik.handleChange}
            placeholder="Nom"
          />
          <InlineError message={formik.errors.lastname} fieldId="lastname" />
        </Box>
      </Flex>
      <Box mt={4}>
        <Input
          value={formik.values.email}
          id="email"
          name="email"
          type="email"
          hasError={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        <InlineError message={formik.errors.email} fieldId="email" />
      </Box>

      {etablissements.length > 0 && (
        <Box mt={4}>
          <Text mb={2} fontWeight="bold">
            Etablissements ajoutés
          </Text>
          {etablissements.map((etablissement) => {
            return <div key={etablissement.id}>{etablissement.nom}</div>;
          })}
        </Box>
      )}

      <Box mt={4}>
        <AsyncSelect
          name="etablissement"
          cacheOptions
          defaultOptions
          placeholder={"Ajouter un établissement"}
          loadOptions={async (inputValue) => {
            const values = await searchEtablissements(inputValue);
            return values.map((e) => ({
              label: e.nom,
              value: e.id,
            }));
          }}
          onChange={(option) => {
            if (!etablissementIds.includes(option.value)) {
              setEtablissements(etablissements.concat({ id: option.value, nom: option.label }));
            }
          }}
          value={undefined}
        />
      </Box>
      <Flex justifyContent="flex-end" mt={4}>
        <Box>
          <Button disabled={formik.isSubmitting} type="submit">
            Ajouter
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default ListeBlancheAjoutPreposeForm;
