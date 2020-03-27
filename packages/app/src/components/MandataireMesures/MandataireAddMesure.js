// TODO move me on a proper folder
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Field, Heading4, InlineError, Input, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import {
  CIVILITY,
  COUNTRIES,
  MESURE_STATUS_LABEL_VALUE,
  MESURE_TYPE_LABEL_VALUE,
  RESIDENCE
} from "../../constants/mesures";
import { mandataireMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { Geocode, geocodeInitialValue } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";
import { UserContext } from "../UserContext";
import { ADD_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";
import { DEPARTEMENTS, MANDATAIRE, MANDATAIRE_MESURES, USER_TRIBUNAL } from "./queries";
import { formatUserTribunalList } from "./utils";

export const MandataireAddMesure = props => {
  const {
    mandataire: { id }
  } = useContext(UserContext);

  const geocode = geocodeInitialValue();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const variables = {};

      if (values.country.value === "FR") {
        const regionCode = getRegionCode(values.geocode.postcode);
        const departements = departementsData.departements;
        const departement = departements.find(dep => dep.code === regionCode);

        if (!departement) {
          setErrors({
            code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
          });
          return setSubmitting(false);
        } else {
          variables.code_postal = values.geocode.postcode;
          variables.ville = values.geocode.city;
          variables.latitude = values.geocode.latitude;
          variables.longitude = values.geocode.longitude;
          variables.department_id = departement.id;
        }
      }

      await addMesure({
        refetchQueries: [
          {
            query: MANDATAIRE_MESURES,
            variables: {
              limit: 20,
              offset: 0,
              searchText: null,
              status: MESURE_STATUS_LABEL_VALUE[0].value,
              type: null,
              excludeStatus: "Mesure en attente"
            }
          }
        ],
        variables: {
          ...variables,
          annee: values.annee.toString(),
          civilite: values.civilite.value,
          date_ouverture: values.date_ouverture,
          numero_dossier: values.numero_dossier,
          numero_rg: values.numero_rg,
          residence: values.residence.value,
          ti_id: values.tribunal.value,
          type: values.type.value,
          mandataireId: id,
          pays: values.country.value,
          cabinet: values.cabinet
        }
      });

      setSubmitting(false);
    },
    validationSchema: mandataireMesureSchema,
    initialValues: {
      annee: "",
      civilite: "",
      date_ouverture: "",
      numero_dossier: "",
      numero_rg: "",
      tribunal: undefined,
      geocode,
      address: geocode.label,
      country: { value: "FR", label: COUNTRIES["FR"] },
      cabinet: ""
    }
  });

  const { loading, error, data } = useQuery(USER_TRIBUNAL);

  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES);
  const [addMesure] = useMutation(ADD_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({
        variables: { mandataire_id: id },
        refetchQueries: [
          "mesures",
          "mesures_aggregate",
          {
            query: MANDATAIRE,
            variables: { id }
          }
        ]
      });
      await Router.push("/mandataires", { shallow: true });
    }
  });

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const tribunalList = formatUserTribunalList(data.user_tis);

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap" {...props}>
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="280px">
            <Heading4>{`Informations générales`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre mesure`}
            </Text>
          </Box>
          <Box height="280px">
            <Heading4>{`Caractéristique de la mesure`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations nous permettent de vous présenter les mesures de mandataires les plus
              adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <form onSubmit={formik.handleSubmit}>
              <Field>
                <Input
                  value={formik.values.numero_rg}
                  id="numero_rg"
                  name="numero_rg"
                  hasError={formik.errors.numero_rg && formik.touched.numero_rg}
                  onChange={formik.handleChange}
                  placeholder="Numéro RG"
                />
                {formik.errors.numero_rg && formik.touched.numero_rg && (
                  <Text>{formik.errors.numero_rg}</Text>
                )}
              </Field>
              <Field>
                <TribunalAutoComplete
                  id="tribunal"
                  value={formik.values.tribunal}
                  name="tribunal"
                  hasError={formik.errors.tribunal && formik.touched.tribunal}
                  onChange={option => formik.setFieldValue("tribunal", option)}
                  defaultOptions={tribunalList}
                />
                {formik.errors.tribunal && formik.touched.tribunal && (
                  <Text>{formik.errors.tribunal}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.cabinet}
                  id="cabinet"
                  name="cabinet"
                  hasError={formik.errors.cabinet && formik.touched.cabinet}
                  onChange={formik.handleChange}
                  placeholder="Cabinet"
                />
                {formik.errors.cabinet && formik.touched.cabinet && (
                  <Text>{formik.errors.cabinet}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.numero_dossier}
                  id="numero_dossier"
                  name="numero_dossier"
                  hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
                  onChange={formik.handleChange}
                  placeholder="Numéro de dossier"
                />
                {formik.errors.numero_dossier && formik.touched.numero_dossier && (
                  <Text>{formik.errors.numero_dossier}</Text>
                )}
              </Field>
              <Field>
                <Input
                  value={formik.values.date_ouverture}
                  id="date_ouverture"
                  type="date"
                  name="date_ouverture"
                  hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
                  onChange={formik.handleChange}
                  placeholder="Date d'ordonnance"
                />
                {formik.errors.date_ouverture && formik.touched.date_ouverture && (
                  <Text>{formik.errors.date_ouverture}</Text>
                )}
              </Field>
              <Field>
                <Select
                  id="type"
                  name="type"
                  placeholder="Type de mesure"
                  value={formik.values.type}
                  hasError={formik.errors.type && formik.touched.type}
                  onChange={option => formik.setFieldValue("type", option)}
                  options={MESURE_TYPE_LABEL_VALUE}
                />
                {formik.errors.type && formik.touched.type && <Text>{formik.errors.type}</Text>}
              </Field>
              <Field>
                <Select
                  id="civilite"
                  name="civilite"
                  placeholder="Civilité"
                  value={formik.values.civilite}
                  hasError={formik.errors.civilite && formik.touched.civilite}
                  onChange={option => formik.setFieldValue("civilite", option)}
                  options={CIVILITY}
                />
                {formik.errors.civilite && formik.touched.civilite && (
                  <Text>{formik.errors.civilite}</Text>
                )}
              </Field>

              <Field>
                <Input
                  value={formik.values.annee}
                  id="annee"
                  name="annee"
                  type="number"
                  hasError={formik.errors.annee && formik.touched.annee}
                  onChange={formik.handleChange}
                  placeholder="Année de naissance"
                />
                {formik.errors.annee && formik.touched.annee && <Text>{formik.errors.annee}</Text>}
              </Field>
              <Field>
                <Select
                  id="residence"
                  name="residence"
                  placeholder="Type de residence"
                  value={formik.values.residence}
                  hasError={formik.errors.residence && formik.touched.residence}
                  onChange={option => formik.setFieldValue("residence", option)}
                  options={RESIDENCE}
                />
                {formik.errors.residence && formik.touched.residence && (
                  <Text>{formik.errors.residence}</Text>
                )}
              </Field>

              <Field>
                <Select
                  id="country"
                  name="country"
                  placeholder="Pays"
                  value={formik.values.country}
                  hasError={formik.errors.country && formik.touched.country}
                  onChange={option => formik.setFieldValue("country", option)}
                  options={[
                    {
                      label: "France",
                      value: "FR"
                    },
                    {
                      label: "Belgique",
                      value: "BE"
                    }
                  ]}
                />
                {formik.errors.country && formik.touched.country && (
                  <Text>{formik.errors.country}</Text>
                )}
              </Field>
              {formik.values.country && formik.values.country.value === "FR" && (
                <Field>
                  <Geocode
                    onChange={async geocode => {
                      await formik.setFieldValue("geocode", geocode);
                      await formik.setFieldValue("address", geocode ? geocode.label : "");
                    }}
                  />
                  <InlineError message={formik.errors.address} fieldId="address" />
                </Field>
              )}
              <Flex justifyContent="flex-end">
                <Box>
                  <Button mr="2" variant="outline">
                    <Link href="/mandataires">
                      <a>Annuler</a>
                    </Link>
                  </Button>
                </Box>
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
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
