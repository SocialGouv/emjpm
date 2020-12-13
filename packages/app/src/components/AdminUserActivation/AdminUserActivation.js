import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { isIndividuel, isMandataire } from "@emjpm/core";
import { Button, Heading4, Text } from "@emjpm/ui";
import React, { Fragment, useCallback } from "react";
import { Box, Flex } from "rebass";

import { FormGrayBox, FormInputBox } from "../AppForm";
import { Link } from "../Commons";
import { AdminMandataireListeBlanche } from "./AdminMandataireListeBlanche";
import { ACTIVATE_USER, SEND_EMAIL_ACCOUNT_VALIDATION } from "./mutations";
import { LB_USER, USER } from "./queries";

const AdminUserActivation = (props) => {
  const { userId } = props;

  const [execQuery, queryResult] = useLazyQuery(LB_USER);
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

  const [activateUser, { loading: activateUserLoading }] = useMutation(
    ACTIVATE_USER
  );
  const [sendEmailAccountValidation] = useMutation(
    SEND_EMAIL_ACCOUNT_VALIDATION
  );
  const lb_user =
    queryResult.data && queryResult.data.lb_users.length
      ? queryResult.data.lb_users[0]
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

  const { active, type, mandataire } = users_by_pk;

  const activateButtonStyle = active ? "warning" : "primary";
  const activateButtonText = active ? "Bloquer" : "Activer";

  return (
    <Fragment>
      {isMandataire({ type }) && (
        <Flex>
          <FormGrayBox>
            <Heading4 mb={1}>{"Liste blanche"}</Heading4>
          </FormGrayBox>
          <FormInputBox>
            <AdminMandataireListeBlanche
              mandataire={mandataire}
              lb_user={lb_user}
            />
          </FormInputBox>
        </Flex>
      )}
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Activer / Bloquer"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <Box display="inline-flex">
            <Box>
              <Button
                disabled={isMandataire({ type }) && !mandataire.lb_user}
                mr={2}
                bg={activateButtonStyle}
                onClick={toggleActivation}
                isLoading={activateUserLoading}
              >
                {activateButtonText}
              </Button>
            </Box>
            {!active && (
              <Box>
                <Link
                  href={`/admin/users/[user_id]/delete`}
                  asLink={`/admin/users/${userId}/delete`}
                >
                  <Button mr={2} bg={"red"}>
                    {"Supprimer cet utilisateur"}
                  </Button>
                </Link>
              </Box>
            )}
          </Box>

          {isMandataire({ type }) && mandataire && !mandataire.lb_user && (
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
    </Fragment>
  );
};

export { AdminUserActivation };
