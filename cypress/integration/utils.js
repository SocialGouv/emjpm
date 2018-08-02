Cypress.Commands.add("loginByForm", (username, password) => {
  Cypress.log({
    name: "loginByForm",
    message: username + " | " + password
  });

  cy.visit("/");

  cy.get("#root_username").type(username);
  cy.get("#root_password").type(password);

  cy.get("button.btn-success").click();
});

// hack for date inputs and react-jsonschema-form (need on onChange that cypress doesnt trigger)
Cypress.Commands.add("dateInput", (selector, dateString) => {
  cy.get(selector)
    .then(input => input.attr("type", "text"))
    .clear()
    .type(dateString);
});

Cypress.Commands.add("getCellAction", text => {
  cy.get("[data-cy=UserCellAction]").filter(
    (i, el) => (text ? (el.textContent ? el.textContent.indexOf(text) > -1 : true) : true)
  );
});
