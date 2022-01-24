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
import { Button, Heading, Text, CheckBox } from "~/components";
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
      ti: greffier.ti_id || "",
      share_email: greffier.share_email || false,
      genre: greffier.genre || "",
    },
    onSubmit: handleSubmit,
    validationSchema: greffierEditSchema,
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
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={greffierEditSchema}
            autoComplete="family-name"
            normalizers={[normalizeLastName]}
          />
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={greffierEditSchema}
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
            validationSchema={greffierEditSchema}
          />
          <FormGroupInput
            placeholder="Cabinet"
            id="cabinet"
            formik={formik}
            validationSchema={greffierEditSchema}
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

export { GreffierEditInformationsForm };
