import { useQuery } from "@apollo/react-hooks";
import React, { createContext, Fragment } from "react";

export const Context = createContext({});

import {
  ADMIN_USERS,
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

const UserProvider = props => {
  const { type, userId, children } = props;
  const { data } = useQuery(QUERY_TYPE[type], {
    variables: {
      userId: userId
    }
  });

  if (!data) {
    return <Fragment>loading</Fragment>;
  }

  const [currentUser] = data.users;
  return <Context.Provider value={currentUser}>{children}</Context.Provider>;
};

export const Provider = props => {
  const { children, user } = props;
  const type = user ? user.role : null;
  const userId = user ? user.id : null;
  if (userId) {
    return (
      <UserProvider type={type} userId={userId}>
        {children}
      </UserProvider>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export const { Consumer } = Context;
