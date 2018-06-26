require("./utils");

describe("Login", () => {
  it("Login with invalid account should show error message", function() {
    cy.visit("/");

    cy.get("#root_username").type("individuel");
    cy.get("#root_password").type("xxx");

    cy.get("button.btn-success").click();

    cy.get("div.alert-danger").should("contain", "Impossible de se connecter");

    cy.location("pathname").should("equal", "/");
  });

  it("Login with valid account should redirect to /mandataires", function() {
    cy.visit("/");

    cy.get("#root_username").type("jeremy");
    cy.get("#root_password").type("johnson123");

    cy.get("button.btn-success").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/mandataires");
  });
});
