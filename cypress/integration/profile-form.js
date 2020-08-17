describe("Profile page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Username").find("input").type("jw");
    cy.contains("Password").find("input").type("test");
    cy.contains("Submit").click();
    cy.get("nav").contains("Profile").click();
  });

  it("Profile page shows all fields", () => {
    cy.get('input[name="firstName"]').should("be.value", "Jon");
    cy.get('input[name="otherNames"]').should("be.value", "Williams");
    cy.get('input[name="address.street"]').should("be.value", "1 Mill Street");
    cy.get('input[name="address.town"]').should("be.value", "Northampton");
    cy.get('input[name="address.county"]').should(
      "be.value",
      "Northamponshire"
    );
    cy.get('input[name="address.postcode"]').should("be.value", "NU7 JK8");
    cy.get('input[name="mobile"]').should("be.value", "08982 92829");
    cy.get('input[name="email"]').should("be.value", "jwlll@gmail.com");
    cy.get('input[name="company"]').should("be.value", "Xerini");
    cy.get('input[name="preferences.contact.mail"]').should("be.checked");
    cy.get('input[name="preferences.contact.sms"]').should("be.checked");
  });

  it("Go to Profile page and cancel", () => {
    cy.contains("Cancel").click();
    cy.url().should("eq", "http://localhost:8080/");
  });

  it("Go to Profile page, start editing but then click Cancel", () => {
    cy.contains("Edit").click();
    cy.get('input[name="firstName"]').type("ny");

    cy.contains("Cancel").click();
    cy.get('input[name="firstName"]').should("be.value", "Jon");
  });

  it("Go to Profile page, edit fields and save", () => {
    cy.contains("Edit").click();
    cy.get('input[name="firstName"]').type("--amended");
    cy.get('input[name="otherNames"]').type("--amended");
    cy.get('input[name="address.street"]').type("--amended");
    cy.get('input[name="address.town"]').type("--amended");
    cy.get('input[name="address.county"]').type("--amended");
    cy.get('input[name="address.postcode"]').type("--amended");
    cy.get('input[name="mobile"]').type("--amended");
    cy.get('input[name="email"]').type("--amended");
    cy.get('input[name="company"]').type("--amended");
    cy.get('input[name="preferences.contact.mail"]').click();
    cy.get('input[name="preferences.contact.sms"]').click();

    cy.contains("Save").click();

    cy.go("back");
    cy.get("nav").contains("Profile").click();

    cy.get('input[name="firstName"]').should("be.value", "Jon--amended");
    cy.get('input[name="otherNames"]').should("be.value", "Williams--amended");
    cy.get('input[name="address.street"]').should(
      "be.value",
      "1 Mill Street--amended"
    );
    cy.get('input[name="address.town"]').should(
      "be.value",
      "Northampton--amended"
    );
    cy.get('input[name="address.county"]').should(
      "be.value",
      "Northamponshire--amended"
    );
    cy.get('input[name="address.postcode"]').should(
      "be.value",
      "NU7 JK8--amended"
    );
    cy.get('input[name="mobile"]').should("be.value", "08982 92829--amended");
    cy.get('input[name="email"]').should(
      "be.value",
      "jwlll@gmail.com--amended"
    );
    cy.get('input[name="company"]').should("be.value", "Xerini--amended");
    cy.get('input[name="preferences.contact.mail"]').should("not.be.checked");
    cy.get('input[name="preferences.contact.sms"]').should("not.be.checked");
  });
});
