import React from "react";
import { Layout } from "../src/components-v2/layout";
import { Filters } from "../src/components-v2/filters";

const links = [
  {
    title: "mesures",
    url: "/direction"
  },
  {
    title: "mandataires",
    url: "/mandataires"
  }
];

const direction = () => {
  return (
    <Layout links={links}>
      <Filters />
    </Layout>
  );
};

export default direction;
