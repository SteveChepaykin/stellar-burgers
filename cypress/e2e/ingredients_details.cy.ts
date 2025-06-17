describe('Ingredient Details Modal', () => {
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

  it('should open and display correct ingredient details', () => {
    cy.get("[data-cy='ingredient-container']").first().find('p').last().invoke('text').as('ingredientName');
    cy.get("[data-cy='ingredient-container']").first().click();

    cy.get('@ingredientName').then((name) => {
      cy.get("[data-cy='modal']").should('be.visible');
      cy.get("[data-cy='ingredient-details-name']").should('have.text', name);
    });
  });

  it('should close modal on close button', () => {
    cy.get("[data-cy='ingredient-container']").first().click();
    cy.get("[data-cy='modal']").find("button").click();
    cy.get("[data-cy='modal']").should('not.exist');
  });
});