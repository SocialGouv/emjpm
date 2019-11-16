import { useQuery } from "@apollo/react-hooks";
import React from "react";

import {
  ADMIN_USERS,
  CURRENT_USER,
  DIRECTION_USERS,
  GET_SERVICE_USERS,
  MAGISTRAT_USERS,
  MANDATAIRE_USERS
} from "./queries";

const QUERY_TYPE = {
  admin: ADMIN_USERS,
  direction: DIRECTION_USERS,
  individuel: MANDATAIRE_USERS,
  prepose: MANDATAIRE_USERS,
  service: GET_SERVICE_USERS,
  ti: MAGISTRAT_USERS
};

const CurrentUser = props => {
  const { Component, userData } = props;
  const type = userData && userData.currentUser ? userData.currentUser.role : null;
  const userId = userData && userData.currentUser ? userData.currentUser.id : null;

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
    return <div>Chargement</div>;
  }
  if (error) {
    return <div>Erreur</div>;
  }

  if (data && data.currentUser) {
    return <CurrentUser Component={Component} userData={data} />;
  } else {
    return <div>Chargement</div>;
  }
};

export { UserInformations };
