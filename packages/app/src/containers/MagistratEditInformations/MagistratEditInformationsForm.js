import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { magistratEditSchema } from "~/validation-schemas";
import { Button, Heading, Text, CheckBox, SrOnly } from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";

function MagistratEditInformationsForm(props) {
  const { cancelLink, user, tribunaux, handleSubmit } = props;

  const { magistrat } = user;

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
      ti: magistrat.ti_id || "",
      share_email: magistrat.share_email || false,
      genre: user.genre || "",
    },
    onSubmit: handleSubmit,
    validationSchema: magistratEditSchema,
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
            validationSchema={magistratEditSchema}
            aria-label="Votre civilité"
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={magistratEditSchema}
            autoComplete="given-name"
            normalizers={[normalizeFirstName]}
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={magistratEditSchema}
            autoComplete="family-name"
            normalizers={[normalizeLastName]}
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={magistratEditSchema}
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
            validationSchema={magistratEditSchema}
            aria-label="Tribunal d'instance"
          />
          <FormGroupInput
            id="cabinet"
            formik={formik}
            validationSchema={magistratEditSchema}
            placeholder="Cabinet du tribunal"
            ariaLabel="Cabinet du tribunal"
          />
        </FormInputBox>
      </Flex>

      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            variant="outline"
            as="a"
            type={null}
            href={cancelLink}
            title="Annuler la modification de vos informations"
            aria-label="Annuler la modification de vos informations"
          >
            Annuler
          </Button>
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

export { MagistratEditInformationsForm };
