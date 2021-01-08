import { useQuery } from "@apollo/client";

import { SIGNUP_DATA } from "./queries";

const SignupDatas = (props) => {
  const { Component } = props;

  const { data, loading, error } = useQuery(SIGNUP_DATA);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const tiDatas = data.tis;
  const serviceDatas = data.services;
  const roleDatas = data.role;

  return (
    <Component
      tiDatas={tiDatas}
      serviceDatas={serviceDatas}
      roleDatas={roleDatas}
      {...props}
    />
  );
};

export { SignupDatas };
