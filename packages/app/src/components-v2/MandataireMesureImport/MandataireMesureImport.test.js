import React from "react";
import { MandataireMesureImport } from "./MandataireMesureImport";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureImport />).toJSON();
  expect(tree).toMatchSnapshot();
});
