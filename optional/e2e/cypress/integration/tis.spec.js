require("./.utils");

describe("Tis", function() {
  describe("Session Tis", () => {
    let token;

    before(function() {
      cy.exec("npm run cypress:api-reset");
    });

    beforeEach(function() {
      if (token) {
        localStorage.setItem("id_token", token);
      } else {
        cy.loginByForm("ti1", "ti1");
      }
    });

    afterEach(function() {
      token = token || localStorage.getItem("id_token");
    });

    beforeEach(function() {
      cy.visit("/tis");

      // ! HACK(douglasduteil): force resize to ensure to trigger new data request
      // ! Seems like changing the screen size change the data in the list as
      // ! it changes the size of the map...
      cy.viewport("macbook-15");
      // ! HACK(douglasduteil): wait for react to render...
      // ! This is making the test less fuzzy
      /* eslint-disable cypress/no-unnecessary-waiting */
      cy.wait(250);
      /* eslint-enable cypress/no-unnecessary-waiting */
    });

    context("session Tis", () => {
      describe("/tis", () => {
        it("table should show 2 mandataires", () => {
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("counter should show 2 professionnels", () => {
          cy.get("[data-cy=Mandataires]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("can add a comments for a specific Mandataire", () => {
          cy.get(".react-tabs .rt-tr-group:nth-child(2)").click();

          // ! HACK(douglasduteil): wait for react to render...
          // ! The modal seems to take some time to be so we wait...
          // ! This is making the test less fuzzy
          /* eslint-disable cypress/no-unnecessary-waiting */
          cy.wait(250);
          /* eslint-enable cypress/no-unnecessary-waiting */

          cy.get(".form-group #root_comment").type(
            "Hello i send you a comments"
          );
          cy.get("[data-cy=button-enregistrer-comment]").click();
          cy.get("[data-cy=tab-comment] div:nth-child(2) div").contains(
            "Hello i send you a comments"
          );
        });

        it("add reservation mesure", () => {
          cy.get(
            ".react-tabs .rt-tr-group:nth-child(2) [data-cy=button-reservation-mesure]"
          ).click();
          cy.get(".form-group #root_type").select("Tutelle");
          cy.get(".form-group #root_civilite").select("F");
          cy.get(".form-group #root_annee").type("1987");
          cy.get("[data-cy=button-submit-mesure]").click();
          cy.get("[data-cy=button-validation]").click();
          cy.get(
            ".react-tabs .rt-tr-group:nth-child(2) [data-cy=attente]"
          ).contains(1);
        });

        it("check display of the mandataire Identity", () => {
          cy.get(".react-tabs .rt-tr-group:nth-child(2)").click();
          cy.get("[data-cy=fiche-manda-telephone]").contains("0237100000");
        });

        it("table should show 1 mandataires on individuel filter", () => {
          cy.get("[data-cy=tab-Individuel]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });

        it("table should show 1 mandataires on prepose filter", () => {
          cy.get("[data-cy=tab-Prepose]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });

        it("table should show 0 mandataires on service filter", () => {
          cy.get("[data-cy=tab-Service]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 0);
        });
        it("table should show 1 mandataires on Lille Geolocalisation ", () => {
          cy.get("[data-cy=tab-code-postal]").type("62000");
          cy.get("[data-cy=tab-recherche]").click();

          // ! HACK(douglasduteil): force resize to ensure to trigger new data request
          // ! Seems like changing the screen size change the data in the list as
          // ! it changes the size of the map...
          cy.viewport("macbook-13");
          // ! HACK(douglasduteil): wait for react to render...
          // ! This is making the test less fuzzy
          /* eslint-disable cypress/no-unnecessary-waiting */
          cy.wait(250);
          /* eslint-enable cypress/no-unnecessary-waiting */

          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });
      });
    });
  });
});
