describe("My First Test", function() {
  it("Login with invalid account should show error message", function() {
    cy.visit("https://emjpm-preprod.num.social.gouv.fr");

    cy.get("#root_username").type("TI ARRAS");
    cy.get("#root_password").type("TI ARRAS");

    cy.get("button.btn-success").click();

    cy.get("div.alert-danger").should("contain", "Impossible de se connecter");
  });
});
