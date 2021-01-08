import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { LB_USERS } from "~/components/ListeBlanche/queries";
import { adminUserDeleteSchema } from "~/lib/validationSchemas";
import { Button, Heading3, Heading5 } from "~/ui";

import { DELETE_LB_USER } from "./mutations";
import { AdminLbUserDeleteRemoveStyle } from "./style";

export const AdminLbUserDeleteForm = (props) => {
  const { lbUserId } = props;

  const history = useHistory();

  const [deleteUser] = useMutation(DELETE_LB_USER, {
    awaitRefetchQueries: true,
    onCompleted: async () => {
      history.push("/admin/liste-blanche");
    },
    refetchQueries: [
      {
        query: LB_USERS,
      },
    ],
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      await deleteUser({
        variables: {
          lbUserId: lbUserId,
        },
      });
      setSubmitting(false);
    },
    validationSchema: adminUserDeleteSchema,
  });

  return (
    <Flex sx={AdminLbUserDeleteRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">{"Supprimer l'utilisateur"}</Heading5>
        <Text mb="2" lineHeight="1.5">
          {
            "Vous êtes sur le point de supprimer définitivement un mandataire du système eMJPM. Toute suppression est irréversible, vous ne pourrez pas récupérer les données associées à ce mandataire et celui-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'État."
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Si vous souhaitez définitivement supprimer ce mandataire, cliquez sur "Supprimer le mandataire".'
          }
        </Text>
        <Text lineHeight="1.5">
          {'Dans le cas contraire, cliquez sur "Annuler".'}
        </Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>{"Supprimer le mandataire"}</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  history.push(`/admin/list-blanche/${lbUserId}`);
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
                {"Supprimer le mandataire"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
