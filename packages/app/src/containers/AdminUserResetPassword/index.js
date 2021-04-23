import { useMutation } from "@apollo/client";
import { Fragment } from "react";
import { Box, Flex } from "rebass";

import { FormGrayBox, FormInputBox } from "~/components/AppForm";
import { Button, Heading, Input } from "~/components";

import ImpersonateButton from "~/containers/ImpersonateButton";

import { RESET_PASSWORD } from "./mutations";

function AdminUserResetPassword(props) {
  const { userId } = props;

  const [resetPassword, { data, loading }] = useMutation(RESET_PASSWORD, {
    variables: {
      id: userId,
    },
  });

  let password;
  if (data) {
    password = data.admin_reset_user_password.password;
  }

  return (
    <>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Accès"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <Flex justifyContent="space-between">
            <Box display="inline-flex">
              <Box>
                <Button
                  mr={2}
                  bg="warning"
                  onClick={resetPassword}
                  isLoading={loading}
                >
                  Régénérer le mot de passe
                </Button>
              </Box>
              {password && (
                <Box width="170px">
                  <Input
                    label={"Nouveau mot de passe"}
                    value={password}
                    readOnly
                    name="new_password"
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    size="small"
                  />
                </Box>
              )}
            </Box>
            <Box display="inline-flex">
              <Flex width="45px">
                <ImpersonateButton userId={userId} />
              </Flex>
            </Box>
          </Flex>
        </FormInputBox>
      </Flex>
    </>
  );
}

export { AdminUserResetPassword };
