import React from "react";
import renderer from "react-test-renderer";

import { MandataireEditInformations } from "./MandataireEditInformations";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireEditInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
