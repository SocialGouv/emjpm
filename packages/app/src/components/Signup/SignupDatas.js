import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { SIGNUP_DATA } from "./queries";

const SignupDatas = props => {
  const { Component } = props;

  const { data, loading, error } = useQuery(SIGNUP_DATA);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const tiDatas = data.tis;
  const departementDatas = data.departements;
  const serviceDatas = data.services;
  const roleDatas = data.role;

  return (
    <Component
      tiDatas={tiDatas}
      departementDatas={departementDatas}
      serviceDatas={serviceDatas}
      roleDatas={roleDatas}
      {...props}
    />
  );
};

export { SignupDatas };
