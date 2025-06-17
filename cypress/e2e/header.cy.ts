describe('App Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    // document.cookie.split(';').forEach(cookie => {
    //   const eqPos = cookie.indexOf('=');
    //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // });
    cy.clearCookies();
  });

  it('should display navigation links', () => {
    cy.get('header').within(() => {
      cy.contains('Конструктор').should('exist');
      cy.contains('Лента заказов').should('exist');
      cy.contains('Личный кабинет').should('exist');
    });
  });
});