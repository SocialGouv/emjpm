import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Input, Select, Text } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { getRegionCode } from "../../util/departements";
import { UserContext } from "../UserContext";
import { ADD_MESURE, UPDATE_MANDATAIRES_COUTERS } from "./mutations";
import { DEPARTEMENTS, MANDATAIRE_MESURES, USER_TRIBUNAL } from "./queries";
import { formatUserTribunalList } from "./utils";

const MandatairesCreateStyle = {
  flexWrap: "wrap"
};

const grayBox = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  p: "5"
};

const cardStyle = { m: "1", mt: "5", p: "0" };

export const MandatairesAddMesure = props => {
  const {
    mandataire: { id }
  } = useContext(UserContext);

  const { loading, error, data } = useQuery(USER_TRIBUNAL);

  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  const [UpdateMandatairesCounter] = useMutation(UPDATE_MANDATAIRES_COUTERS);

  const [AddMesure] = useMutation(ADD_MESURE, {
    options: {
      refetchQueries: ["mesures", "mesures_aggregate"]
    },
    update(
      cache,
      {
        data: {
          insert_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;
      UpdateMandatairesCounter({
        variables: {
          mandataireId: mesure.mandataire_id,
          mesures_awaiting: 0,
          mesures_in_progress: 1
        }
      });
    }
  });

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const tribunalList = formatUserTribunalList(data.user_tis);
  const [uniqueTribunal] = tribunalList;
  const tribunalDefaultValue =
    tribunalList.length <= 1 ? { label: uniqueTribunal.label, value: uniqueTribunal.value } : "";

  return (
    <Card sx={cardStyle}>
      <Flex sx={MandatairesCreateStyle} {...props}>
        <Box width={[1, 2 / 5]} sx={grayBox}>
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
            <Formik
              onSubmit={(values, { setSubmitting, setErrors }) => {
                const regionCode = getRegionCode(values.code_postal);
                const departements = departementsData.departements;
                const departement = departements.find(dep => dep.code === regionCode);
                if (!departement) {
                  setErrors({
                    code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
                  });
                } else {
                  AddMesure({
                    refetchQueries: [
                      {
                        query: MANDATAIRE_MESURES,
                        variables: {
                          limit: 20,
                          offset: 0,
                          searchText: null,
                          status: null,
                          type: null
                        }
                      }
                    ],
                    variables: {
                      annee: values.annee.toString(),
                      civilite: values.civilite.value,
                      code_postal: values.code_postal,
                      date_ouverture: values.date_ouverture,
                      department_id: departement.id,
                      numero_dossier: values.numero_dossier,
                      numero_rg: values.numero_rg,
                      residence: values.residence.value,
                      ti_id: values.tribunal.value,
                      type: values.type.value,
                      ville: values.ville,
                      mandataireId: id
                    }
                  });
                  Router.push("/mandataires");
                }
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                annee: Yup.number()
                  .required("Champ obligatoire")
                  .min(1900, "l'année choisi doit être au minimum 1900")
                  .max(2019, "l'année choisi doit être au maximum 2019"),
                civilite: Yup.string().required("Champ obligatoire"),
                code_postal: Yup.string().required("Champ obligatoire"),
                date_ouverture: Yup.date().required("Champ obligatoire"),
                numero_dossier: Yup.string().required("Champ obligatoire"),
                numero_rg: Yup.string().required("Champ obligatoire"),
                residence: Yup.string().required("Champ obligatoire"),
                tribunal: Yup.string().required("Champ obligatoire"),
                type: Yup.string().required("Champ obligatoire"),
                ville: Yup.string().required("Champ obligatoire")
              })}
              initialValues={{
                annee: "",
                civilite: "",
                code_postal: "",
                date_ouverture: "",
                numero_dossier: "",
                numero_rg: "",
                tribunal: tribunalDefaultValue,
                ville: ""
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
                        value={values.numero_rg}
                        id="numero_rg"
                        name="numero_rg"
                        hasError={errors.numero_rg && touched.numero_rg}
                        onChange={handleChange}
                        placeholder="Numéro RG"
                      />
                      {errors.numero_rg && touched.numero_rg && <Text>{errors.numero_rg}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "70" }} mb="2">
                      <Select
                        id="tribunal"
                        name="tribunal"
                        placeholder="Tribunal"
                        value={values.tribunal}
                        options={tribunalList}
                        hasError={errors.tribunal && touched.tribunal}
                        onChange={option => setFieldValue("tribunal", option)}
                      />
                      {errors.tribunal && touched.tribunal && <Text>{errors.tribunal}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.numero_dossier}
                        id="numero_dossier"
                        name="numero_dossier"
                        hasError={errors.numero_dossier && touched.numero_dossier}
                        onChange={handleChange}
                        placeholder="Numero de dossier"
                      />
                      {errors.numero_dossier && touched.numero_dossier && (
                        <Text>{errors.numero_dossier}</Text>
                      )}
                    </Box>
                    <Box mb="2" mt="5">
                      <Input
                        value={values.date_ouverture}
                        id="date_ouverture"
                        type="date"
                        name="date_ouverture"
                        hasError={errors.date_ouverture && touched.date_ouverture}
                        onChange={handleChange}
                        placeholder="Date d'ouverture"
                      />
                      {errors.date_ouverture && touched.date_ouverture && (
                        <Text>{errors.date_ouverture}</Text>
                      )}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
                      <Select
                        id="type"
                        name="type"
                        placeholder="Type de mesure"
                        value={values.type}
                        hasError={errors.type && touched.type}
                        onChange={option => setFieldValue("type", option)}
                        options={MESURE_TYPE_LABEL_VALUE}
                      />
                      {errors.type && touched.type && <Text>{errors.type}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
                      <Select
                        id="civilite"
                        name="civilite"
                        placeholder="Civilité"
                        value={values.civilite}
                        hasError={errors.civilite && touched.civilite}
                        onChange={option => setFieldValue("civilite", option)}
                        options={CIVILITY}
                      />
                      {errors.civilite && touched.civilite && <Text>{errors.civilite}</Text>}
                    </Box>

                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                      <Input
                        value={values.annee}
                        id="annee"
                        name="annee"
                        type="number"
                        hasError={errors.annee && touched.annee}
                        onChange={handleChange}
                        placeholder="année"
                      />
                      {errors.annee && touched.annee && <Text>{errors.annee}</Text>}
                    </Box>
                    <Box sx={{ position: "relative", zIndex: "90" }} mt="5" mb="2">
                      <Select
                        id="residence"
                        name="residence"
                        placeholder="Type de residence"
                        value={values.residence}
                        hasError={errors.residence && touched.residence}
                        onChange={option => setFieldValue("residence", option)}
                        options={RESIDENCE}
                      />
                      {errors.residence && touched.residence && <Text>{errors.residence}</Text>}
                    </Box>

                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
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
                    <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
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

                    <Flex justifyContent="flex-end">
                      <Box>
                        <Button mr="2" variant="outline">
                          <Link href="/mandatairess">
                            <a>Annuler</a>
                          </Link>
                        </Button>
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
