import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { adminUserDeleteSchema } from "~/validation-schemas";
import { Button, Heading } from "~/components";

// import { USERS } from "~/containers/AdminUsers/queries";
import { DELETE_USER } from "./mutations";
import { AdminUserDeleteRemoveStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

export function AdminUserDeleteForm(props) {
  const { userId } = props;
  const history = useHistory();

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    onCompleted: async () => {
      history.push("/admin/users");
    },
  });

  useQueryReady(loading, error);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      await deleteUser({
        variables: {
          userId: userId,
        },
      });
      setSubmitting(false);
    },
    validationSchema: adminUserDeleteSchema,
  });

  return (
    <Flex sx={AdminUserDeleteRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading size={5} mb="1">
          {"Supprimer l'utilisateur"}
        </Heading>
        <Text mb="2" lineHeight="1.5">
          {
            "Vous êtes sur le point de supprimer définitivement un utilisateur du système eMJPM. Toute suppression est irréversible."
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Si vous souhaitez supprimer cet utilisateur, cliquez sur "Supprimer l\'utilisateur".'
          }
        </Text>
        <Text lineHeight="1.5">
          {'Dans le cas contraire, cliquez sur "Annuler".'}
        </Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading size={3}>{"Supprimer l'utilisateur"}</Heading>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type={null}
                as="a"
                href={`/admin/users/${userId}`}
                mr="2"
                variant="outline"
                title="Annuler la suppression d'un utilisateur"
                aria-label="Annuler la suppression d'un utilisateur"
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
                title="Supprimer l'utilisateur du service"
                aria-label="Supprimer l'utilisateur du service"
              >
                {"Supprimer l'utilisateur"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
