import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { isIndividuel, isMandataire } from "@emjpm/biz";
import { useCallback } from "react";
import { Box, Flex } from "rebass";

import { FormGrayBox, FormInputBox } from "~/components/AppForm";
import { Button, Heading, Text } from "~/components";

import { AdminMandataireListeBlanche } from "./AdminMandataireListeBlanche";
import { AdminServiceListeBlanche } from "./AdminServiceListeBlanche";
import { ACTIVATE_USER, SEND_EMAIL_ACCOUNT_VALIDATION } from "./mutations";
import { LISTE_BLANCHE, USER } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

function AdminUserActivation(props) {
  const { userId } = props;

  const [execQuery, queryResult] = useLazyQuery(LISTE_BLANCHE);
  const { data, loading, error } = useQuery(USER, {
    onCompleted: async (data) => {
      if (data) {
        const { type, email, mandataire } = data.users_by_pk;
        if (isMandataire({ type })) {
          if (isIndividuel({ type }) && mandataire.siret) {
            await execQuery({
              variables: {
                where: {
                  siret: { _eq: mandataire.siret },
                },
              },
            });
          } else {
            await execQuery({
              variables: {
                where: {
                  email: { _eq: email },
                },
              },
            });
          }
        }
      }
    },
    variables: { userId },
  });

  const [activateUser, { loading: activateUserLoading, error: error1 }] =
    useMutation(ACTIVATE_USER);
  const [sendEmailAccountValidation, { loading: loading2, error: error2 }] =
    useMutation(SEND_EMAIL_ACCOUNT_VALIDATION);

  useQueryReady(activateUserLoading, error1);
  useQueryReady(loading2, error2);

  const liste_blanche =
    queryResult.data && queryResult.data.liste_blanche.length
      ? queryResult.data.liste_blanche[0]
      : null;

  const toggleActivation = useCallback(() => {
    const { active, id, email } = data.users_by_pk;
    const newActiveValue = !active;

    activateUser({
      variables: {
        active: newActiveValue,
        id,
      },
    });

    if (newActiveValue)
      sendEmailAccountValidation({ variables: { user_email: email } });
  }, [activateUser, sendEmailAccountValidation, data]);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { users_by_pk } = data;

  const { active, type, mandataire, service_members } = users_by_pk;

  const activateButtonStyle = active ? "warning" : "primary";
  const activateButtonText = active ? "Bloquer" : "Activer";
  return (
    <>
      {(type === "individuel" || type === "prepose" || type === "service") && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Liste blanche"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            {(type === "individuel" || type === "prepose") && (
              <AdminMandataireListeBlanche
                mandataire={mandataire}
                liste_blanche={liste_blanche}
              />
            )}
            {type === "service" && (
              <AdminServiceListeBlanche service={service_members[0]?.service} />
            )}
          </FormInputBox>
        </Flex>
      )}
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Activer / Bloquer"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <Box display="inline-flex">
            <Box>
              <Button
                disabled={isMandataire({ type }) && !mandataire.liste_blanche}
                mr={2}
                bg={activateButtonStyle}
                onClick={toggleActivation}
                isLoading={activateUserLoading}
                aria-label={`${activateButtonText} l'utilisateur`}
                title={`${activateButtonText} l'utilisateur`}
              >
                {activateButtonText}
              </Button>
            </Box>
            {!active && (
              <Box>
                <Button
                  mr={2}
                  bg={"red"}
                  title="Supprimer cet utilisateur"
                  as="a"
                  type={null}
                  href={`/admin/users/${userId}/delete`}
                >
                  {"Supprimer cet utilisateur"}
                </Button>
              </Box>
            )}
          </Box>

          {isMandataire({ type }) && mandataire && !mandataire.liste_blanche && (
            <Box ml={4} flex={1}>
              <span aria-label="information" role="img">
                ℹ️
              </span>
              <Text ml={1} as="span">
                {
                  " L'activation / désactivation requiert que l'utilisateur soit associé à un enregistrement dans la liste blanche."
                }
              </Text>
            </Box>
          )}
        </FormInputBox>
      </Flex>
    </>
  );
}

export { AdminUserActivation };
