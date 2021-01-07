import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { adminUserDeleteSchema } from "~/lib/validationSchemas";
import { Button, Heading3, Heading5 } from "~/ui";

// import { USERS } from "~/components/AdminUsers/queries";
import { DELETE_USER } from "./mutations";
import { AdminUserDeleteRemoveStyle } from "./style";

export const AdminUserDeleteForm = (props) => {
  const { userId } = props;
  const history = useHistory();

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: async () => {
      history.push("/admin/users");
    },
  });

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
        <Heading5 mb="1">{"Supprimer l'utilisateur"}</Heading5>
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
          <Heading3>{"Supprimer l'utilisateur"}</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  history.push(`/admin/users/${userId}`);
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                {"Supprimer l'utilisateur"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
