import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import { greffierEditSchema } from "~/validation-schemas";
import { Button, Heading, Text, CheckBox, SrOnly } from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function GreffierEditInformationsForm(props) {
  const { cancelLink, user, tribunaux, handleSubmit } = props;

  const { greffier } = user;

  const tiOptions = tribunaux.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  const formik = useFormik({
    initialValues: {
      cabinet: user.cabinet || "",
      email: user.email || "",
      nom: user.nom || "",
      prenom: user.prenom || "",
      ti: greffier?.ti_id || "",
      share_email: greffier?.share_email || false,
      genre: user.genre || "",
    },
    onSubmit: handleSubmit,
    validationSchema: greffierEditSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="informations_personnelles_heading">
            {"Informations personnelles"}
          </Heading>
        </FormGrayBox>
        <FormInputBox
          mb={1}
          role="group"
          aria-labelledby="informations_personnelles_heading"
        >
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={greffierEditSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={greffierEditSchema}
            autoComplete="given-name"
            normalizers={[normalizeFirstName]}
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={greffierEditSchema}
            autoComplete="family-name"
            normalizers={[normalizeLastName]}
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={greffierEditSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="email_format_attendu"
          />
          <SrOnly id="email_format_attendu">
            format attendu : nom@justice.fr
          </SrOnly>
          <CheckBox
            isChecked={formik.values.share_email}
            onChange={() => {
              formik.setFieldValue("share_email", !formik.values.share_email);
            }}
            label="Autoriser les mandataires à accéder à mon email pour m'envoyer des messages"
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="tribunal_heading">
            {"Tribunal"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {"Veuillez renseigner le tribunal dans lequel vous exercez."}
          </Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="tribunal_heading">
          <FormGroupSelect
            formik={formik}
            id="ti"
            placeholder="Tribunal d'instance"
            options={tiOptions}
            enableFilterByLabel
            isClearable={true}
            validationSchema={greffierEditSchema}
          />
          <FormGroupInput
            id="cabinet"
            formik={formik}
            validationSchema={greffierEditSchema}
            placeholder="Cabinet du tribunal"
            ariaLabel="Cabinet du tribunal"
          />
        </FormInputBox>
      </Flex>

      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link
            to={cancelLink}
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
          >
            <Button variant="outline">Annuler</Button>
          </Link>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            title="Enregistrer la modification de vos informations"
            aria-label="Enregistrer la modification de vos informations"
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export { GreffierEditInformationsForm };
