import { Flex } from "rebass";

import { AdminLbUserDeleteForm } from "./AdminLbUserDeleteForm";
import { AdminLbUserDeleteRemoveStyle } from "./style";

export const AdminLbUserDelete = (props) => {
  const { lbUserId } = props;

  return (
    <Flex sx={AdminLbUserDeleteRemoveStyle}>
      <AdminLbUserDeleteForm lbUserId={lbUserId} />
    </Flex>
  );
};
