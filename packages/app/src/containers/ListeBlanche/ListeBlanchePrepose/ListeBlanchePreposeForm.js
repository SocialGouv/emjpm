import { isAdmin } from "@emjpm/biz";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { useFormik } from "formik";

import AsyncSelect from "react-select/async";
import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
  FormGroupSelect,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import yup, { FORM_REQUIRED_MESSAGE } from "~/validation-schemas/yup";
import { Button, Heading, RadioGroup, InlineError, Input } from "~/components";

import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";
import { useMemo } from "react";

const lbSchema = ({ isCreate }) =>
  yup.object().shape({
    email: yup.string().required(),
    prenom: yup.string().required(),
    nom: yup.string().required(),
    genre: yup.string().nullable().required(),
    telephone: yup.string().nullable(),
    etablissements: yup
      .array()
      .test(
        "required-oncreate-orif-present-onupdate",
        FORM_REQUIRED_MESSAGE,
        (value, { parent }) => {
          if (isCreate) {
            return true;
          }
          if (
            !parent.initialEtablissements ||
            parent.initialEtablissements.length === 0
          ) {
            return true;
          }
          return value && value.length > 0;
        }
      ),
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

export function ListeBlanchePreposeForm(props) {
  const { searchEtablissements, editMode, data = {}, handleSubmit } = props;

  const isCreate = !props.data;
  const validationSchema = useMemo(() => lbSchema({ isCreate }), [isCreate]);

  const etablissements = data.mandataire_prepose_etablissements
    ? data.mandataire_prepose_etablissements.map((e) => {
        return {
          etablissement_rattachement: e.etablissement_rattachement,
          id: e.etablissement.id,
          ligneacheminement: e.etablissement.ligneacheminement,
          rslongue: e.etablissement.rslongue,
        };
      })
    : [];
  const initialValues = {
    email: data.email || "",
    initialEtablissements: etablissements,
    etablissements,
    prenom: data.prenom || "",
    nom: data.nom || "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        if (handleSubmit) {
          await handleSubmit(values);
        }
      } catch (error) {
        if (error.message.includes("liste_blanche_email_unique")) {
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

  const user = useUser();

  const mandataire = data?.mandataire;

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Informations personnelles"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeFirstName]}
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeLastName]}
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={validationSchema}
          />
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={validationSchema}
            />
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Liste des établissements"}
          </Heading>
          <Text mt={"20px"} mb={2}>
            {
              "Ajouter les établissements dans lesquels ce mandataire travaille, et sélectionner son établissement de rattachement."
            }
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
                <>
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
                </>
              );
            }}
          />

          <Box>
            <Box mt={2}>
              <div aria-describedby="msg-etablissements">
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
              </div>
              <div id="msg-etablissements">
                {(formik.touched.etablissements || formik.submitCount > 1) && (
                  <InlineError
                    message={formik.errors.etablissements}
                    fieldId="etablissements"
                  />
                )}
              </div>
            </Box>
          </Box>
        </FormInputBox>
      </Flex>

      {!isCreate && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Informations données par le préposé"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            {!mandataire && <Text>Aucun utilisateur associé</Text>}
            {mandataire && (
              <>
                <Input
                  label="Civilité"
                  placeholder=""
                  value={
                    mandataire.genre
                      ? GENDER_OPTIONS.find(
                          ({ value }) => value === mandataire.genre
                        ).label
                      : ""
                  }
                  forceActive
                  readOnly
                />
                <Input
                  label="Prénom"
                  placeholder=""
                  value={mandataire.user.prenom}
                  forceActive
                  readOnly
                />
                <Input
                  label="NOM"
                  placeholder=""
                  value={mandataire.user.nom}
                  forceActive
                  readOnly
                />
                <Input
                  label="Adresse e-mail"
                  placeholder=""
                  value={mandataire.user.email}
                  forceActive
                  readOnly
                />
                <Input
                  placeholder="Téléphone"
                  value={mandataire.telephone}
                  forceActive
                  readOnly
                />
                <Input
                  placeholder="Adresse"
                  value={mandataire.adresse}
                  forceActive
                  readOnly
                />
              </>
            )}
          </FormInputBox>
        </Flex>
      )}

      <Flex justifyContent="flex-end" mt={4}>
        {editMode && isAdmin(user) && (
          <Box>
            <Link to={`/admin/liste-blanche/${data.id}/delete`}>
              <Button mr="2" bg="red">
                Supprimer
              </Button>
            </Link>
          </Box>
        )}
        <Box>
          <Button disabled={formik.isSubmitting} type="submit">
            {editMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlanchePreposeForm;
