import React from "react";
import renderer from "react-test-renderer";

import { DirectionEditInformations } from "./DirectionEditInformations";

it("renders correctly", () => {
  const tree = renderer.create(<DirectionEditInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
