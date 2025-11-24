class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[placeholder="Username"]'),
    passwordInput: () => cy.get('input[placeholder="Password"]'),
    loginButton: () => cy.contains("button", "Login"),
    message: () => cy.get(".error-message"),
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
