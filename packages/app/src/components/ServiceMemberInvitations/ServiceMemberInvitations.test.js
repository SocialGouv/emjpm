import React from "react";
import renderer from "react-test-renderer";

import { ServiceMemberInvitations } from "./ServiceMemberInvitations";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMemberInvitations />).toJSON();
  expect(tree).toMatchSnapshot();
});
