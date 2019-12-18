import React from "react";
import renderer from "react-test-renderer";

import { MandataireMap } from "./MandataireMap";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
