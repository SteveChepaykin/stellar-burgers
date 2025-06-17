describe('Burger Ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // document.cookie.split(';').forEach(cookie => {
    //   const eqPos = cookie.indexOf('=');
    //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // });
    cy.clearCookies();
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