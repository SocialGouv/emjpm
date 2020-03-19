import { Button, Field, InlineError, Input, Select, Textarea } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { SECRETARIAT_OPTIONS } from "../../constants/mandataire";
import { GENDER_OPTIONS } from "../../constants/user";
import { mandataireEditSchema } from "../../lib/validationSchemas";
import { Link } from "../Commons";
import { Geocode, geocodeInitialValue } from "../Geocode";

const MandataireEditInformationsForm = props => {
  const { cancelLink, mandataire, handleSubmit, user } = props;
  const geocode = geocodeInitialValue(mandataire);

  const secretariat = mandataire.secretariat
    ? SECRETARIAT_OPTIONS.find(el => el.value === mandataire.secretariat)
    : undefined;

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
      secretariat: secretariat,
      nb_secretariat: mandataire.nb_secretariat || "",
      competences: mandataire.competences || "",
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
        <InlineError message={formik.errors.prenom} fieldId="prenom" />
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
        <InlineError message={formik.errors.nom} fieldId="nom" />
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
        <InlineError message={formik.errors.email} fieldId="email" />
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
        <InlineError message={formik.errors.genre} fieldId="genre" />
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
        <InlineError message={formik.errors.siret} fieldId="siret" />
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
        <InlineError message={formik.errors.telephone} fieldId="telephone" />
      </Field>
      <Field>
        <Input
          value={formik.values.telephone_portable}
          id="telephone_portable"
          name="telephone_portable"
          onChange={formik.handleChange}
          placeholder="Téléphone portable"
        />
        <InlineError message={formik.errors.telephone_portable} fieldId="telephone_portable" />
      </Field>
      <Field>
        <Geocode
          resource={mandataire}
          onChange={geocode => formik.setFieldValue("geocode", geocode)}
        />
        <InlineError
          message={formik.errors.geocode ? formik.errors.geocode.postcode : ""}
          fieldId="geocode"
        />
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
        <InlineError message={formik.errors.dispo_max} fieldId="dispo_max" />
      </Field>
      <Field>
        <Select
          value={formik.values.secretariat}
          id="secretariat"
          name="secretariat"
          hasError={formik.errors.secretariat && formik.touched.secretariat}
          onChange={async option => {
            await formik.setFieldValue("secretariat", option);
            if (option && option.value) {
              await formik.setFieldValue("nb_secretariat", "");
            }
          }}
          placeholder="Secretariat spécialisé"
          options={SECRETARIAT_OPTIONS}
        />
        <InlineError message={formik.errors.secretariat} fieldId="secretariat" />
      </Field>

      {formik.values.secretariat && formik.values.secretariat.value && (
        <Field>
          <Input
            value={formik.values.nb_secretariat}
            id="nb_secretariat"
            name="nb_secretariat"
            hasError={formik.errors.nb_secretariat && formik.touched.nb_secretariat}
            onChange={formik.handleChange}
            placeholder="Nombre ETP dédié (x.xx)"
          />
          <InlineError message={formik.errors.nb_secretariat} fieldId="nb_secretariat" />
        </Field>
      )}
      <Field>
        <Textarea
          value={formik.values.competences}
          id="competences"
          name="competences"
          error={formik.errors.competences}
          onChange={formik.handleChange}
          label="Informations à destination du magistrat"
          placeholder="Préférences géographiques, compétences, langues parlées, ..."
        />
        <InlineError message={formik.errors.competences} fieldId="competences" />
      </Field>

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

export { MandataireEditInformationsForm };
