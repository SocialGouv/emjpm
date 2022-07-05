import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";

import { SIGNUP_DATA } from "./queries";

function SignupDatas(props) {
  const { Component } = props;

  const { data, loading, error } = useQuery(SIGNUP_DATA);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const tiDatas = data.tis;
  const serviceDatas = data.services;
  const roleDatas = data.role;
  const sdpfDatas = data.sdpf;

  return (
    <Component
      tiDatas={tiDatas}
      serviceDatas={serviceDatas}
      roleDatas={roleDatas}
      sdpfDatas={sdpfDatas}
      {...props}
    />
  );
}

export { SignupDatas };
