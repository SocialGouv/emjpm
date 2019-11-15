import React from "react";
import renderer from "react-test-renderer";

import { AdminUsers } from "./AdminUsers";

it("renders correctly", () => {
  const tree = renderer.create(<AdminUsers />).toJSON();
  expect(tree).toMatchSnapshot();
});
