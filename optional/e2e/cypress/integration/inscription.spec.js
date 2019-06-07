require("./.utils");

describe("Inscription", () => {
  it("should switch forms correctly", function() {
    cy.visit("/inscription");

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='region']")
      .first()
      .click();

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='ti']")
      .first()
      .click();

    cy.get("input[type='radio'][value='individuel']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_email']")
      .should("have.length", 1);

    cy.get("input[type='radio'][value='prepose']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_email']")
      .should("have.length", 1);

    cy.get("input[type='radio'][value='service']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_email']")
      .should("have.length", 1);

    cy.get("input[type='radio'][value='ti']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_email']")
      .should("have.length", 1);
  });

  it("should NOT register individuel when short password", function() {
    cy.visit("/inscription");

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='region']")
      .first()
      .click();

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='ti']")
      .first()
      .click();

    cy.get("input[type='radio'][value='individuel']")
      .first()
      .click();

    const data = {
      root_pass1: "pass1",
      root_pass2: "pass1",
      root_nom: "nom 1",
      root_prenom: "prenom 1",
      root_telephone: "0123456789",
      root_telephone_portable: "9876543210",
      root_email: "email1@email.com",
      root_adresse: "39 rue du user 1",
      root_code_postal: 89100,
      root_ville: "Ville user 1"
    };

    Object.keys(data).forEach(key => {
      cy.get(`input[id='${key}']`).type(data[key]);
    });

    cy.get("li.text-danger").should("have.length", 0);

    cy.get("[data-cy='form-inscription'] button[type='submit']").click();

    cy.get("li.text-danger").should("have.length", 2);
  });

  it("should NOT register individuel when not matching password", function() {
    cy.visit("/inscription");

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='region']")
      .first()
      .click();

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='ti']")
      .first()
      .click();

    cy.get("input[type='radio'][value='individuel']")
      .first()
      .click();

    const data = {
      root_pass1: "password100",
      root_pass2: "password101  ",
      root_nom: "nom 1",
      root_prenom: "prenom 1",
      root_telephone: "0123456789",
      root_telephone_portable: "9876543210",
      root_email: "email1@email.com",
      root_adresse: "39 rue du user 1",
      root_code_postal: 89100,
      root_ville: "Ville user 1"
    };

    Object.keys(data).forEach(key => {
      cy.get(`input[id='${key}']`).type(data[key]);
    });

    cy.get("li.text-danger").should("have.length", 0);

    cy.get("[data-cy='form-inscription'] button[type='submit']").click();

    cy.get("li.text-danger").should("have.length", 1);
  });

  it("should NOT register individuel when phone number is invalid", function() {
    cy.visit("/inscription");

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='region']")
      .first()
      .click();

    cy.get("[data-cy='TiByRegion-Hauts-de-France']")
      .get("[data-cy='ti']")
      .first()
      .click();

    cy.get("input[type='radio'][value='individuel']")
      .first()
      .click();

    const data = {
      root_pass1: "password100",
      root_pass2: "password100",
      root_nom: "nom 1",
      root_prenom: "prenom 1",
      root_telephone: "telephone 1",
      root_telephone_portable: "0123",
      root_email: "email1@email.com",
      root_adresse: "39 rue du user 1",
      root_code_postal: 89100,
      root_ville: "Ville user 1"
    };

    Object.keys(data).forEach(key => {
      cy.get(`input[id='${key}']`).type(data[key]);
    });

    cy.get("li.text-danger").should("have.length", 0);

    cy.get("[data-cy='form-inscription'] button[type='submit']").click();

    cy.get("li.text-danger").should("have.length", 2);
  });

  describe("registration individuel", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
    });
    it("should register individuel", function() {
      cy.loginByForm("admin", "admin");

      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 4);

      cy.visit("/inscription");

      cy.get("[data-cy='TiByRegion-Hauts-de-France']")
        .get("[data-cy='region']")
        .first()
        .click();

      cy.get("[data-cy='TiByRegion-Hauts-de-France']")
        .get("[data-cy='ti']")
        .first()
        .click();

      cy.get("input[type='radio'][value='individuel']")
        .first()
        .click();

      const data = {
        root_pass1: "password100",
        root_pass2: "password100",
        root_nom: "nom 1",
        root_prenom: "prenom 1",
        root_telephone: "0123456789",
        root_telephone_portable: "9876543210",
        root_email: "email1@email.com",
        root_adresse: "39 rue du user 1",
        root_code_postal: 89100,
        root_ville: "Ville user 1"
      };

      Object.keys(data).forEach(key => {
        cy.get(`input[id='${key}']`).type(data[key]);
      });

      cy.get("[data-cy='form-inscription'] button[type='submit']").click();

      cy.get("li.text-danger").should("have.length", 0);

      cy.location("pathname").should("eq", "/inscription-done/");

      cy.loginByForm("admin", "admin");
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 5);
    });
    it("account should not login before activation", function() {
      cy.loginByForm("email1@email.com", "password100");
      cy.get(".alert-danger").should("have.length", 1);
    });
    it("admin should be able to activate account", function() {
      cy.loginByForm("admin", "admin");
      cy.getCellAction().should("have.length", 7);
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 5);
      cy.contains("nom 1 prenom 1")
        .parent()
        .contains("Activer")
        .click();
      cy.getCellAction().should("have.length", 5);
      cy.contains("Actifs").click();
      cy.getCellAction().should("have.length", 8);
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 4);
    });
    it("account should login after activation", function() {
      cy.loginByForm("email1@email.com", "password100");
      cy.get(".alert-danger").should("have.length", 0);
      cy.location("pathname").should("eq", "/mandataires/");
    });
  });

  describe("registration tis", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
    });
    it("should register tis", function() {
      cy.loginByForm("admin", "admin");
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 4);

      cy.visit("/inscription");

      cy.get("[data-cy='TiByRegion-Hauts-de-France']")
        .get("[data-cy='region']")
        .first()
        .click();

      cy.get("[data-cy='TiByRegion-Hauts-de-France']")
        .get("[data-cy='ti']")
        .first()
        .click();

      cy.get("input[type='radio'][value='ti']")
        .first()
        .click();

      const data = {
        root_nom: "nom 1",
        root_prenom: "prenom 1",
        root_pass1: "password100",
        root_pass2: "password100",
        root_email: "email1@email.com"
      };
      const dataSelect = {
        root_cabinet: "2A"
      };

      Object.keys(data).forEach(key => {
        cy.get(`input[id='${key}']`).type(data[key]);
      });

      Object.keys(dataSelect).forEach(key => {
        cy.get(`select[id='${key}']`).select(dataSelect[key]);
      });

      cy.get("[data-cy='form-inscription'] button[type='submit']").click();

      cy.get("li.text-danger").should("have.length", 0);

      cy.location("pathname").should("eq", "/inscription-done/");

      cy.loginByForm("admin", "admin");
      cy.contains("TI").click();
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 2);
    });
    it("account should not login before activation", function() {
      cy.loginByForm("email1@email.com", "password100");
      cy.get(".alert-danger").should("have.length", 1);
    });
    it("admin should be able to activate account", function() {
      cy.loginByForm("admin", "admin");
      cy.contains("TI").click();
      cy.getCellAction().should("have.length", 1);
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 2);

      cy.contains("nom 1 prenom 1")
        .parent()
        .contains("Activer")
        .click();

      cy.getCellAction().should("have.length", 2);
      cy.contains("Actifs").click();
      cy.getCellAction().should("have.length", 2);
      cy.contains("En attente de validation").click();
      cy.getCellAction().should("have.length", 1);
    });
    it("account should login after activation", function() {
      cy.loginByForm("email1@email.com", "password100");
      cy.get(".alert-danger").should("have.length", 0);
      cy.location("pathname").should("eq", "/tis/");
    });
  });
});
