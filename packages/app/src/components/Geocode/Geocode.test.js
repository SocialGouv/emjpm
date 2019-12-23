import React from "react";
import renderer from "react-test-renderer";

import { Geocode } from "./Geocode";

it("renders correctly", () => {
  const tree = renderer.create(<Geocode />).toJSON();
  expect(tree).toMatchSnapshot();
});
