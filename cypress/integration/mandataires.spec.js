require("./utils");

describe("Mandataires", function() {
  describe("Session mandataire", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
      cy.loginByForm("jeremy", "johnson123");
    });

    beforeEach(function() {
      Cypress.Cookies.preserveOnce("connect.sid");
    });

    context("session mandataire individuel", () => {
      describe("/mandataires", () => {
        it("table should show 2 mesures", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("counter should show 2/3", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "2 / 3");
        });
        it("can add new mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=button-create-mesure]").click();
          cy.dateInput(".form-group #root_date_ouverture", "2019-06-22");

          cy.get(".form-group #root_type").select("Sauvegarde de justice");
          // cy.get(".form-group #root_residence").select("A domicile");
          cy.get(".form-group #root_code_postal").type("93200");
          cy.get(".form-group #root_ville").type("Saint-Denis");
          cy.get(".form-group #root_civilite").select("F");
          cy.get(".form-group #root_annee").type("1977");
          cy.get(".form-group input[type=radio][value='A Domicile']").click();
          //root_date_ouverture
          cy.get("[data-cy=button-submit-mesure]").click();

          cy.get("div.alert-success").should("contain", "La mesure a bien été enregistrée");

          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
        it("should have new added mesure", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
          cy.get(".ReactTable .rt-tr-group:first-child .rt-td:nth-child(3)").should(
            "contain",
            "Sauvegarde de justice"
          );
          cy.get(".ReactTable .rt-tr-group:first-child .rt-td:nth-child(4)").should("contain", "F");
          cy.get(".ReactTable .rt-tr-group:first-child .rt-td:nth-child(5)").should(
            "contain",
            "1977"
          );
        });
        it("counter should now show 3/3", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "3 / 3");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
        it("can close mandat", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
          cy.get("[data-cy=button-close-mesure]")
            .first()
            .click();
          cy.dateInput(".ReactModal__Content #root", "2019-07-22");
          cy.get(".ReactModal__Content button.btn-success").click();
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "2 / 3");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("counter should now show 2/3", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "2 / 3");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Information", () => {
      describe("/mandataires information", () => {
        it("information should show a nom and prenom", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy='Mes informations']").click();
          cy.get("[data-cy=fiche-manda-email]").contains("ud@ud.com");
          cy.get("[data-cy=fiche-manda-telephone]").contains("0237100000");
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains("0101010101");
          cy.get("[data-cy=fiche-manda-adresse]").contains("21 rue de houx 62000 Arras");
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("3");
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Non");
        });
      });
      describe("/mandataires Update information", () => {
        it("information should update Fiche", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy='Mes informations']").click();
          cy.get("[data-cy=button-edit-profile]").click();
          cy.get(".form-group #root_nom")
            .clear()
            .type("test-nom");
          cy.get(".form-group #root_prenom")
            .clear()
            .type("test-prenom");

          cy.get(".form-group #root_genre").select("H");
          cy.get(".form-group #root_telephone")
            .clear()
            .type("0101010108");
          cy.get(".form-group #root_telephone_portable")
            .clear()
            .type("0607080910");
          cy.get(".form-group #root_email")
            .clear()
            .type("u@u.com");
          cy.get(".form-group #root_adresse")
            .clear()
            .type("21 rue de oui");
          cy.get(".form-group #root_code_postal")
            .clear()
            .type("62009");
          cy.get(".form-group #root_ville")
            .clear()
            .type("Avesnes");
          cy.get(".form-group #root_dispo_max")
            .clear()
            .type("10");
          cy.get(".form-group #root_secretariat").select("Oui");
          cy.get(".form-group #root_nb_secretariat")
            .clear()
            .type(4);

          cy.get("button[type='submit'].btn-success").click();

          cy.get("[data-cy=fiche-manda-email]").contains("u@u.com");
          cy.get("[data-cy=fiche-manda-telephone]").contains("0101010108");
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains("0607080910");
          cy.get("[data-cy=fiche-manda-adresse]").contains("21 rue de oui 62009 Avesnes");
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("10");
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Oui (4 ETP)");
        });
        it("counter should now show 2/10", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "2 / 10");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Mesure Eteinte", () => {
      describe("/mandataires eteindre mesure", () => {
        it("table en cours should have 2 mesures", () => {
          cy.visit("/mandataires");

          cy.get("[data-cy='Mesures éteintes']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.get("button[data-cy=button-reactivate-mesure]").should("have.length", 1);

          cy.get("[data-cy='Mesures en cours']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.get("button[data-cy=button-close-mesure]").should("have.length", 2);
          cy.get("[data-cy=button-close-mesure]")
            .first()
            .click();
          cy.get(".ReactModal__Content button.btn-success").click();

          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.get("button[data-cy=button-close-mesure]").should("have.length", 1);

          cy.get("[data-cy='Mesures éteintes']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.get("button[data-cy=button-reactivate-mesure]").should("have.length", 2);
        });
        it("table eteintes should have 1 mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy='Mesures éteintes']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.get("button[data-cy=button-reactivate-mesure]").should("have.length", 2);
        });
      });
      describe("/mandataires réactiver mesure", () => {
        it("table eteintes should have 1 mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy='Mesures en cours']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.get("[data-cy='Mesures éteintes']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
          cy.get("button[data-cy=button-reactivate-mesure]").should("have.length", 2);
          cy.get("button[data-cy=button-reactivate-mesure]")
            .first()
            .click();
          cy.get("[data-cy=button-modal-reactivate-mesure]")
            .first()
            .click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
          cy.get("[data-cy='Mesures en cours']").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Mesure Eteinte", () => {
      describe("/mandataires eteindre mesure", () => {
        it("can attente mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy='Mesures en attente']").click();
          cy.get(".react-tabs .rt-tr-group:nth-child(1) [data-cy=button-attente-mesure] ").click();
          cy.get(".form-group #root_date_ouverture").type("2012-12-12");
          cy.get(".form-group #root_residence").select("A domicile");
          cy.get(".form-group #root_code_postal").type("76000");
          cy.get(".form-group #root_ville").type("Rouen");
          cy.get("[data-cy=validation-button]").click();
        });
        it("counter should now show 3/10", () => {
          cy.visit("/mandataires");
          cy.get(".react-tabs .react-tabs__tab-list").should("contain", "3 / 10");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
      });
    });
  });
});
