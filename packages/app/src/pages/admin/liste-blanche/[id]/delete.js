import React from "react";
import { Flex } from "rebass";

import { AdminLbUserDelete } from "~/components/AdminLbUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const AdminUserDeletePage = () => {
  const { id: lbUserId } = useQuery();

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminLbUserDelete lbUserId={lbUserId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default AdminUserDeletePage;
