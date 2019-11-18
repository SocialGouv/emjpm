import { useQuery } from "@apollo/react-hooks";
import { Button } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { stopImpersonate } from "../../business/ImpersonateService";
import { CURRENT_USER } from "./queries";
import { ImpersonateBarStyle } from "./style";

const doStopImpersonate = async realUserId => {
  const url = await stopImpersonate(realUserId);
  Router.push(url);
  if (typeof window !== "undefined") window.location.reload();
};

const ImpersonateBar = props => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }
  const realUserId = data.currentUser.realUserId;
  const id = data.currentUser.id;
  const impersonate = realUserId != id;
  return (
    <Box p={2} sx={ImpersonateBarStyle(impersonate)} {...props}>
      <Flex flexDirection="row" justifyContent="flex-end">
        <Box>
          <Button onClick={() => doStopImpersonate(realUserId)}>Stop impersonate</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export { ImpersonateBar };
