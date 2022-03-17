import styled from "@emotion/styled";

import { Box, Card, Flex } from "rebass";

import { Button, Heading } from "~/components";

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

export function EnqueteConfirmExitInvalidFormDialog({
  open,
  onConfirm,
  onCancel,
}) {
  return (
    <Box display={open ? "block" : "none"} onClick={onCancel}>
      <Modal>
        <ModalContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Card p={20}>
            <Heading size={2} textAlign="center">
              {"Formulaire invalide"}
            </Heading>
            <Heading size={3} mt={30}>
              {"Si vous quittez la page, vos modifications seront perdues."}
            </Heading>
            <Flex justifyContent="flex-end" mt={50} mb={30}>
              <Button
                variant="primary"
                onClick={onCancel}
                title="Corriger le formulaire"
                aria-label="Corriger le formulaire"
              >
                Corriger le formulaire
              </Button>
              <Button
                variant="outline"
                onClick={() => onConfirm()}
                title="Annuler les modification et quitter"
                aria-label="Annuler les modification et quitter"
              >
                Annuler mes modifications et quitter
              </Button>
            </Flex>
          </Card>
        </ModalContent>
      </Modal>
    </Box>
  );
}
