describe('App Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display navigation links', () => {
    cy.get('header').within(() => {
      cy.contains('Конструктор').should('exist');
      cy.contains('Лента заказов').should('exist');
      cy.contains('Личный кабинет').should('exist');
    });
  });
});