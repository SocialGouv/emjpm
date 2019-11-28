import React from "react";
import renderer from "react-test-renderer";

import { EditPassword } from "./EditPassword";

it("renders correctly", () => {
  const tree = renderer.create(<EditPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});
