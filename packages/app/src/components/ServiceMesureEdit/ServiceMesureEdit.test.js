import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureEdit } from "./ServiceMesureEdit";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
