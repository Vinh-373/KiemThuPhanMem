const LoginPage = require("../pages/LoginPage");

describe("Login E2E Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  
  it("Should display login form", () => {
    LoginPage.elements.usernameInput().should("be.visible");
    LoginPage.elements.passwordInput().should("be.visible");
    LoginPage.elements.loginButton().should("be.visible");
  });

  
  it("Should login successfully with valid credentials", () => {
  LoginPage.login("Minh", "123");
  LoginPage.elements
    .loginMessage()
    .should("be.visible");
});

 
  it("Should show validation errors when fields empty", () => {
    LoginPage.elements.loginButton().click();

    LoginPage.elements.usernameError().should("be.visible");
    LoginPage.elements.passwordError().should("be.visible");
  });

  
  it("Should show error when credentials invalid", () => {
  LoginPage.login("saiUser", "saiPass");

  LoginPage.elements
    .loginMessage()
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(
        text.trim().length > 0, 
        "Error message must not be empty"
      ).to.be.true;
    });
  });
});