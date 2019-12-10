import React from "react";
import renderer from "react-test-renderer";

import { MandatairesEditInformations } from "./MandatairesEditInformations";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesEditInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
