import React from "react";
import { MandatairesExport } from "./MandatairesExport";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesExport />).toJSON();
  expect(tree).toMatchSnapshot();
});
