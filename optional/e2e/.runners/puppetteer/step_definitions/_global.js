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

Given("la page est totalement chargée", () => {
  I.wait(5);
})

Given("je suis connecté en tant que tribunal", () => {
  I.amOnPage("/login");
  I.fillField("Votre nom d'utilisateur", "sylvie.houen@justice.fr");
  I.fillField("Votre mot de passe", "emjpm2019");
  I.click("Se connecter");
});

Given("a web browser is on EMJPM", () => {
  I.amOnPage("/");
});

Given("je suis redirigé sur la page {string}", (url) => {
  I.waitInUrl(url, 5);
})

Given("je navigue sur la page {string}", url => {
  I.amOnPage(url);
  I.wait(5);
})

//

When("I enter {string} as {string}", (value, placeholder) => {
  I.fillField(placeholder, value);
});

When("pause", () => {
  pause();
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

When("I click on {string} in dropdown", text => {
  I.click(locate("div").withText(text));
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

//

Then("I should redirected to {string} page", url => {
  I.waitInUrl(url, 5);
});

Then("I wait for text {string}", text => {
  I.waitForText(text);
});
