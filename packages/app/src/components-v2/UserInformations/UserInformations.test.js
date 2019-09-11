import React from "react";
import { UserInformations } from "./UserInformations";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<UserInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
