describe('Burger Ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should display ingredient categories', () => {
    cy.get("[data-cy='ingredients-items']").should('have.length.at.least', 1);
    cy.contains('Булки').should('exist');
    cy.contains('Начинки').should('exist');
    cy.contains('Соусы').should('exist');
  });

  it('should display ingredient cards with counters', () => {
    cy.get("[data-cy='ingredient-container']").should('have.length.at.least', 1);
    cy.get("[data-cy='ingredient-container']").first().within(() => {
      cy.get('img').should('be.visible');
      cy.get("[data-cy='ingredient-count']").should('exist');
    });
  });
});