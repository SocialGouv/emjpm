import { Button, Field, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { SECRETARIAT_OPTIONS } from "../../constants/mandataire";
import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { Link } from "../Commons";
import { Geocode, geocodeInitialValue } from "../Geocode";

const MandatairesEditInformationsForm = props => {
  const { cancelLink, mandataire, handleSubmit, user } = props;

  const [isSecretariat, setSecretariat] = useState(mandataire.secretariat);

  const geocode = geocodeInitialValue(mandataire);

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: mandataireEditSchema,
    initialValues: {
      email: user.email || "",
      nom: user.nom || "",
      prenom: user.prenom || "",
      adresse: mandataire.adresse || "",
      dispo_max: mandataire.dispo_max || "",
      genre: GENDER_OPTIONS.find(el => el.value === mandataire.genre),
      siret: mandataire.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      secretariat: SECRETARIAT_OPTIONS.find(el => el.value === mandataire.secretariat),
      nb_secretariat: mandataire.nb_secretariat || "",
      geocode
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field>
        <Input
          value={formik.values.prenom}
          id="prenom"
          name="prenom"
          hasError={formik.errors.prenom && formik.touched.prenom}
          onChange={formik.handleChange}
          placeholder="Prénom"
        />
        {formik.errors.prenom && formik.touched.prenom && (
          <Text mt="1">{formik.errors.prenom}</Text>
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.nom}
          id="nom"
          name="nom"
          hasError={formik.errors.nom && formik.touched.nom}
          onChange={formik.handleChange}
          placeholder="Nom"
        />
        {formik.errors.nom && formik.touched.nom && <Text mt="1">{formik.errors.nom}</Text>}
      </Field>
      <Field>
        <Input
          value={formik.values.email}
          id="email"
          name="email"
          hasError={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        {formik.errors.email && formik.touched.email && <Text mt="1">{formik.errors.email}</Text>}
      </Field>

      {/* MANDATAIRE FIELD */}
      <Field>
        <Select
          id="genre"
          name="genre"
          placeholder="Titre de civilité"
          value={formik.values.genre}
          hasError={formik.errors.genre && formik.touched.genre}
          onChange={option => formik.setFieldValue("genre", option)}
          options={GENDER_OPTIONS}
        />
        {formik.errors.genre && formik.touched.genre && <Text>{formik.errors.genre}</Text>}
      </Field>
      <Field>
        <Input
          value={formik.values.siret}
          id="siret"
          name="siret"
          hasError={formik.errors.siret && formik.touched.siret}
          onChange={formik.handleChange}
          placeholder="SIRET"
        />
        {formik.errors.siret && formik.touched.siret && <Text>{formik.errors.siret}</Text>}
      </Field>
      <Field>
        <Input
          value={formik.values.telephone}
          id="telephone"
          name="telephone"
          hasError={formik.errors.telephone && formik.touched.telephone}
          onChange={formik.handleChange}
          placeholder="Téléphone"
        />
        {formik.errors.telephone && formik.touched.telephone && (
          <Text>{formik.errors.telephone}</Text>
        )}
      </Field>
      <Field>
        <Input
          value={formik.values.telephone_portable}
          id="telephone_portable"
          name="telephone_portable"
          onChange={formik.handleChange}
          placeholder="Téléphone portable"
        />
      </Field>
      <Field>
        <Geocode
          resource={mandataire}
          onChange={geocode => formik.setFieldValue("geocode", geocode)}
        />
        {formik.errors.geocode && formik.touched.geocode && <Text>{formik.errors.geocode}</Text>}
      </Field>
      <Field>
        <Input
          value={formik.values.dispo_max}
          id="dispo_max"
          name="dispo_max"
          hasError={formik.errors.dispo_max && formik.touched.dispo_max}
          onChange={formik.handleChange}
          placeholder="Nombre de mesures souhaité"
        />
        {formik.errors.dispo_max && formik.touched.dispo_max && (
          <Text>{formik.errors.dispo_max}</Text>
        )}
      </Field>
      <Field>
        <Select
          value={formik.values.secretariat}
          id="secretariat"
          name="secretariat"
          hasError={formik.errors.secretariat && formik.touched.secretariat}
          onChange={option => {
            const isSecretariat = option ? option.value : false;
            setSecretariat(isSecretariat);
            formik.setFieldValue("secretariat", option);
            if (!isSecretariat) {
              formik.setFieldValue("nb_secretariat", "");
            }
          }}
          placeholder="Secretariat spécialisé"
          options={SECRETARIAT_OPTIONS}
        />
        {formik.errors.secretariat && formik.touched.secretariat && (
          <Text>{formik.errors.secretariat}</Text>
        )}
      </Field>
      {isSecretariat && (
        <Field>
          <Input
            value={formik.values.nb_secretariat}
            id="nb_secretariat"
            name="nb_secretariat"
            hasError={formik.errors.nb_secretariat && formik.touched.nb_secretariat}
            onChange={formik.handleChange}
            placeholder="Nombre ETP dédié (x.xx)"
          />
          {formik.errors.nb_secretariat && formik.touched.nb_secretariat && (
            <Text>{formik.errors.nb_secretariat}</Text>
          )}
        </Field>
      )}

      <Flex alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link href={cancelLink}>Annuler</Link>
        </Box>
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export { MandatairesEditInformationsForm };
