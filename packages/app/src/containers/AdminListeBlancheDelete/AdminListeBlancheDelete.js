import { Flex } from "rebass";

import { AdminListeBlancheDeleteForm } from "./AdminListeBlancheDeleteForm";
import { AdminListeBlancheDeleteRemoveStyle } from "./style";

export function AdminListeBlancheDelete(props) {
  const { listeBlancheId } = props;

  return (
    <Flex sx={AdminListeBlancheDeleteRemoveStyle}>
      <AdminListeBlancheDeleteForm listeBlancheId={listeBlancheId} />
    </Flex>
  );
}
