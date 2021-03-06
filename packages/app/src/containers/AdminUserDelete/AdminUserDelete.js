import { Flex } from "rebass";

import { AdminUserDeleteForm } from "./AdminUserDeleteForm";
import { AdminUserDeleteRemoveStyle } from "./style";

export function AdminUserDelete(props) {
  const { userId } = props;

  return (
    <Flex sx={AdminUserDeleteRemoveStyle}>
      <AdminUserDeleteForm userId={userId} />
    </Flex>
  );
}
