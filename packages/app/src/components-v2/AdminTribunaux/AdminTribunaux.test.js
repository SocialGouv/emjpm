import React from "react";
import renderer from "react-test-renderer";

import { AdminTribunaux } from "./AdminTribunaux";

it("renders correctly", () => {
  const tree = renderer.create(<AdminTribunaux />).toJSON();
  expect(tree).toMatchSnapshot();
});
