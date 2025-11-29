// const LoginPage = require("../../cypress/pages/LoginPage");

// describe("Login E2E Tests", () => {
//   beforeEach(() => {
//     LoginPage.visit();
//   });

//   // (d) UI Elements visibility
//   it("Should display login form", () => {
//     LoginPage.elements.usernameInput().should("be.visible");
//     LoginPage.elements.passwordInput().should("be.visible");
//     LoginPage.elements.loginButton().should("be.visible");
//   });

//   // (a) Should show error when using valid-looking credentials (vì API đang FAILED)
//   it("Should login but show fetch failed error (API offline)", () => {
//     LoginPage.login("testuser", "Test123");

//     cy.contains("Failed to fetch").should("be.visible");
//   });

//   // (b) Should show validation message when fields empty
//   it("Should show validation errors", () => {
//     LoginPage.elements.loginButton().click();

//     // UI thật hiển thị balloon của HTML5 → kiểm tra qua pseudo validation
//     LoginPage.elements.usernameInput().then(($input) => {
//       expect($input[0].validationMessage).to.not.be.empty;
//     });
//   });

//   // (c) Invalid credentials → API vẫn FAILED nên vẫn ra cùng 1 lỗi
//   it("Should show error with invalid credentials", () => {
//     LoginPage.login("ab", "123");

//     cy.contains("Failed to fetch").should("be.visible");
//   });
// });

