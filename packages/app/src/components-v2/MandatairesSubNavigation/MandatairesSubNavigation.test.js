import React from "react";
import { default as MandatairesSubNavigation } from "./MandatairesSubNavigation";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesSubNavigation />).toJSON();
  expect(tree).toMatchSnapshot();
});
