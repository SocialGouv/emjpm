import React from "react";
import renderer from "react-test-renderer";

import { MandataireInformations } from "./MandataireInformations";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
