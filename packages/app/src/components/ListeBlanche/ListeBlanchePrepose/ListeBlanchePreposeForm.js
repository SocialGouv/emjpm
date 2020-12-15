import { Button, Heading4, RadioGroup } from "@emjpm/ui";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import AsyncSelect from "react-select/async";
import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Commons";
import yup from "~/lib/validationSchemas/yup";

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
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
    email: data.email || "",
    etablissements: data.lb_user_etablissements
      ? data.lb_user_etablissements.map((e) => {
          return {
            etablissement_rattachement: e.etablissement_rattachement,
            id: e.etablissement.id,
            ligneacheminement: e.etablissement.ligneacheminement,
            rslongue: e.etablissement.rslongue,
          };
        })
      : [],
    firstname: data.nom || "",
    lastname: data.prenom || "",
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
    validationSchema,
  });

  const etablissementIds = formik.values.etablissements.map((e) => e.id);
  const etablissementOptions = formik.values.etablissements.map((e) => {
    return {
      checked: e.etablissement_rattachement === true,
      disabled: false,
      label: `${e.rslongue} (${e.ligneacheminement})`,
      value: `${e.id}`, // !canModifyAgrement(user, d.id),
    };
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Informations"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
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
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Liste des établissements"}</Heading4>
          <Text mt={"20px"} mb={2}>
            {`Ajouter les établissements dans lesquels ce mandataire travaille, et sélectionner son établissement de rattachement.`}
          </Text>
        </FormGrayBox>
        <FormInputBox>
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
                      ":hover": {
                        color: "#aa2d2d",
                      },
                      color: "#777",
                      cursor: "pointer",
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
                placeholder={"recherche par nom, finess, code postal, ville."}
                loadOptions={async (inputValue) => {
                  const values = await searchEtablissements(inputValue);
                  return values.map((e) => {
                    return {
                      label: `${e.rslongue} (${e.ligneacheminement})`,
                      ligneacheminement: e.ligneacheminement,
                      rslongue: e.rslongue,
                      value: e.id,
                    };
                  });
                }}
                onChange={(option) => {
                  if (!etablissementIds.includes(option.value)) {
                    formik.setFieldValue(
                      "etablissements",
                      formik.values.etablissements.concat({
                        id: option.value,
                        ligneacheminement: option.ligneacheminement,
                        rslongue: option.rslongue,
                      })
                    );
                  }
                }}
              />
            </Box>
          </Box>
        </FormInputBox>
      </Flex>
      <Flex justifyContent="flex-end" mt={4}>
        <Box>
          <Link
            href={`/admin/liste-blanche/[id]/delete`}
            asLink={`/admin/liste-blanche/${data.id}/delete`}
          >
            <Button mr="2" bg="red">
              Supprimer
            </Button>
          </Link>
        </Box>
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
