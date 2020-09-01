import { Button, Card, InlineError, Input, RadioGroup } from "@emjpm/ui";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import AsyncSelect from "react-select/async";
import { Box, Flex, Text } from "rebass";

async function updateEtablissementRattachement(formik, id) {
  if (formik.values.etablissements.length > 0) {
    const idx = formik.values.etablissements.findIndex((e) => e.id === id);
    if (idx !== -1) {
      const newEtablissements = formik.values.etablissements.map((e) => ({
        ...e,
        etablissement_rattachement: false,
      }));
      newEtablissements[idx].etablissement_rattachement = true;
      formik.setFieldValue("etablissements", newEtablissements);
    }
  }
}

export const ListeBlanchePreposeForm = (props) => {
  const { searchEtablissements, editMode, data = {}, handleSubmit } = props;

  const initialValues = {
    firstname: data.nom || "",
    lastname: data.prenom || "",
    email: data.email || "",
    etablissements: data.lb_user_etablissements
      ? data.lb_user_etablissements.map((e) => {
          return {
            id: e.etablissement.id,
            nom: e.etablissement.nom,
            etablissement_rattachement: e.etablissement_rattachement,
          };
        })
      : [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        if (handleSubmit) {
          await handleSubmit(values);
        }
      } catch (error) {
        if (error.message.includes("lb_users_email_unique")) {
          setFieldError(
            "email",
            "L'email renseigné est déja utilisé pour un autre enregistrement de la liste blanche"
          );
        }
      }
      setSubmitting(false);
    },
  });

  const etablissementIds = formik.values.etablissements.map((e) => e.id);
  const etablissementOptions = formik.values.etablissements.map((e) => {
    return {
      label: e.nom,
      value: `${e.id}`,
      checked: e.etablissement_rattachement === true,
      disabled: false, // !canModifyAgrement(user, d.id),
    };
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <Box mr={1} flex={1 / 2}>
          <Input
            value={formik.values.firstname}
            id="firstname"
            name="firstname"
            required
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
            required
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

      <Card mt={4}>
        {formik.values.etablissements.length > 0 && (
          <Box mb={4}>
            <Text fontWeight="bold">Etablissements ajoutés</Text>

            <Text mt={"20px"} mb={2}>{`Sélectionner l'établissement de rattachement:`}</Text>

            <RadioGroup
              options={etablissementOptions}
              onValueChange={async (value) => {
                await updateEtablissementRattachement(formik, Number(value));
              }}
              renderRadioLabel={(etablissement) => {
                return (
                  <Fragment>
                    <Text>{etablissement.label}</Text>
                    <Box
                      ml={2}
                      sx={{
                        cursor: "pointer",
                        color: "#777",
                        ":hover": {
                          color: "#aa2d2d",
                        },
                      }}
                    >
                      <XCircle
                        size={24}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          formik.setFieldValue(
                            "etablissements",
                            formik.values.etablissements.filter(
                              (value) => value.id !== Number(etablissement.id)
                            )
                          );
                        }}
                      />
                    </Box>
                  </Fragment>
                );
              }}
            />
          </Box>
        )}

        <Box>
          <Text fontWeight="bold">Ajouter un établissement</Text>
          <Box mt={2}>
            <AsyncSelect
              name="etablissement"
              instanceId={`etablissement-${data.id || "new"}`}
              cacheOptions
              defaultOptions
              placeholder={"Sélectionner un établissement"}
              loadOptions={async (inputValue) => {
                const values = await searchEtablissements(inputValue);
                return values.map((e) => ({
                  label: e.nom,
                  value: e.id,
                }));
              }}
              onChange={(option) => {
                if (!etablissementIds.includes(option.value)) {
                  formik.setFieldValue(
                    "etablissements",
                    formik.values.etablissements.concat({ id: option.value, nom: option.label })
                  );
                }
              }}
            />
          </Box>
        </Box>
      </Card>
      <Flex justifyContent="flex-end" mt={4}>
        <Box>
          <Button disabled={formik.isSubmitting} type="submit">
            {editMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default ListeBlanchePreposeForm;
