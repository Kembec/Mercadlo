describe("Register Test", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("New Register", () => {
		cy.get(".register").click();
		cy.get("#name > input").type("Name Test");
		cy.get("#email > input").type("email@test.com");
		cy.get("#password > input").type("passwordtest");
		cy.get(".base-submit").click();
	});

	it("New Login", () => {
		cy.get("#email > input").type("email@test.com");
		cy.get("#password > input").type("passwordtest");
		cy.get(".base-submit").click();
	});
});
