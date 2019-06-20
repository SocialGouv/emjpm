
const { I } = inject();

<<<<<<< Updated upstream
=======
Before(() => {
  console.lg('Before')
});

>>>>>>> Stashed changes
Given('a web browser is on EMJJM', () => {
  // From "features/login.feature" {"line":8,"column":5}
  I.amOnPage("/");
});

When("I enter {string} as {string}", (value, placeholder) => {
  // From "features/login.feature" {"line":14,"column":5}
  I.fillField(placeholder, value);
});

Then('I should redirected to {string} page', (url) => {
  // From "features/login.feature" {"line":16,"column":5}
<<<<<<< Updated upstream
  I.waitInUrl(url);
});

When('I press {string}', (text) => {
  // From "features/login.feature" {"line":16,"column":5}
  I.click(text);
});
=======
  I.waitInUrl(url, 5);
});

When('I click on {string}', (text) => {
  // From "features/login.feature" {"line":16,"column":5}
  I.click(text);
});

When('I pause', () => {
  // From "features/login.feature" {"line":16,"column":5}
  pause();
});

When("I see {string}", text => {
  // From "features/login.feature" {"line":16,"column":5}
  I.see(text);
});

When("I fill in the following", table => {
  // From "features/inscription.feature" {"line":18,"column":5}
  table.rows.forEach(({cells: [{value: label}, {value}]}) => {
    I.fillField(label, value);
  });
});
>>>>>>> Stashed changes
