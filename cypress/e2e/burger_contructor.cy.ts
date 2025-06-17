describe('Burger Constructor', () => {
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

  it('should add bun and fillings, update price and counters', () => {
    cy.get("[data-cy='noBuns']").should("have.length", 3);
    cy.clickIngredientInIndexedContainer(0);
    cy.clickIngredientInIndexedContainer(1);
    cy.get("[data-cy='burger-constructor-element']").should("be.visible");
    cy.get("[data-cy='burger-constructor-element-fullwidth']").should("be.visible");
  });

  it('should remove a filling from constructor', () => {
    cy.clickIngredientInIndexedContainer(1);
    cy.get("[data-cy='burger-constructor-element-fullwidth']").should("be.visible");
  });
});
