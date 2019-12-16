import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureReactivate } from "./ServiceMesureReactivate";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureReactivate />).toJSON();
  expect(tree).toMatchSnapshot();
});
