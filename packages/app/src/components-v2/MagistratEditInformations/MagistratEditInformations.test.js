import React from "react";
import { MagistratEditInformations } from "./MagistratEditInformations";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratEditInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
