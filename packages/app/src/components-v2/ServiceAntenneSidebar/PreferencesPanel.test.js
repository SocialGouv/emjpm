import React from "react";
import renderer from "react-test-renderer";

import { PreferencesPanel } from "./PreferencesPanel";

it("renders correctly", () => {
  const tree = renderer.create(<PreferencesPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
