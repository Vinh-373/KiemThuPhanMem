class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-testid="username-input"]'),
    passwordInput: () => cy.get('[data-testid="password-input"]'),
    loginButton: () => cy.get('[data-testid="login-button"]'),
    loginMessage: () => cy.get('[data-testid="login-message"]'),
    usernameError: () => cy.get('[data-testid="username-error"]'),
    passwordError: () => cy.get('[data-testid="password-error"]'),
  };

  visit() {
    cy.visit("/");
  }

  login(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}

module.exports = new LoginPage();
