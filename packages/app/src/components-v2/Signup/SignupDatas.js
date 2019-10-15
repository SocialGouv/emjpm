import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { ALL_DATA_OPTIONS } from "./queries";

const SignupDatas = props => {
  const { Component } = props;

  const { data, loading, error } = useQuery(ALL_DATA_OPTIONS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const tiDatas = data.tis;
  const departementDatas = data.departements;
  const serviceDatas = data.services;

  return (
    <Component
      tiDatas={tiDatas}
      departementDatas={departementDatas}
      serviceDatas={serviceDatas}
      {...props}
    />
  );
};

export { SignupDatas };
