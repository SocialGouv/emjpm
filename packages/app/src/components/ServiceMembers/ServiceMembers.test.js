import React from "react";
import renderer from "react-test-renderer";

import { ServiceMembers } from "./ServiceMembers";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMembers />).toJSON();
  expect(tree).toMatchSnapshot();
});
