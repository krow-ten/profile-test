describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Unsuccesful login", () => {
    cy.contains("Submit").click();

    cy.get("form").should(
      "contain",
      "There was a problem logging in, please try again"
    );
  });

  it("Succesful login", () => {
    cy.get("nav").should("not.contain", "Profile");
    cy.contains("Username").find("input").type("jw");
    cy.contains("Password").find("input").type("test");
    cy.contains("Submit").click();

    cy.get("body").should("contain", "Hello, Jon");
    cy.get("nav").should("contain", "Profile");
  });
});
