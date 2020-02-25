import React from "react";
import renderer from "react-test-renderer";

import { IndicatorList } from "./IndicatorList";

it("renders correctly", () => {
  const tree = renderer.create(<IndicatorList />).toJSON();
  expect(tree).toMatchSnapshot();
});
