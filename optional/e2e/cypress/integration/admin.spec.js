require("./.utils");

describe("Admins", () => {
  before(function() {
    cy.exec("yarn cypress:api-reset");
  });

  beforeEach(function() {
    cy.loginByForm("admin", "admin");
  });

  it("should show 7 users", function() {
    cy.getCellAction().should("have.length", 7);
    cy.contains("Adrien");
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Dark Vador");
    cy.contains("Pierre");
    cy.contains("Momo");
    cy.contains("Marcel");
  });

  it("should show 4 inactive users", function() {
    cy.contains("En attente de validation").click();
    cy.getCellAction().should("have.length", 4);
    cy.contains("Paul");
    cy.contains("Jack");
    cy.contains("Jean");
    cy.contains("Doug");
  });

  it("should deactivate Adrien", function() {
    const button = cy.contains("Adrien")
      .parent()
      .contains("Désactiver");
    button.click();
    button.should("contain", "Activer");
  });

  it("Adrien should be deactivated", function() {
    cy.contains("Adrien").should("not.exist");
    cy.contains("En attente de validation").click();
    cy.contains("Adrien");
  });

  it("should show 6 active users", function() {
    cy.getCellAction().should("have.length", 6);
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Dark Vador");
    cy.contains("Pierre");
    cy.contains("Momo");
    cy.contains("Marcel");
  });

  it("should activate Doug", function() {
    cy.contains("En attente de validation").click();
    const button = cy
      .contains("Doug")
      .parent()
      .contains("Activer");

    button.click();
    button.should("contain", "Désactiver");
  });

  it("should show 7 active users", function() {
    cy.getCellAction().should("have.length", 7);
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Dark Vador");
    cy.contains("Pierre");
    cy.contains("Momo");
    cy.contains("Doug");
    cy.contains("Marcel");
  });
});
