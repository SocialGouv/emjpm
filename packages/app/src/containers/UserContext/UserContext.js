import { useQuery } from "@apollo/client";
import { isService, isMandataire, isSdpf } from "@emjpm/biz";
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

// let currentService;
let allAccessibleService;
let allAccessibleSdpf;

function UserDataQueryProvider(props) {
  const { user, children } = props;
  const { role: type, id: userId } = user;

  const [currentService, settCurrentService] = useState(() =>
    JSON.parse(localStorage.getItem("sotredService"))
  );
  const [currentSdpf, settCurrentSdpf] = useState(() =>
    JSON.parse(localStorage.getItem("sotredSdpf"))
  );

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
      localStorage.setItem(
        "sotredService",
        JSON.stringify(userData.service_members[0].service)
      );
    }
    allAccessibleService = userData.service_members?.map((x) => x.service);
  }
  if (isSdpf({ type })) {
    if (currentSdpf == null) {
      settCurrentService(userData.sdpf_members[0].sdpf);
      localStorage.setItem(
        "sotredSdpf",
        JSON.stringify(userData.sdpf_members[0].sdpf)
      );
    }
    allAccessibleSdpf = userData.sdpf_members?.map((x) => x.sdpf);
  }

  const changeService = (service) => {
    if (
      currentService == null ||
      (currentService != null && service.id != currentService.id)
    ) {
      settCurrentService(service);
      localStorage.setItem("sotredService", JSON.stringify(service));
    }
  };

  const changeSdpf = (service) => {
    if (
      currentSdpf == null ||
      (currentSdpf != null && service.id != currentSdpf.id)
    ) {
      debugger;
      settCurrentSdpf(service);
      localStorage.setItem("sotredSdpf", JSON.stringify(service));
    }
  };

  const currentUser = {
    ...userData,
    enquete: data.enquetes && data.enquetes.length ? data.enquetes[0] : null,
    service: currentService,
    sdpf: currentSdpf,
    statistics: data.statistics,
    allAccessibleService,
    allAccessibleSdpf,
    changeService,
    changeSdpf,
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
