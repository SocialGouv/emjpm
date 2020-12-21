import styled from "@emotion/styled";
import React from "react";
import { Box, Card, Flex } from "rebass";

import { Button, Heading2, Heading3 } from "~/ui";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  margin: 15% auto;
  width: 80%;
  max-width: 800px;
`;

export const EnqueteConfirmExitInvalidFormDialog = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Box display={open ? "block" : "none"} onClick={onCancel}>
      <Modal>
        <ModalContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Card p={20}>
            <Heading2 textAlign="center">{"Formulaire invalide"}</Heading2>
            <Heading3 mt={30}>
              {"Si vous quittez la page, vos modifications seront perdues."}
            </Heading3>
            <Flex justifyContent="flex-end" mt={50} mb={30}>
              <Button variant="primary" onClick={onCancel}>
                Corriger le formulaire
              </Button>
              <Button variant="outline" onClick={() => onConfirm()}>
                Annuler mes modifications et quitter
              </Button>
            </Flex>
          </Card>
        </ModalContent>
      </Modal>
    </Box>
  );
};
