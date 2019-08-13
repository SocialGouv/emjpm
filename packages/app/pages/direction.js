import React from "react";
import { Layout } from "../src/components-v2/layout";

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
      <div>test</div>
    </Layout>
  );
};

export default direction;
