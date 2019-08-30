import React from "react";
import { PreferencesPanel } from "./PreferencesPanel";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<PreferencesPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
