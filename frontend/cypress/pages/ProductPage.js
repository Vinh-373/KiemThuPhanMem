// cypress/pages/ProductPage.js

class ProductPage {
  visit() {
    cy.visit('/products');
  }

  getUsername() {
    return cy.get('[data-testid="username-display"]');
  }

  clickLogout() {
    cy.get('[data-testid="logout-btn"]').click();
  }

  getProductItems() {
    return cy.get('[data-testid="product-item"]');
  }

  getProductByName(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  clickAddToCart(name) {
    this.getProductByName(name)
      .find('[data-testid="add-to-cart-btn"]')
      .click();
  }

  getCartItems() {
    return cy.get('[data-testid="cart-items"]');
  }

  verifyProductInCart(name) {
    this.getCartItems().contains(name).should('exist');
  }
}

export default ProductPage;