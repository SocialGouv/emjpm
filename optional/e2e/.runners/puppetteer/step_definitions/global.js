const { I } = inject();
const { output } = require("codeceptjs");

//

Given("a web browser is on EMJJM", () => {
  // From "features/login.feature" {"line":8,"column":5}
  I.amOnPage("/");
});

When("I enter {string} as {string}", (value, placeholder) => {
  // From "features/login.feature" {"line":14,"column":5}
  I.fillField(placeholder, value);
});

Then("I should redirected to {string} page", url => {
  // From "features/login.feature" {"line":16,"column":5}
  I.waitInUrl(url, 5);
});

When("I click on {string}", text => {
  // From "features/login.feature" {"line":16,"column":5}
  I.click(text);
});

When("I pause", () => {
  // From "features/login.feature" {"line":16,"column":5}
  pause();
});

When("I see {string}", text => {
  // From "features/login.feature" {"line":16,"column":5}
  I.see(text);
});

When("I fill in the following", table => {
  // From "features/inscription.feature" {"line":18,"column":5}
  table.rows.forEach(({ cells: [{ value: label }, { value }] }) => {
    I.fillField(label, value);
  });
});

When("I click on {string} on the line with {string}", (buttonName, text) => {
  // From "features/login.feature" {"line":16,"column":5}

  within(locate("[role=row]").withText(text).locator, () => {
    I.click(buttonName);
  });
});

When("I am accepting popups", () => {
  I.amAcceptingPopups();
});

When("I accept the popup", () => {
  I.acceptPopup();
});

Given("the last email as the following info", async table => {
  const { expect } = require("chai");

  expect(state.lastUnreadMessage, "No email found").to.exist;
  table.rows.forEach(({ cells: [{ value: path }, { value }] }) => {
    expect(state.lastUnreadMessage).to.nested.include({ [path]: value });
  });
});

if (process.env.DEBUG) {
  Fail((test, err) => {
    // test didn't
    output.log("Fail", test);
    output.log("Failed with", err);
    pause();
  });
}
