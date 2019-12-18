import { AsyncSelect, Button, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { SECRETARIAT_OPTIONS } from "../../constants/mandataire";
import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { debouncedGeocode } from "../../util/geocode";
import { Link } from "../Commons";

const MandatairesEditInformationsForm = props => {
  const { cancelLink, mandataire, handleSubmit, user } = props;

  const [isSecretariat, setSecretariat] = useState(mandataire.secretariat);

  const geocode = {
    postcode: mandataire.code_postal,
    city: mandataire.ville,
    label: mandataire.adresse,
    lat: mandataire.latitude,
    lng: mandataire.longitude
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: mandataireEditSchema,
    initialValues: {
      email: user.email || "",
      nom: user.nom || "",
      prenom: user.prenom || "",
      adresse: mandataire.adresse || "",
      code_postal: mandataire.code_postal || "",
      dispo_max: mandataire.dispo_max || "",
      genre: GENDER_OPTIONS.find(el => el.value === mandataire.genre),
      geocode,
      siret: mandataire.siret || "",
      telephone: mandataire.telephone || "",
      telephone_portable: mandataire.telephone_portable || "",
      ville: mandataire.ville || "",
      secretariat: SECRETARIAT_OPTIONS.find(el => el.value === mandataire.secretariat),
      nb_secretariat: mandataire.nb_secretariat || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
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
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.nom}
          id="nom"
          name="nom"
          hasError={formik.errors.nom && formik.touched.nom}
          onChange={formik.handleChange}
          placeholder="Nom"
        />
        {formik.errors.nom && formik.touched.nom && <Text mt="1">{formik.errors.nom}</Text>}
      </Box>
      <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
        <Input
          value={formik.values.email}
          id="email"
          name="email"
          hasError={formik.errors.email && formik.touched.email}
          onChange={formik.handleChange}
          placeholder="Email"
        />
        {formik.errors.email && formik.touched.email && <Text mt="1">{formik.errors.email}</Text>}
      </Box>

      {/* MANDATAIRE FIELD */}
      <Box sx={{ position: "relative", zIndex: "100" }} mb="2" pt="2">
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
      </Box>
      <Box mb="2" pt="2">
        <Input
          value={formik.values.siret}
          id="siret"
          name="siret"
          hasError={formik.errors.siret && formik.touched.siret}
          onChange={formik.handleChange}
          placeholder="SIRET"
        />
        {formik.errors.siret && formik.touched.siret && <Text>{formik.errors.siret}</Text>}
      </Box>
      <Box mb="2" pt="2">
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
      </Box>
      <Box mb="2">
        <Input
          value={formik.values.telephone_portable}
          id="telephone_portable"
          name="telephone_portable"
          onChange={formik.handleChange}
          placeholder="Téléphone portable"
        />
      </Box>
      <Box mb="2" pt="2">
        <AsyncSelect
          name="geocode"
          cacheOptions
          defaultValue={{ value: geocode, label: geocode.label }}
          hasError={formik.errors.geocode && formik.touched.geocode}
          isClearable
          loadOptions={debouncedGeocode}
          placeholder="Ville, code postal, ..."
          noOptionsMessage={() => "Pas de résultats"}
          onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
        />
        {formik.errors.geocode && formik.touched.geocode && <Text>{formik.errors.geocode}</Text>}
      </Box>
      <Box mb="2" pt="2">
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
      </Box>
      <Box mb="2" sx={{ position: "relative", zIndex: "100" }}>
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
      </Box>
      {isSecretariat && (
        <Box mb="2">
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
        </Box>
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
