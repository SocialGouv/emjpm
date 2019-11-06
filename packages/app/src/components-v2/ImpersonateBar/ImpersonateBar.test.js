import React from "react";
import { ImpersonateBar } from "./ImpersonateBar";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ImpersonateBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
