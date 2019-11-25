import React from "react";
import renderer from "react-test-renderer";

import { DirectionInformations } from "./DirectionInformations";

it("renders correctly", () => {
  const tree = renderer.create(<DirectionInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
