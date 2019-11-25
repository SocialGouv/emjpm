import { Button, Card } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { doForgotPassword } from "../../components/loginComponents/ForgotPasswordForm";

const ForgotLink = props => {
  const [isOpen, toggleModal] = useState(false);
  const { email } = props;
  const changePassword = email => {
    doForgotPassword({ email: email }).then(() => {
      toggleModal(true);
    });
  };

  return (
    <Flex mt="1">
      {isOpen ? (
        <Box>
          <Card backgroundColor="success" color="white">
            Un mail vient de vous être envoyer pour réinitialiser votre mot de passe
          </Card>
        </Box>
      ) : (
        <Box>
          <Button onClick={() => changePassword(email)}>Réinitialiser mon mot de passe</Button>
        </Box>
      )}
    </Flex>
  );
};

export { ForgotLink };
