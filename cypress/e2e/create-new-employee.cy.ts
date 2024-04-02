describe("Create new employee", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");

    cy.get("button[data-testid='createNewEmployeeButton']").click();
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=cpf]").type("123.456.789-09");
    cy.get("input[name=rg]").type("123456789");
    cy.get("input[name=birthdate]").type("1990-01-01");
    cy.get("input[name=phone_number]").type("123456789");
    cy.get("input[name=email]").type("test@email.com");
    cy.get("input[name=role]").type("Desenvolvedor");
    cy.get("input[name=area]").type("Tecnologia");
  });

  it("should create a new employee", () => {
    cy.get("input[name=address]").type("Rua teste, 127");

    cy.intercept("PUT", "http://localhost:3000/companies/**", {
      statusCode: 200,
    }).as("createNewEmployeeRequest");

    cy.get("button[type=submit]").click();

    cy.wait("@createNewEmployeeRequest").then(() => {
      cy.get("button[data-testid=modal-title]").should("not.exist");
    });
  });
  it("should show an error message if the input is empty", () => {
    cy.get("button[type=submit]").click();

    cy.contains("O endereço deve ter no mínimo 3 caracteres.").should("exist");
  });
});
