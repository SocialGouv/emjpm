import { useQuery } from "@apollo/client";
import { isService, isMandataire } from "@emjpm/biz";
import { createContext, useMemo } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { endDate } from "~/utils/dates";

import {
  ADMIN_USERS,
  DIRECTION_USERS,
  GET_SERVICE_USERS,
  MAGISTRAT_USERS,
  GREFFIER_USERS,
  MANDATAIRE_USERS,
  DPFI_USERS,
  SDPF_USERS,
} from "./queries";

export const Context = createContext({});

const QUERY_TYPE = {
  admin: ADMIN_USERS,
  direction: DIRECTION_USERS,
  individuel: MANDATAIRE_USERS,
  prepose: MANDATAIRE_USERS,
  service: GET_SERVICE_USERS,
  ti: MAGISTRAT_USERS,
  greffier: GREFFIER_USERS,
  dpfi: DPFI_USERS,
  sdpf: SDPF_USERS,
};

function UserDataQueryProvider(props) {
  const { user, children } = props;
  const { role: type, id: userId } = user;

  const variables = useMemo(() => {
    const variables = {
      userId: parseInt(userId),
    };

    // isDpfi({ type }) ||
    // isSdpf({ type })
    if (isMandataire({ type }) || isService({ type })) {
      variables.endDate = endDate;
    }

    return variables;
  }, [userId, type]);

  const { data, loading, error } = useQuery(QUERY_TYPE[type], {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const userData = data.users_by_pk;

  let currentService;
  if (isService(userData)) {
    const {
      service_members: [{ service }],
    } = userData;
    currentService = service;
  }

  const currentUser = {
    ...userData,
    enquete: data.enquetes && data.enquetes.length ? data.enquetes[0] : null,
    service: currentService,
    statistics: data.statistics,
  };

  return <Context.Provider value={currentUser}>{children}</Context.Provider>;
}

export function Provider(props) {
  const { children, user } = props;
  if (user?.id) {
    return (
      <UserDataQueryProvider user={user}>{children}</UserDataQueryProvider>
    );
  }

  return <>{children}</>;
}

export const { Consumer } = Context;
