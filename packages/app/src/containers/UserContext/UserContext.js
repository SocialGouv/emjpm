import { useQuery } from "@apollo/client";
import { isService, isMandataire } from "@emjpm/biz";
import { createContext, Fragment, useMemo } from "react";

import useQueryReady from "~/hooks/useQueryReady";

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

function UserProvider(props) {
  const { type, userId, agrements, children } = props;
  const variables = {
    userId,
  };
  const endDate = useMemo(() => new Date(), []);
  if (isMandataire({ type }) || isService({ type })) {
    variables.endDate = endDate;
  }
  const { data, loading, error } = useQuery(QUERY_TYPE[type], {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const user = data.users_by_pk;
  let currentService;
  if (isService(user)) {
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
    statistics: data.statistics,
  };

  return <Context.Provider value={currentUser}>{children}</Context.Provider>;
}

export function Provider(props) {
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
}

export const { Consumer } = Context;
