import { useQuery } from "@apollo/react-hooks";
import React, { createContext, Fragment } from "react";

import { isService } from "../../util";
import { setUser } from "../../util/sentry";
import {
  ADMIN_USERS,
  DIRECTION_USERS,
  GET_SERVICE_USERS,
  MAGISTRAT_USERS,
  MANDATAIRE_USERS,
} from "./queries";

export const Context = createContext({});

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
    onCompleted: ({ users_by_pk: user }) => {
      if (user) {
        setUser({ id: user.id, role: type });
      }
    },
    variables: {
      userId: userId,
    },
  });

  if (!data) {
    return <Fragment>Chargement...</Fragment>;
  }

  const user = data.users_by_pk;
  let currentService;
  if (isService(user.type)) {
    const {
      service_members: [{ service }],
    } = user;
    currentService = service;
  }

  const currentUser = {
    ...user,
    agrements,
    enquete: data.enquetes && data.enquetes.length ? data.enquetes[0] : null,
    service: currentService,
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
