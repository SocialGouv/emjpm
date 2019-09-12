import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_CURRENT_USER } from "./queries";

const UserInformations = props => {
  const { Component } = props;
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { currentUser } = data;
  return <Component currentUser={currentUser} />;
};

export { UserInformations };
