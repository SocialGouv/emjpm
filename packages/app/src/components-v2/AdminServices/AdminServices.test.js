import React from "react";
import { AdminServices } from "./AdminServices";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AdminServices />).toJSON();
  expect(tree).toMatchSnapshot();
});
