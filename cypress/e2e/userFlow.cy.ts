describe("Full User Flow: Register → Login → Create Goal → View Goal", () => {
  it("registers a user", () => {
    cy.visit("/register");
    cy.get("input[name=firstName]").type("John");
    cy.get("input[name=lastName]").type("Doe");
    cy.get("input[name=email]").type("john@example.com");
    cy.get("input[name=password]").type("Secure123!");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });

  it("logs in a user", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("john@example.com");
    cy.get("input[name=password]").type("Secure123!");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });

  it("creates a savings goal", () => {
    cy.visit("/dashboard");
    cy.contains("New Goal").click();
    cy.get("input[name=name]").type("New Laptop");
    cy.get("input[name=targetAmount]").type("1200");
    cy.contains("Create").click();
    cy.contains("Goal created successfully");
    cy.contains("New Laptop");
  });
});
