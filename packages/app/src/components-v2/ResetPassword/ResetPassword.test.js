import React from "react";
import { ResetPassword } from "./ResetPassword";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ResetPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});
