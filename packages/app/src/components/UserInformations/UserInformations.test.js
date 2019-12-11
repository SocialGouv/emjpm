import React from "react";
import renderer from "react-test-renderer";

import { UserInformations } from "./UserInformations";

it("renders correctly", () => {
  const tree = renderer.create(<UserInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
