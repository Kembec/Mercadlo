describe("Game Test", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.get("#email > input").type("email@test.com");
		cy.get("#password > input").type("passwordtest");
		cy.get(".base-submit").click();
	});

	it("New List", () => {
		cy.get(".sidebar > button").click();
		cy.get("#list-name").type("New test list");
		cy.get(".new-list > button").click();
		cy.contains("List added successfully").should("exist");
	});

	it("Update List", () => {
		cy.get(".list-group")
			.first()
			.within(() => {
				cy.get("#show-update").click();
				cy.get("#new-list-name").clear().type("List name changed");
				cy.get("#update-list").click();
			});
	});

	it("Add Product", () => {
		cy.get(".list-group")
			.first()
			.within(() => {
				cy.get(".add-product")
					.first()
					.within(() => {
						cy.get("#new-product-name > input").type("Product");
						cy.get("#new-product-price > input").type("123");
						cy.get("button").click();
					});
			});
	});

	it("Update Product", () => {
		cy.get(".list-group")
			.first()
			.within(() => {
				cy.get(".products > #product")
					.first()
					.within(() => {
						cy.get("#show-update").click();
						cy.get("#name").clear().type("Product changed");
						cy.get("#price").clear().type("321");
						cy.get("#update-product").click();
					});
			});
	});

	it("Delete Product", () => {
		cy.get(".list-group")
			.first()
			.within(() => {
				cy.get(".products > #product")
					.first()
					.within(() => {
						cy.get("#delete-product").click();
					});
			});
	});

	it("Delete List", () => {
		cy.get(".list-group")
			.first()
			.within(() => {
				cy.get("#delete-list").click();
			});
	});
});
