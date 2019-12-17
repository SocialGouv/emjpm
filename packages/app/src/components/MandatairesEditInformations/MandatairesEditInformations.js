import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { PATH } from "../../constants/basePath";
import { GENDER_OPTIONS } from "../../constants/user";
import { getDepartementByCodePostal } from "../../query-service/DepartementQueryService";
import { isEmailExists } from "../../query-service/EmailQueryService";
import { isSiretExists } from "../../query-service/SiretQueryService";
import { Link } from "../Commons";
import { EDIT_USER } from "./mutations";
import { MANDATAIRE } from "./queries";

const cardStyle = { mt: "5", p: "0" };

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const MandatairesEditInformations = props => {
  const { id, type } = props;

  const { data, error, loading } = useQuery(MANDATAIRE, {
    variables: {
      userId: id
    }
  });

  const [EditUser] = useMutation(EDIT_USER, {
    update() {
      Router.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
        shallow: true
      });
    }
  });

  const client = useApolloClient();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const user = data.users[0];
  const mandataire = user.mandataire;

  return (
    <Card sx={cardStyle}>
      <Flex {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
          <Box height="220px">
            <Heading4>{`Modifier vos informations`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Vos informations`}
            </Text>
          </Box>
          <Box height="80px">
            <Heading4>{`Civilité`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre civilité`}
            </Text>
          </Box>
          <Box height="220px">
            <Heading4>{`Informations professionelles`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre SIRET sera utilisé pour vous identifier en cas d'échanges de données avec
                d'autres systèmes (OCMI par exemple)`}
            </Text>
          </Box>
          <Box height="200px">
            <Heading4>{`Adresse professionelle`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`L'adresse de votre siège social`}
            </Text>
          </Box>
          <Box height="80px">
            <Heading4>{`Activité`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Nombre de mesures souhaité
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <Formik
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const department = await getDepartementByCodePostal(client, values.code_postal);
                if (!department) {
                  setErrors({
                    code_postal: "Merci de renseigner un code postal valide"
                  });
                } else if (
                  values.siret != mandataire.siret &&
                  (await isSiretExists(client, values.siret))
                ) {
                  setErrors({
                    siret: "Ce SIRET existe déjà"
                  });
                } else if (
                  values.email != user.email &&
                  (await isEmailExists(client, values.email))
                ) {
                  setErrors({
                    email: "Cet email existe déjà"
                  });
                } else {
                  EditUser({
                    refetchQueries: ["users"],
                    variables: {
                      id: user.id,
                      nom: values.nom,
                      prenom: values.prenom,
                      email: values.email,
                      adresse: values.adresse,
                      code_postal: values.code_postal,
                      department_id: department.id,
                      dispo_max: parseInt(values.dispo_max),
                      genre: values.genre.value,
                      siret: values.siret,
                      telephone: values.telephone,
                      telephone_portable: values.telephone_portable,
                      ville: values.ville
                    }
                  });
                }
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string("Champ obligatoire")
                  .email("Le format de votre email n'est pas correct")
                  .required("Champ obligatoire"),
                nom: Yup.string().required("Champ obligatoire"),
                prenom: Yup.string().required("Champ obligatoire"),
                adresse: Yup.string().required("Champ obligatoire"),
                code_postal: Yup.string().required("Champ obligatoire"),
                dispo_max: Yup.number("Le champs doit être en nombre").required(
                  "Champ obligatoire"
                ),
                genre: Yup.string().required("Champ obligatoire"),
                siret: Yup.string()
                  .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
                  .required("Champ obligatoire"),
                telephone: Yup.string().required("Champ obligatoire"),
                telephone_portable: Yup.string(),
                ville: Yup.string().required("Champ obligatoire")
              })}
              initialValues={{
                email: user.email || "",
                nom: user.nom || "",
                prenom: user.prenom || "",
                adresse: mandataire.adresse || "",
                code_postal: mandataire.code_postal || "",
                dispo_max: mandataire.dispo_max || "",
                genre: GENDER_OPTIONS.find(el => el.value === mandataire.genre),
                siret: mandataire.siret || "",
                telephone: mandataire.telephone || "",
                telephone_portable: mandataire.telephone_portable || "",
                ville: mandataire.ville || ""
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleSubmit,
                  setFieldValue
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.prenom}
                        id="prenom"
                        name="prenom"
                        hasError={errors.prenom && touched.prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                      />
                      {errors.prenom && touched.prenom && <Text mt="1">{errors.prenom}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.nom}
                        id="nom"
                        name="nom"
                        hasError={errors.nom && touched.nom}
                        onChange={handleChange}
                        placeholder="Nom"
                      />
                      {errors.nom && touched.nom && <Text mt="1">{errors.nom}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.email}
                        id="email"
                        name="email"
                        hasError={errors.email && touched.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      {errors.email && touched.email && <Text mt="1">{errors.email}</Text>}
                    </Box>

                    {/* MANDATAIRE FIELD */}
                    <Box sx={{ position: "relative", zIndex: "100" }} mb="2" pt="2">
                      <Select
                        id="genre"
                        name="genre"
                        placeholder="Titre de civilité"
                        value={values.genre}
                        hasError={errors.genre && touched.genre}
                        onChange={option => setFieldValue("genre", option)}
                        options={GENDER_OPTIONS}
                      />
                      {errors.genre && touched.genre && <Text>{errors.genre}</Text>}
                    </Box>
                    <Box mb="2" pt="2">
                      <Input
                        value={values.siret}
                        id="siret"
                        name="siret"
                        hasError={errors.siret && touched.siret}
                        onChange={handleChange}
                        placeholder="SIRET"
                      />
                      {errors.siret && touched.siret && <Text>{errors.siret}</Text>}
                    </Box>
                    <Box mb="2" pt="2">
                      <Input
                        value={values.telephone}
                        id="telephone"
                        name="telephone"
                        hasError={errors.telephone && touched.telephone}
                        onChange={handleChange}
                        placeholder="Téléphone"
                      />
                      {errors.telephone && touched.telephone && <Text>{errors.telephone}</Text>}
                    </Box>
                    <Box mb="2">
                      <Input
                        value={values.telephone_portable}
                        id="telephone_portable"
                        name="telephone_portable"
                        onChange={handleChange}
                        placeholder="Téléphone portable"
                      />
                    </Box>
                    <Box mb="2" pt="2">
                      <Input
                        value={values.adresse}
                        id="adresse"
                        name="adresse"
                        hasError={errors.adresse && touched.adresse}
                        onChange={handleChange}
                        placeholder="Adresse"
                      />
                      {errors.adresse && touched.adresse && <Text>{errors.adresse}</Text>}
                    </Box>
                    <Box mb="2">
                      <Input
                        value={values.code_postal}
                        id="code_postal"
                        name="code_postal"
                        hasError={errors.code_postal && touched.code_postal}
                        onChange={handleChange}
                        placeholder="Code postal"
                      />
                      {errors.code_postal && touched.code_postal && (
                        <Text>{errors.code_postal}</Text>
                      )}
                    </Box>
                    <Box mb="2">
                      <Input
                        value={values.ville}
                        id="ville"
                        name="ville"
                        hasError={errors.ville && touched.ville}
                        onChange={handleChange}
                        placeholder="Ville"
                      />
                      {errors.ville && touched.ville && <Text>{errors.ville}</Text>}
                    </Box>
                    <Box mb="2" pt="2">
                      <Input
                        value={values.dispo_max}
                        id="dispo_max"
                        name="dispo_max"
                        hasError={errors.dispo_max && touched.dispo_max}
                        onChange={handleChange}
                        placeholder="Nombre de mesures souhaité"
                      />
                      {errors.dispo_max && touched.dispo_max && <Text>{errors.dispo_max}</Text>}
                    </Box>

                    <Flex alignItems="center" justifyContent="flex-end">
                      <Box mr="2">
                        <Link href={`${PATH[type]}/informations`}>Annuler</Link>
                      </Box>
                      <Box>
                        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                          Enregistrer
                        </Button>
                      </Box>
                    </Flex>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { MandatairesEditInformations };
