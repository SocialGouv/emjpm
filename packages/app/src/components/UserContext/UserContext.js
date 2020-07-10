import { useQuery } from "@apollo/react-hooks";
import React, { createContext, Fragment } from "react";

import { setUser } from "../../util/sentry";

export const Context = createContext({});

import {
  ADMIN_USERS,
  DIRECTION_USERS,
  GET_SERVICE_USERS,
  MAGISTRAT_USERS,
  MANDATAIRE_USERS,
} from "./queries";

const QUERY_TYPE = {
  admin: ADMIN_USERS,
  direction: DIRECTION_USERS,
  individuel: MANDATAIRE_USERS,
  prepose: MANDATAIRE_USERS,
  service: GET_SERVICE_USERS,
  ti: MAGISTRAT_USERS,
};

const UserProvider = (props) => {
  const { type, userId, agrements, children } = props;
  const { data } = useQuery(QUERY_TYPE[type], {
    variables: {
      userId: userId,
    },
    onCompleted: ({ users_by_pk: user }) => {
      if (user) {
        setUser({ id: user.id, role: type });
      }
    },
  });

  if (!data) {
    return <Fragment>Chargement...</Fragment>;
  }

  const currentUser = {
    ...data.users_by_pk,
    agrements,
    enquete: data.enquetes && data.enquetes.length ? data.enquetes[0] : null,
  };

  return <Context.Provider value={currentUser}>{children}</Context.Provider>;
};

export const Provider = (props) => {
  const { children, user } = props;
  const type = user ? user.role : null;
  const userId = user ? user.id : null;
  const agrements = user ? user.agrements : [];

  if (userId) {
    return (
      <UserProvider type={type} userId={userId} agrements={agrements}>
        {children}
      </UserProvider>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export const { Consumer } = Context;
