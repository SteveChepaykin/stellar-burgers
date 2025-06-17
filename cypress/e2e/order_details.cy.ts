describe('Order Details Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'token.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as('createOrder');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.window().then(win => {
      win.localStorage.setItem('refreshToken', 'mock-refresh-token');
      win.localStorage.setItem('accessToken', 'Bearer mock-access-token');
    });
    cy.reload();
    cy.wait('@getIngredients');
    cy.clickIngredientInIndexedContainer(0);
    cy.clickIngredientInIndexedContainer(1);
  });

  afterEach(() => {
     cy.window().then(win => {
      win.localStorage.clear();
    });
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  });

  it('should submit order and show order details modal', () => {
    cy.get("[data-cy='place-order']").click();
    cy.wait('@createOrder');
    cy.get("[data-cy='order-number']").should('contain', '71808');
    cy.get("[data-cy='order-status-message']").should('contain', 'Ваш заказ начали готовить');
  });
});
