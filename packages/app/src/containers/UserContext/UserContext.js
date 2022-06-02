import { useQuery } from "@apollo/client";
import { isService, isMandataire } from "@emjpm/biz";
import { createContext, useMemo, useState } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { endDate } from "~/utils/dates";

import {
  ADMIN_USERS,
  DIRECTION_USERS,
  GET_SERVICE_USERS,
  MAGISTRAT_USERS,
  GREFFIER_USERS,
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
  greffier: GREFFIER_USERS,
};

// let currentService;
let allAccessibleService;

function UserDataQueryProvider(props) {
  const { user, children } = props;
  const { role: type, id: userId } = user;

  const [currentService, settCurrentService] = useState(null);

  const variables = useMemo(() => {
    const variables = {
      userId: parseInt(userId),
    };
    if (isMandataire({ type }) || isService({ type })) {
      variables.endDate = endDate;
    }
    if (isService({ type }) && currentService) {
      if (currentService != null) {
        variables.serviceId = currentService.id;
      }
    }
    return variables;
  }, [userId, type, currentService]);

  const { data, loading, error } = useQuery(QUERY_TYPE[type], {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const userData = data.users_by_pk;

  if (isService(userData)) {
    // currentService = userData.service_members[0].service;
    if (currentService == null) {
      settCurrentService(userData.service_members[0].service);
    }
    allAccessibleService = userData.service_members?.map((x) => x.service);
  }

  const changeService = (service) => {
    if (
      currentService == null ||
      (currentService != null && service.id != currentService.id)
    ) {
      settCurrentService(service);
    }
  };

  console.log("currentService", currentService);
  const currentUser = {
    ...userData,
    enquete: data.enquetes && data.enquetes.length ? data.enquetes[0] : null,
    service: currentService,
    statistics: data.statistics,
    allAccessibleService,
    changeService,
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
