import React from "react";
import renderer from "react-test-renderer";

import { IndicatorsMenu } from "./IndicatorsMenu";

it("renders correctly", () => {
  const tree = renderer.create(<IndicatorsMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});
