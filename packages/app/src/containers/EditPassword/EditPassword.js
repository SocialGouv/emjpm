import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import fetch from "unfetch";

import useUser from "~/hooks/useUser";
import config from "~/config";
import { PATH } from "~/constants/basePath";
import { passwordSchema } from "~/validation-schemas";
import {
  Button,
  Card,
  Field,
  Heading,
  InlineError,
  Input,
  Text,
  SrOnly,
} from "~/components";

const { API_URL } = config;

const checkStatus = async (
  response,
  setSubmitting,
  setStatus,
  type,
  history
) => {
  let json = null;
  setSubmitting(false);
  try {
    json = await response.json();
  } catch (errors) {
    setStatus({ errorMsg: errors.msg });
  }
  if (!response.ok) {
    setStatus({ errorMsg: json.errors.msg });
    return json;
  }
  setSubmitting(false);
  history.push(`${PATH[type]}/informations`, `${PATH[type]}/informations`, {
    shallow: true,
  });
  return json;
};

function EditPassword() {
  const history = useHistory();
  const { email, type } = useUser();
  const url = `${API_URL}/api/auth/reset-password`;

  const handleSubmit = async (values, setSubmitting, setStatus, type) => {
    const response = await fetch(url, {
      body: JSON.stringify({
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirmation,
        password: values.password,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    checkStatus(response, setSubmitting, setStatus, type, history);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirmation: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus, type);
    },
    validationSchema: passwordSchema,
  });

  return (
    <Card mt="5" p="0" id="modifier_mot_de_passe" tabIndex="-1">
      <Flex>
        <Box
          width={[1, 1 / 2]}
          bg="cardSecondary"
          borderRadius="5px 0 0 5px"
          p="5"
        >
          <Box height="80px">
            <Heading size={4} id="modifier_mot_de_pass">
              {"Modifier votre mot de passe"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {
                "Votre mot de passe doit comprendre 8 caractères minimum et doit contenir au moins 1 chiffre et un caractère spécial."
              }
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 1 / 2]}>
          <Box mb="2">
            <SrOnly id="instructions">
              {"Tous les champs marqués d'un astérisque * sont obligatoires"}
            </SrOnly>
            <form noValidate onSubmit={formik.handleSubmit}>
              {!!formik.status && (
                <Box color="error" mb="1" role="alert">
                  {formik.status.errorMsg}
                </Box>
              )}
              <Box role="group" aria-labelledby="modifier_mot_de_pass">
                <Field>
                  <Input
                    value={formik.values.password}
                    id="password"
                    name="password"
                    type="password"
                    hasError={formik.errors.password && formik.touched.password}
                    onChange={formik.handleChange}
                    placeholder="Votre mot de passe actuel"
                    aria-describedby="msg-password"
                    autoComplete="current-password"
                    aria-label="Votre mot de passe"
                  />
                  <div id="msg-password">
                    <InlineError
                      message={formik.errors.password}
                      fieldId="password"
                    />
                  </div>
                </Field>
                <Field>
                  <Input
                    value={formik.values.newPassword}
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    hasError={
                      formik.errors.newPassword && formik.touched.newPassword
                    }
                    onChange={formik.handleChange}
                    placeholder="Votre nouveau mot de passe"
                    aria-describedby="msg-newPassword"
                    autoComplete="new-password"
                    aria-label="Votre nouveau mot de passe"
                  />
                  <div id="msg-newPassword">
                    <InlineError
                      message={formik.errors.newPassword}
                      fieldId="newPassword"
                    />
                  </div>
                </Field>
                <Field>
                  <Input
                    value={formik.values.newPasswordConfirmation}
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    type="password"
                    hasError={
                      formik.errors.newPasswordConfirmation &&
                      formik.touched.newPasswordConfirmation
                    }
                    onChange={formik.handleChange}
                    placeholder="Confirmation de votre nouveau mot de passe"
                    aria-describedby="msg-newPasswordConfirmation"
                    autoComplete="Confirmation de votre nouveau mot de passe"
                    aria-label="Votre nouveau mot de passe"
                  />
                  <div id="msg-newPasswordConfirmation">
                    <InlineError
                      message={formik.errors.newPasswordConfirmation}
                      fieldId="newPasswordConfirmation"
                    />
                  </div>
                </Field>
              </Box>
              <Flex alignItems="center" justifyContent="flex-end">
                <Box mr="2">
                  <Button
                    as="a"
                    type={null}
                    href={`${PATH[type]}/informations`}
                    title="Annuler la modification de votre mot de passe"
                    aria-label="Annuler la modification de votre mot de passe"
                  >
                    Annuler
                  </Button>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                    title="Enregistrer la modification de votre mot de passe"
                    aria-label="Enregistrer la modification de votre mot de passe"
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
}

export { EditPassword };
