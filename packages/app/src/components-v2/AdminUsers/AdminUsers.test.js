import React from "react";
import { AdminUsers } from "./AdminUsers";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AdminUsers />).toJSON();
  expect(tree).toMatchSnapshot();
});
