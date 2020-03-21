import React from "react";
import renderer from "react-test-renderer";

import { MandataireAgrement } from "./MandataireAgrement";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireAgrement />).toJSON();
  expect(tree).toMatchSnapshot();
});
