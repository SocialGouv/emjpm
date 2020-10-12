import { Button, Card, Heading4, RadioGroup } from "@emjpm/ui";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import AsyncSelect from "react-select/async";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { FormGroupInput } from "../../AppForm";

const validationSchema = yup.object().shape({
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  email: yup.string().required(),
});

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
            rslongue: e.etablissement.rslongue,
            etablissement_rattachement: e.etablissement_rattachement,
          };
        })
      : [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
      label: e.rslongue ? e.rslongue : e.rs,
      value: `${e.id}`,
      checked: e.etablissement_rattachement === true,
      disabled: false, // !canModifyAgrement(user, d.id),
    };
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mt={4}>
        <Card>
          <Flex pr={2} flexDirection="column">
            <Heading4 mb={1}>{"Informations"}</Heading4>
            <FormGroupInput
              placeholder="Nom"
              id="lastname"
              formik={formik}
              validationSchema={validationSchema}
            />
            <FormGroupInput
              placeholder="Prénom"
              id="firstname"
              formik={formik}
              validationSchema={validationSchema}
            />
            <FormGroupInput
              placeholder="Adresse e-mail du mandataire"
              id="email"
              formik={formik}
              validationSchema={validationSchema}
            />
          </Flex>

          <Heading4 mb={1}>{"Liste des établissements"}</Heading4>
          <Text mt={"20px"} mb={2}>
            {`Ajouter les établissements dans lesquels ce mandataire travaille, et sélectionner son établissement de rattachement.`}
          </Text>
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

          <Box>
            <Box mt={2}>
              <AsyncSelect
                name="etablissement"
                instanceId={`etablissement-${data.id || "new"}`}
                cacheOptions
                defaultOptions
                placeholder={"Ajouter un établissement"}
                loadOptions={async (inputValue) => {
                  const values = await searchEtablissements(inputValue);
                  return values.map((e) => ({
                    label: `${e.rslongue ? e.rslongue : e.rs} (${e.ligneacheminement})`,
                    value: e.id,
                  }));
                }}
                onChange={(option) => {
                  if (!etablissementIds.includes(option.value)) {
                    formik.setFieldValue(
                      "etablissements",
                      formik.values.etablissements.concat({
                        id: option.value,
                        rslongue: option.label,
                      })
                    );
                  }
                }}
              />
            </Box>
          </Box>

          <Flex justifyContent="flex-end" mt={4}>
            <Box>
              <Button disabled={formik.isSubmitting} type="submit">
                {editMode ? "Mettre à jour" : "Ajouter"}
              </Button>
            </Box>
          </Flex>
        </Card>
      </Box>
    </form>
  );
};

export default ListeBlanchePreposeForm;
