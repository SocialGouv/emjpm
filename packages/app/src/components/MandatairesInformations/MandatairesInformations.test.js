import React from "react";
import renderer from "react-test-renderer";

import { MandatairesInformations } from "./MandatairesInformations";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
