import React from "react";
import { AdminTribunaux } from "./AdminTribunaux";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AdminTribunaux />).toJSON();
  expect(tree).toMatchSnapshot();
});
