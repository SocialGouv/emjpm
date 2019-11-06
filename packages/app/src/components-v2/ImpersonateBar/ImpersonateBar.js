import { useQuery } from "@apollo/react-hooks";
import { Button } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Box } from "rebass";
import { stopImpersonate } from "../../business/ImpersonateService";
import { CURRENT_USER } from "./queries";
import { ImpersonateBarStyle } from "./style";

const doStopImpersonate = async readUserId => {
  const url = await stopImpersonate(readUserId);
  Router.push(url);
};

const ImpersonateBar = props => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }
  const readUserId = data.currentUser.realUserId;
  return (
    <Box p={2} sx={ImpersonateBarStyle(readUserId)} {...props}>
      <Button variant="outline" onClick={() => doStopImpersonate(readUserId)}>
        Stop impersonate
      </Button>
    </Box>
  );
};

export { ImpersonateBar };
