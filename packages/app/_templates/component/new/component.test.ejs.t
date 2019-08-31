---
to: src/components-v2/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name) %>.test.js
---
import React from "react";
import { <%= h.inflection.camelize(name) %> } from "./<%= h.inflection.camelize(name) %>";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<<%= h.inflection.camelize(name) %> />).toJSON();
  expect(tree).toMatchSnapshot();
});
