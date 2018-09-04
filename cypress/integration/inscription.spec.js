require("./utils");

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
      .get("input[id='root_username']")
      .should("have.length", 1);

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_etablissement']")
      .should("have.length", 0);

    cy.get("input[type='radio'][value='prepose']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_username']")
      .should("have.length", 1);

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_etablissement']")
      .should("have.length", 1);

    cy.get("input[type='radio'][value='service']")
      .first()
      .click();

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_username']")
      .should("have.length", 1);

    cy.get("[data-cy='form-inscription']")
      .get("input[id='root_etablissement']")
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
      root_username: "username-individuel",
      root_pass1: "pass1",
      root_pass2: "pass1",
      root_nom: "nom 1",
      root_prenom: "prenom 1",
      root_telephone: "telephone 1",
      root_telephone_portable: "telephone_portable 1",
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
      root_username: "username-individuel",
      root_pass1: "password100",
      root_pass2: "password101  ",
      root_nom: "nom 1",
      root_prenom: "prenom 1",
      root_telephone: "telephone 1",
      root_telephone_portable: "telephone_portable 1",
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
  describe("registration individuel", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
    });
    it("should register individuel", function() {
      cy.loginByForm("admin", "admin");
      cy.get("[data-cy='En attente de validation']").click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 1);

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
        root_username: "username-individuel",
        root_pass1: "password100",
        root_pass2: "password100",
        root_nom: "nom 1",
        root_prenom: "prenom 1",
        root_telephone: "telephone 1",
        root_telephone_portable: "telephone_portable 1",
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

      cy.location("pathname", { timeout: 10000 }).should("eq", "/inscription-done");

      cy.loginByForm("admin", "admin");
      cy.get("[data-cy='En attente de validation']").click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 2);
    });
    it("account should not login before activation", function() {
      cy.loginByForm("username-individuel", "password100");
      cy.get(".alert-danger").should("have.length", 1);
    });
    it("admin should be able to activate account", function() {
      cy.loginByForm("admin", "admin");
      cy.get("[data-cy='UserCellAction']").should("have.length", 2);
      cy.get("[data-cy='En attente de validation']").click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 2);
      cy.get("[data-cy='UserCellAction']")
        .last()
        .click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 2);
      cy.get("[data-cy='Actifs']").click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 3);
      cy.get("[data-cy='En attente de validation']").click();
      cy.get("[data-cy='UserCellAction']").should("have.length", 1);
    });
    it("account should login after activation", function() {
      cy.loginByForm("username-individuel", "password100");
      cy.get(".alert-danger").should("have.length", 0);
      cy.location("pathname", { timeout: 10000 }).should("eq", "/mandataires");
    });
  });
});
