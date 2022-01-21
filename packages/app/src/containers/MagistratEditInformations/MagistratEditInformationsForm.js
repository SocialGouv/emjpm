import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import { magistratEditSchema } from "~/validation-schemas";
import { Button, Heading, Text, CheckBox } from "~/components";

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
    },
    onSubmit: handleSubmit,
    validationSchema: magistratEditSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
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
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={magistratEditSchema}
            autoComplete="given-name"
          />
          <FormGroupInput
            placeholder="Nom"
            id="nom"
            formik={formik}
            validationSchema={magistratEditSchema}
            autoComplete="family-name"
          />
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={magistratEditSchema}
            autoComplete="email"
          />
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
          />
          <FormGroupInput
            placeholder="Cabinet"
            id="cabinet"
            formik={formik}
            validationSchema={magistratEditSchema}
          />
        </FormInputBox>
      </Flex>

      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link to={cancelLink}>
            <Button variant="outline">Annuler</Button>
          </Link>
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
  );
}

export { MagistratEditInformationsForm };
