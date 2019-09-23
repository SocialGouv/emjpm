import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { MAGISTRAT_USERS, DIRECTION_USERS, GET_SERVICE_USERS, CURRENT_USER } from "./queries";

const QUERY_TYPE = {
  ti: MAGISTRAT_USERS,
  direction: DIRECTION_USERS,
  service: GET_SERVICE_USERS
};

const CurrentUser = props => {
  const { Component, userData } = props;
  const type = userData && userData.currentUser ? userData.currentUser.role : "direction";
  const userId = userData && userData.currentUser ? userData.currentUser.id : 42;

  const { data, error, loading } = useQuery(QUERY_TYPE[type], {
    variables: {
      userId: userId
    }
  });

  if (loading) {
    return <div>Chargement</div>;
  }
  if (error) {
    return <div>Erreur</div>;
  }

  const [user] = data.users;
  return <Component {...user} />;
};

const UserInformations = props => {
  const { Component } = props;

  const { data, loading, error } = useQuery(CURRENT_USER);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return <CurrentUser Component={Component} userData={data} />;
};

export { UserInformations };
