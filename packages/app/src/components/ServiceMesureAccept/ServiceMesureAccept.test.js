import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureAccept } from "./ServiceMesureAccept";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureAccept />).toJSON();
  expect(tree).toMatchSnapshot();
});
