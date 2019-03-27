require("./.utils");

describe("Admins", () => {
  before(function() {
    cy.exec("yarn cypress:api-reset");
  });

  beforeEach(function() {
    cy.loginByForm("admin", "admin");
  });

  it("should show 4 users", function() {
    cy.getCellAction().should("have.length", 4);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
    cy.get(".ReactTable .rt-tr-group:nth-child(3)")
      .find(".rt-td")
      .first()
      .should("contain", "Mélanie");
    cy.get(".ReactTable .rt-tr-group:nth-child(4)")
      .find(".rt-td")
      .first()
      .should("contain", "Marcel");
  });
  it("should show 1 inactive users", function() {
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 1);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
  });
  it("should deactivate Adrien", function() {
    cy.getCellAction().should("contain", "Désactiver");
    cy.getCellAction()
      .first()
      .click();
    cy.getCellAction().should("contain", "Activer");
  });
  it("Adrien should be deactivated", function() {
    cy.getCellAction().should("have.length", 3);
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 2);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
  });
  it("should show 3 active users", function() {
    cy.getCellAction().should("have.length", 3);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Mélanie");
    cy.get(".ReactTable .rt-tr-group:nth-child(3)")
      .find(".rt-td")
      .first()
      .should("contain", "Marcel");
  });
  it("should activate Doug", function() {
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 2);
    cy.getCellAction()
      .last()
      .should("contain", "Activer");
    cy.getCellAction()
      .last()
      .click();
    cy.getCellAction().should("contain", "Désactiver");
  });
  it("should show 4 active users", function() {
    cy.getCellAction().should("have.length", 4);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Mélanie");
    cy.get(".ReactTable .rt-tr-group:nth-child(3)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
    cy.get(".ReactTable .rt-tr-group:nth-child(4)")
      .find(".rt-td")
      .first()
      .should("contain", "Marcel");
  });

  describe("full scenario", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
    });
    it("should navigate properly", function() {
      cy.getCellAction().should("have.length", 4);

      cy.get(".ReactTable .rt-tr-group:nth-child(1) .rt-td")
        .first()
        .should("contain", "Adrien");
      cy.get(".ReactTable .rt-tr-group:nth-child(2) .rt-td")
        .first()
        .should("contain", "Julien");

      cy.get("[data-cy='En attente de validation']").click();
      cy.wait(200); // wait for the list to appear

      cy.get(".ReactTable .rt-tr-group:nth-child(1)")
        .find(".rt-td")
        .first()
        .should("contain", "Doug");

      cy.get("[data-cy='Actifs']").click();
      cy.getCellAction().should("have.length", 4);
      cy.getCellAction("Désactiver").should("have.length", 4);
      cy.getCellAction("Activer").should("have.length", 0);

      cy.getCellAction("Désactiver")
        .first()
        .click();
      cy.getCellAction("Désactiver").should("have.length", 3);
      cy.getCellAction("Activer").should("have.length", 1);

      cy.getCellAction("Désactiver")
        .first()
        .click();
      cy.getCellAction("Désactiver").should("have.length", 2);
      cy.getCellAction("Activer").should("have.length", 2);

      cy.getCellAction("Désactiver")
        .first()
        .click();
      cy.getCellAction("Désactiver").should("have.length", 1);
      cy.getCellAction("Activer").should("have.length", 3);

      cy.get("[data-cy='En attente de validation']").click();
      cy.getCellAction().should("have.length", 4);
      cy.getCellAction("Activer").should("have.length", 4);

      cy.getCellAction("Activer")
        .first()
        .click();
      cy.getCellAction("Activer").should("have.length", 3);

      cy.getCellAction("Activer")
        .first()
        .click();
      cy.getCellAction("Activer").should("have.length", 2);

      cy.getCellAction("Activer")
        .first()
        .click();
      cy.getCellAction("Activer").should("have.length", 1);

      cy.getCellAction("Activer")
        .first()
        .click();
      cy.getCellAction("Activer").should("have.length", 0);
    });
  });
});
