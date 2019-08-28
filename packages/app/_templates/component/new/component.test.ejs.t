---
to: src/components-v2/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>.test.js
---
import React from "react";
import { <%= h.capitalize(name) %> } from "./<%= h.capitalize(name) %>";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<<%= h.capitalize(name) %> />).toJSON();
  expect(tree).toMatchSnapshot();
});
