import React from "react";
import renderer from "react-test-renderer";

import { ImpersonateBar } from "./ImpersonateBar";

it("renders correctly", () => {
  const tree = renderer.create(<ImpersonateBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
