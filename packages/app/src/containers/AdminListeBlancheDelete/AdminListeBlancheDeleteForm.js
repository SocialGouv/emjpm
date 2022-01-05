import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { LISTE_BLANCHE } from "~/containers/ListeBlanche/queries";
import { adminUserDeleteSchema } from "~/validation-schemas";
import { Button, Heading } from "~/components";

import { DELETE_LISTE_BLANCHE } from "./mutations";
import { AdminListeBlancheDeleteRemoveStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

export function AdminListeBlancheDeleteForm(props) {
  const { listeBlancheId } = props;

  const history = useHistory();

  const [deleteUser, { loading, error }] = useMutation(DELETE_LISTE_BLANCHE, {
    awaitRefetchQueries: true,
    onCompleted: async () => {
      history.push("/admin/liste-blanche");
    },
    refetchQueries: [
      {
        query: LISTE_BLANCHE,
      },
    ],
  });

  useQueryReady(loading, error);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      await deleteUser({
        variables: {
          listeBlancheId,
        },
      });
      setSubmitting(false);
    },
    validationSchema: adminUserDeleteSchema,
  });

  return (
    <Flex sx={AdminListeBlancheDeleteRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading size={5} mb="1">
          {"Supprimer l'utilisateur"}
        </Heading>
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
          <Heading size={3}>{"Supprimer le mandataire"}</Heading>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  history.push(`/admin/liste-blanche/${listeBlancheId}`);
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
}
