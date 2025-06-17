describe('Auth Pages', () => {
  it('should show login form and validate', () => {
    cy.visit('/login');
    cy.get('form').within(() => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('button[type="submit"]').click();
    });
  });

  it('should show register form and validate', () => {
    cy.visit('/register');
    cy.get('form').within(() => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('button[type="submit"]').click();
    });
  });

  it('should show forgot password form', () => {
    cy.visit('/forgot-password');
    cy.get('form').within(() => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('button[type="submit"]').click();
    });
  });

  afterEach(() => {
    // document.cookie.split(';').forEach(cookie => {
    //   const eqPos = cookie.indexOf('=');
    //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // });
    cy.clearCookies();
  });

  it('should show reset password form', () => {
    cy.visit('/reset-password');
    cy.get('form').within(() => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('button[type="submit"]').click();
    });
  });
});