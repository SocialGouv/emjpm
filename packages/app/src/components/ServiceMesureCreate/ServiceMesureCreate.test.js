import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureCreate } from "./ServiceMesureCreate";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureCreate />).toJSON();
  expect(tree).toMatchSnapshot();
});
