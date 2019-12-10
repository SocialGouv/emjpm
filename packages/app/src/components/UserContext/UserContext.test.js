import React from "react";
import renderer from "react-test-renderer";

import { Provider } from "./UserContext";

it("renders correctly", () => {
  const tree = renderer.create(<Provider />).toJSON();
  expect(tree).toMatchSnapshot();
});
