import React from "react";
import { ServiceCreateAntenne } from "./ServiceCreateAntenne";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceCreateAntenne />).toJSON();
  expect(tree).toMatchSnapshot();
});
