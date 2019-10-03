import React from "react";
import { ServiceMesureImport } from "./ServiceMesureImport";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureImport />).toJSON();
  expect(tree).toMatchSnapshot();
});
