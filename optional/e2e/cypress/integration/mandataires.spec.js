require("./.utils");

describe("Mandataires", function() {
  describe("Session mandataire", () => {
    let token;

    before(function() {
      cy.exec("npm run cypress:api-reset");
    });

    beforeEach(function() {
      if (token) {
        localStorage.setItem("id_token", token);
      } else {
        cy.loginByForm("jeremy", "johnson123");
      }
    });

    afterEach(function() {
      token = token || localStorage.getItem("id_token");
    });

    beforeEach(function() {
      cy.visit("/mandataires");
    });

    context("session mandataire individuel", () => {
      describe("/mandataires", () => {
        it("table should show 2 mesures", () => {
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("counter should show 2/5", () => {
          cy.contains("Mesures en cours")
            .parent()
            .contains("2 / 5");
        });
        it("can add new mesure", () => {
          cy.contains("Créer une nouvelle mesure").click();
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

          cy.get("div.alert-success").should(
            "contain",
            "La mesure a bien été enregistrée"
          );

          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
        it("should have new added mesure", () => {
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
          cy.get(
            ".ReactTable .rt-tr-group:first-child .rt-td:nth-child(3)"
          ).should("contain", "Sauvegarde de justice");
          cy.get(
            ".ReactTable .rt-tr-group:first-child .rt-td:nth-child(4)"
          ).should("contain", "F");
          cy.get(
            ".ReactTable .rt-tr-group:first-child .rt-td:nth-child(5)"
          ).should("contain", "1977");
        });
        it("counter should now show 3/5", () => {
          cy.contains("Mesures en cours")
            .parent()
            .contains("3 / 5");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
        it("can close mandat", () => {
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
          cy.contains("Sauvegarde de justice")
            .parent()
            .contains("Mettre fin au mandat")
            .click();
          cy.get(".ReactModal__Content").within(() => {
            cy.contains("Mettre fin au mandat");
            cy.contains("Date d'extinction")
              .parent()
              .find("input")
              .type("2019-07-22");
            cy.contains("Raison de l'extinction")
              .parent()
              .find("select")
              .select("Autre");
            cy.contains("button", "Mettre fin au mandat").click();
          });
          cy.contains("Mesures en cours")
            .parent()
            .contains("2 / 5");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
        it("counter should now show 2/5", () => {
          cy.contains("Mesures en cours")
            .parent()
            .contains("2 / 5");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Information", () => {
      describe("/mandataires information", () => {
        it("information should show a nom and prenom", () => {
          cy.contains("Mes informations").click();
          cy.get("[data-cy=fiche-manda-email]").contains("ud@ud.com");
          cy.get("[data-cy=fiche-manda-telephone]").contains("0237100000");
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains(
            "0101010101"
          );
          cy.get("[data-cy=fiche-manda-adresse]").contains(
            "21 rue de houx 62000 Arras"
          );
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("5");
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Non");
        });
      });
      describe("/mandataires Update information", () => {
        it("information should update Fiche", () => {
          cy.contains("Mes informations").click();
          cy.contains("Modifier mon profil").click();

          cy.get(".ReactModal__Content").within(() => {
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
            cy.get(".form-group #root_zip")
              .clear()
              .type("2ème arrondissement");
            cy.get(".form-group #root_dispo_max")
              .clear()
              .type("10");
            cy.get(".form-group #root_secretariat").select("Oui");
            cy.get(".form-group #root_nb_secretariat")
              .clear()
              .type(4);

            cy.contains("button", "Valider").click();
          });

          cy.get("[data-cy=fiche-manda-email]").contains("u@u.com");
          cy.get("[data-cy=fiche-manda-telephone]").contains("0101010108");
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains(
            "0607080910"
          );
          cy.get("[data-cy=fiche-manda-adresse]").contains(
            "21 rue de oui 62009 Avesnes"
          );
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("10");
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Oui (4 ETP)");
        });
        it("counter should now show 2/10", () => {
          cy.contains("Mesures en cours")
            .parent()
            .contains("2 / 10");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Mesure Eteinte", () => {
      describe("/mandataires eteindre mesure", () => {
        it("table en cours should have 2 mesures", () => {
          cy.contains("Fins de mandats").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);

          cy.contains("Mesures en cours").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);

          // TODO(dougalsduteil): find a better way to select the first row
          cy.contains("93000 ST DENIS")
            .parent()
            .contains("Mettre fin au mandat")
            .click();

          cy.get(".ReactModal__Content").within(() => {
            cy.contains("Mettre fin au mandat");
            cy.contains("Date d'extinction")
              .parent()
              .find("input")
              .type("2019-07-22");
            cy.contains("Raison de l'extinction")
              .parent()
              .find("select")
              .select("Autre");
            cy.contains("button", "Mettre fin au mandat").click();
          });

          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);

          cy.contains("Fins de mandats").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
      });
      describe("/mandataires réactiver mesure", () => {
        it("table eteintes should have 1 mesure", () => {
          cy.contains("Mesures en cours").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);

          cy.contains("Fins de mandats").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);

          cy.contains("Réactiver la mesure").click();
          cy.contains("Cliquez ici").click();

          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);

          cy.contains("Mesures en cours").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 2);
        });
      });
    });
    context("session mandataire individuel Mesure Eteinte", () => {
      describe("valider une mesures en attente", () => {
        it("can attente mesure", () => {
          cy.contains("Mesures en attente").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);

          // TODO(dougalsduteil): find a better way to select the first row
          cy.contains("preposes")
            .parent()
            .contains("Valider")
            // NOTE(douglasduteil): the button might not be visible ...
            .scrollIntoView()
            .click();

          cy.get(".ReactModal__Content").within(() => {
            cy.contains("Valider une nouvelle mesure");
            cy.contains("Date de décision")
              .parent()
              .find("input")
              .type("2012-12-12");
            cy.contains("Lieu de vie du majeur à protéger")
              .parent()
              .find("select")
              .select("A Domicile");
            cy.contains("Code Postal")
              .parent()
              .find("input")
              .type("76000");
            cy.contains("Commune")
              .parent()
              .find("input")
              .type("Rouen");
            cy.contains("button", "Valider").click();
          });

          cy.get(".react-tabs .rt-tr-group").should("have.length", 0);
        });
        it("counter should now show 3/10", () => {
          cy.contains("Mesures en cours")
            .parent()
            .contains("3 / 10");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 3);
        });
      });
    });
  });
});
