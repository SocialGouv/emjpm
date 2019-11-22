import React from "react";
import renderer from "react-test-renderer";

import { ServiceEdit } from "./ServiceEdit";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
