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
    });

    context("session Tis", () => {
      describe("/tis", () => {
        it("table should show 2 mandataires", () => {
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.contains("Adrien");
          cy.contains("Julien");
        });

        it("counter should show 2 professionnels", () => {
          cy.contains("Majeurs Protégés").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.contains("Adrien");
          cy.contains("Julien");
        });

        it("can add a comments for a specific Mandataire", () => {
          cy.contains("Julien")
            .parentsUntil("[role=rowgroup]")
            .last()
            .click();

          cy.get(".ReactModal__Content").within(() => {
            cy.get("[data-cy=tab-comment] > div").should("have.length", 1);

            cy.get(".form-group #root_comment")
              .should("be.visible")
              // ! HACK(douglasduteil): wait for the input to be available
              // ! This is making the test less fuzzy
              // ! The map has an animation that transition from point to point
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              .wait(500)
              .type("Hello i send you a comments");
            cy.contains("Enregistrer").click();

            cy.get("[data-cy=tab-comment] > div").should("have.length", 2);
            cy.contains("Hello i send you a comments");
          });
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
          cy.contains("Adrien");
        });

        it("table should show 1 mandataires on prepose filter", () => {
          cy.get("[data-cy=tab-Prepose]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.contains("Julien");
        });

        it("table should show 0 mandataires on service filter", () => {
          cy.get("[data-cy=tab-Service]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 0);
        });
        it("table should show 1 mandataires on Lille Geolocalisation ", () => {
          cy.contains("Majeurs Protégés").click();

          cy.get("[data-cy=tab-code-postal]").type("62000");
          cy.contains("Rechercher").click();

          // ! HACK(douglasduteil): wait the map to move to the code post...
          // ! This is making the test less fuzzy
          // ! The map has an animation that transition from point to point
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(500);

          // ! HACK(douglasduteil): zoom a little...
          // ! Ensure that we only see the given code post on the map
          cy.get("[aria-label='Zoom in']").click();
          cy.get("[aria-label='Zoom in']").click();
          cy.get("[aria-label='Zoom in']").click();

          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.contains("Adrien");
        });
      });
    });
  });
});
