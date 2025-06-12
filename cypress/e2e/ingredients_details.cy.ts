describe('Ingredient Details Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get("[data-cy='ingredient-container']").first().click();
  });

  it('should open and display ingredient details', () => {
    cy.get("[data-cy='modal']").should('be.visible');
    // cy.get("[data-cy='modal-header']").should('contain', 'Детали ингредиента');
    // cy.get("[data-cy='ingredient-details-image']").should('be.visible');
    // cy.get("[data-cy='ingredient-details-name']").should('not.be.empty');
  });

  it('should close modal on close button', () => {
    cy.get("[data-cy='modal']").find("button").click();
    cy.get("[data-cy='modal']").should('not.exist');
  });
});