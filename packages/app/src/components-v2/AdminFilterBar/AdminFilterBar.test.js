import React from "react";
import { AdminFilterBar } from "./AdminFilterBar";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AdminFilterBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
