import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { default as LoginForm, LoginFormView } from "../src/components/loginComponents/LoginForm";

storiesOf("Login", module)
  .add("interactif", () => <LoginForm />)
  .add("default", () => <LoginFormView />)
  .add("loading", () => (
    <LoginFormView formData={{ username: "test1", password: "password" }} status="loading" />
  ))
  .add("success", () => (
    <LoginFormView formData={{ username: "test1", password: "password" }} status="success" />
  ))
  .add("error", () => (
    <LoginFormView
      formData={{ username: "test1", password: "password" }}
      status="error"
      error="Le message d'erreur qui va bien"
    />
  ));
