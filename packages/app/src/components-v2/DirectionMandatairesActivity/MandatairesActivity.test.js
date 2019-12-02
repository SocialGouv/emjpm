import React from "react";
import renderer from "react-test-renderer";

import { MandatairesActivity } from "./MandatairesActivity";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesActivity />).toJSON();
  expect(tree).toMatchSnapshot();
});
