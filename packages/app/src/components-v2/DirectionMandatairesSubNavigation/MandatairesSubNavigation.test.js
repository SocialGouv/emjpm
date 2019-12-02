import React from "react";
import renderer from "react-test-renderer";

import { default as MandatairesSubNavigation } from "./MandatairesSubNavigation";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesSubNavigation />).toJSON();
  expect(tree).toMatchSnapshot();
});
