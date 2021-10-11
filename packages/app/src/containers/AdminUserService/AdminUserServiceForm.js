import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import { adminUserServiceSchema } from "~/validation-schemas";
import { Button, Heading } from "~/components";

function AdminUserServiceForm(props) {
  const { cancelLink, user, handleSubmit } = props;

  const { nom, prenom, email, service_members } = user;

  const [serviceMember] = service_members;
  const { service } = serviceMember;

  const formik = useFormik({
    initialValues: {
      email: email || "",
      nom: nom || "",
      prenom: prenom || "",
    },
    onSubmit: handleSubmit,
    validationSchema: adminUserServiceSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>{`${service.etablissement}`}</Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
          />
          <FormGroupInput
            placeholder="Nom"
            id="nom"
            formik={formik}
            validationSchema={adminUserServiceSchema}
          />
          <FormGroupInput
            placeholder="Email"
            id="email"
            formik={formik}
            validationSchema={adminUserServiceSchema}
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

export { AdminUserServiceForm };
