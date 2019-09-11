import React from "react";
import { ServiceMesures } from "./ServiceMesures";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
