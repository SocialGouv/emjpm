const { I } = inject();

//

if (process.env.DEBUG) {
  Fail((test, err) => {
    // test didn't
    output.log("Fail", test);
    output.log("Failed with", err);
    pause();
  });
}

//

Given("a web browser is on EMJJM", () => {
  I.amOnPage("/");
});

When("I enter {string} as {string}", (value, placeholder) => {
  I.fillField(placeholder, value);
});

Then("I should redirected to {string} page", url => {
  I.waitInUrl(url, 5);
});

When("I click on {string}", text => {
  I.click(text);
});

When("I pause", () => {
  pause();
});

When("I see {string}", text => {
  I.see(text);
});

When("I fill in the following", table => {
  table.rows.forEach(({ cells: [{ value: label }, { value }] }) => {
    I.fillField(label, value);
  });
});

When("I click on {string} on the line with {string}", (buttonName, text) => {
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
